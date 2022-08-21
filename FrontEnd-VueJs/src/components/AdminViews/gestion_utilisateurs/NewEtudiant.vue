<template>
  <CCardBody>
    <b-jumbotron bg-variant="white">
      <template #header>les nouvelles inscriptions</template>
      <router-link to="/users/create">
        <b-button class="mt-3 btn-success">Créé Etudiant</b-button>
      </router-link>
      <hr class="my-4" />
      <b-alert :show="loading" variant="info">Loading...</b-alert>
      <CDataTable
        :items="items"
        :fields="fields"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <template #show_details="{ item, index }">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item, index)"
            >
              {{ Boolean(item._toggled) ? "Hide" : "Affecter" }}
            </CButton>
          </td>
        </template>
        <template #details="{ item }">
          <CCollapse
            :show="Boolean(item._toggled)"
            :duration="collapseDuration"
          >
            <CCardBody>
              <CMedia :aside-image-props="{ height: 102 }">
                <h4>
                  {{ item.nom }}
                </h4>
                <p class="text-muted">Nom : {{ item.name }}</p>

                <CButton
                  size="sm"
                  @click="showAlert(item.Id)"
                  color="danger"
                  class=""
                >
                  Delete
                </CButton>
                <CButton
                  size="sm"
                  color="primary"
                  @click="editclass_id = true"
                  class="ml-1"
                >
                  affecter classe
                </CButton>
                <div v-if="editclass_id == true">
                  <b-form-select
                    class="my-3"
                    v-model="class_Id"
                    :options="optionsClass"
                    style="width: auto"
                  ></b-form-select>
                  <CButton
                    size="sm"
                    color="success"
                    @click="onSubmit(item.Id)"
                    class="ml-1"
                  >
                    affecter
                  </CButton>
                  <router-link to="/classes">
                    <CButton size="sm" color="info" class="ml-1">
                      cree nouveau classe
                    </CButton>
                  </router-link>
                </div>
              </CMedia>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </b-jumbotron>
  </CCardBody>
</template>
<script>
const fields = [
  { key: "Id", _style: "min-width:50px" },
  "name",

  { key: "email", _style: "min-width:100px;" },
  { key: "classe", _style: "min-width:100px;" },

  {
    key: "show_details",
    label: "Actions",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";

// import AddClasse from "./AddClasse.vue";
export default {
  name: "AdvancedTables",
  data() {
    return {
      Id: null,
      warningModal: false,
      loading: false,
      items: null,
      fields,
      details: [],
      collapseDuration: 0,
      profile: null,
      profileEdit: null,
      editclass_id: false,
      class_Id: 1,
    };
  },

  methods: {
    async refreshClasses() {
      this.loading = true;
      axios
        .get("admin/newetudiants/")
        .then((response) => {
          this.items = response.data.data.map((item, id) => {
            return { ...item, id };
          });
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    async showAlert(id) {
      // Use sweetalert2
      this.$swal({
        title: "Delete this order status?",
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4444",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.value) {
          axios.delete(`admin/etudiants/${id}`).then(() => {});
        }
        this.refreshClasses();
      });
    },
    // pour afficher le  profile
    async edit(id) {
      await axios.get(`admin/etudiants/${id}`).then((response) => {
        let Id = response.data.data;
        this.profile = Id[0];
        console.log(this.profile.role);
      });
      await this.$bvModal.show("bv-modal-example");
    },
    // pour editer profile
    async editpr(id) {
      await axios.get(`admin/etudiants/${id}`).then((response) => {
        let Id = response.data.data;
        this.profileEdit = Id[0];
      });
      await this.$bvModal.show("bv-modal-example2");
    },
    // pour editer classe

    async onSubmit(id) {
      await axios.put(`admin/etudiants/${id}`, {
        class_id: this.class_Id,
      });
      await this.$swal("classe edite ", "success");
      this.editclass_id = false;
      this.refreshClasses();
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
  mounted() {
    console.log(this.items);
  },
  async created() {
    await axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("module", response.data.data.moduls);
        this.$store.dispatch("classe", response.data.data.classes);
      })
      .catch((error) => console.log(error));

    this.refreshClasses();
  },
  computed: {
    optionsClass() {
      return this.$store.getters.classe;
    },
  },
};
</script>