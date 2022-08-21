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
    <b-jumbotron bg-variant="white">
      <template #header>Gestion Professeur</template>
      <router-link to="/users/create">
        <b-button class="mt-3 btn-success">Créé Professeur</b-button>
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
                  @click="editModule_id = true"
                  class="ml-1"
                >
                  affecter Module
                </CButton>
                <div v-if="editModule_id == true">
                  <b-form-select
                    class="my-3"
                    v-model="module_titre"
                    :options="optionsModul"
                  ></b-form-select>
                  <CButton
                    size="sm"
                    color="success"
                    @click="onSubmit(item.Id)"
                    class="ml-1"
                  >
                    affecter
                  </CButton>
                  <router-link to="/modules/get">
                    <CButton size="sm" color="info" class="ml-1">
                      cree un nouveau module
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
  "Module_Affecter",
  { key: "email", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
import ViewProfile from "../../AdminViews/gestion_utilisateurs/viewProfile.vue";
import EditProfile from "../../AdminViews/gestion_utilisateurs/Profile.vue";
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
      option: null,
      profileEdit: null,
      module_titre: "java",
      editModule_id: false,
    };
  },
  components: {
    ViewProfile,
    EditProfile,
  },
  methods: {
    async refreshClasses() {
      this.loading = true;
      axios
        .get("admin/profs/")
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
          axios.delete(`admin/profs/${id}`).then(() => {});
        }
        this.refreshClasses();
      });
    },
    async edit(id) {
      await axios.get(`admin/profs/${id}`).then((response) => {
        let Id = response.data.data;
        this.profile = Id[0];
        console.log(this.profile.role);
      });
      await this.$bvModal.show("bv-modal-example");
    },
    async editpr(id) {
      console.log(this.$store.getters.module);
      await axios.get(`admin/profs/${id}`).then((response) => {
        let Id = response.data.data;
        this.profileEdit = Id[0];
      });
      await this.$bvModal.show("bv-modal-example2");
    },
    // pour editer classe

    async onSubmit(id) {
      await axios.put(`admin/profs/${id}`, {
        module_titre: this.module_titre,
      });
      await this.$swal("module affecter  ", "success");
      this.editModule_id = false;
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
  mounted() {},
  async created() {
    // this.option = this.$store.getters.module;
    this.refreshClasses();
  },
  computed: {
    optionsModul() {
      return this.$store.getters.module;
    },
  },
};
</script>