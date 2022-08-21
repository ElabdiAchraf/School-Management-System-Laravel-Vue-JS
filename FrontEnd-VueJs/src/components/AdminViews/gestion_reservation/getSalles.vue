<template>
  <CCardBody>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>Edit Salle </template>
        <div class="d-block text-center">
          <EditSalle :id="Id" @refresh="refreshSalles" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Close</b-button
        >
      </b-modal>
    </div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-jumbotron bg-variant="white">
      <template #header>Gestion Reservations </template>
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
                <p class="text-muted">description: {{ item.description }}</p>
                <CButton
                  size="sm"
                  @click="showAlert(item.id_seance)"
                  color="danger"
                  class=""
                >
                  Delete
                </CButton>
                <CButton
                  size="sm"
                  color="info"
                  @click="edit(item.id_seance)"
                  class="ml-1"
                >
                  Edit
                </CButton>
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
  { key: "id_seance", _style: "min-width:40px" },
  "classe",
  { key: "module", _style: "min-width:100px;" },
  { key: "Salle", _style: "min-width:100px;" },
  { key: "professeur", _style: "min-width:100px;" },
  { key: "jour", _style: "min-width:100px;" },
  { key: "heure_debut", _style: "min-width:100px;" },
  { key: "heure_fin", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
import EditSalle from "./EditSalle.vue";

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
    };
  },
  components: {
    EditSalle,
  },
  methods: {
    async refreshSalles() {
      this.loading = true;
      axios
        .get("admin/reservation")
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
          axios.delete(`admin/seances/${id}`).then(() => {});
        }
        this.refreshSalles();
      });
    },
    async edit(id) {
      await axios.get(`admin/seances/${id}`).then((response) => {
        this.Id = response.data.data;
        console.log(this.Id);
      });
      await this.$bvModal.show("bv-modal-example");
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
  async created() {
    await axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("salles", response.data.data.salles);
      })
      .catch((error) => console.log(error));

    this.refreshSalles();
  },
};
</script>