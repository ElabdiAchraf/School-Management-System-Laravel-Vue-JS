<template>
  <CCardBody>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>Edit Note </template>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Close Me</b-button
        >
      </b-modal>
    </div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-jumbotron bg-variant="white">
      <template #header>Gestion Notes </template>
      <b-button pill variant="success" @click="Add(Module_id)"
        >Ajouter Notes</b-button
      >
      <hr class="my-4" />
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
                  {{ item.Titre }}
                </h4>
                <p class="text-muted">description: {{ item.Description }}</p>
                <CButton
                  size="sm"
                  color="info"
                  @click="editModule_id = true"
                  class="ml-1"
                >
                  Edit Note
                </CButton>
                <div v-if="editModule_id == true">
                  <b-form-group
                    id="fieldset-horizontal"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Etage"
                    label-for="input-horizontal"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="item.note"
                      type="number"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <CButton
                    size="sm"
                    color="success"
                    @click="onSubmit(item.ID_Note, item.note)"
                    class="ml-1"
                  >
                    affecter
                  </CButton>
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
  { key: "id", _style: "min-width:50px" },
  "name",
  { key: "prenom", _style: "min-width:100px;" },
  { key: "Description", _style: "min-width:100px;" },
  { key: "note", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
// import EditSalle from "./EditSalle.vue";
// import AddSalle from "./AddSalle.vue";
export default {
  name: "AdvancedTables",
  data() {
    return {
      editModule_id: false,
      Id: null,
      warningModal: false,
      loading: false,
      items: null,
      fields,
      note: null,
      Module_id: null,
      details: [],
      collapseDuration: 0,
    };
  },
  components: {
    // EditSalle,
    // AddSalle,
  },
  methods: {
    async refreshSalles() {
      this.loading = true;
      let id = this.$route.params.id;
      this.Module_id = id;
      axios
        .get(`prof/gestion_notes/etudiants/${id}`)
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
        // <--
        if (result.value) {
          axios.delete(`admin/salles/${id}`).then(() => {});
        }
        this.refreshSalles();
      });
    },
    async edit(id) {
      await axios.get(`gestion_notes/update/${id}`).then((response) => {
        this.Id = response.data.data;
        console.log(this.Id);
      });
      await this.$bvModal.show("bv-modal-example");
    },
    Add(id) {
      this.$router.push(`/enter_notes/${id}`);
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    async onSubmit(id, note) {
      await axios.post(`prof/gestion_notes/update/${id}`, {
        note: note,
      });
      await this.$swal("note editer  ", "success");
      this.editModule_id = false;
      this.refreshClasses();
    },
  },
  async created() {
    this.refreshSalles();
  },
};
</script>