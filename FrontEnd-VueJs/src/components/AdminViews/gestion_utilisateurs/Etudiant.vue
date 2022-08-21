<template>
  <CCardBody>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>Info Profile </template>
        <div class="d-block text-center">
          <ViewProfile :profile="profile" @refresh="refreshClasses" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >ferme</b-button
        >
      </b-modal>
    </div>
    <div>
      <b-modal id="bv-modal-example2" hide-footer>
        <template #modal-title>Info Profile </template>
        <div class="d-block text-center">
          <EditProfile :info="profileEdit" @refresh="refreshClasses" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example2')"
          >ferme</b-button
        >
      </b-modal>
    </div>
    <div>
      <b-modal id="bv-modal-example3" hide-footer>
        <template #modal-title>Add Etudiant </template>
        <div class="d-block text-center">
          <AddEtudiant @refresh="refreshClasses" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example3')"
          >ferme</b-button
        >
      </b-modal>
    </div>
    <b-jumbotron bg-variant="white">
      <template #header
        >Gestion Etudiants
        <router-link to="/users/newetudiants">
          <b-button variant="outline-dark">
            les nouvelles inscriptions
            <b-badge pill variant="warning">{{ nouvelle }}</b-badge>
          </b-button>
        </router-link></template
      >
      <b-button pill variant="success" @click="Add">créer Etudiant</b-button>
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
              {{ Boolean(item._toggled) ? "Hide" : "Actions" }}
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
                  color="info"
                  @click="edit(item.Id)"
                  class="ml-1"
                >
                  Voir profile info
                </CButton>
                <CButton
                  size="sm"
                  color="warning"
                  @click="editpr(item.Id)"
                  class="ml-1"
                >
                  edit profile info
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
                  ></b-form-select>
                  <CButton
                    size="sm"
                    color="success"
                    @click="onSubmit(item.Id)"
                    class="ml-1"
                  >
                    changer
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
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
import ViewProfile from "./viewProfile.vue";
import EditProfile from "./Profile.vue";
import AddEtudiant from "./addEtudiant.vue";
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
      editclass_id: false,
      class_Id: 1,
      nouvelle: null,
    };
  },
  components: {
    ViewProfile,
    EditProfile,
    AddEtudiant,
  },
  methods: {
    async refreshClasses() {
      this.loading = true;
      axios
        .get("admin/etudiants/")
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
    async Add() {
      await this.$bvModal.show("bv-modal-example3");
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
    axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("module", response.data.data.moduls);
        this.$store.dispatch("classe", response.data.data.classes);
        this.nouvelle = response.data.data.nouvelles;
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