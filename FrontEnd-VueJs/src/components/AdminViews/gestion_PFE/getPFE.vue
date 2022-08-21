<template>
  <CCardBody>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>Edit PFE </template>
        <div class="d-block text-center">
          <EditPFE :id="Id" @refresh="refresh" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Close Me</b-button
        >
      </b-modal>
    </div>
    <div>
      <b-modal id="bv-modal-example2" hide-footer>
        <template #modal-title>Add PFE </template>
        <div class="d-block text-center">
          <AddPFE @refresh="refresh" />
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example2')"
          >Close</b-button
        >
      </b-modal>
    </div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-jumbotron bg-variant="white">
      <template #header>Gestion PFE</template>
      <b-button pill variant="success" @click="Add">créer PFE</b-button>
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
                  @click="showAlert(item.Id_PFE)"
                  color="danger"
                  class=""
                >
                  Delete
                </CButton>
                <CButton
                  size="sm"
                  color="info"
                  @click="edit(item.Id_PFE)"
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
  { key: "id", _style: "min-width:50px" },
  "Etudiant",
  { key: "Professeur", _style: "min-width:100px;" },
  { key: "sujet", _style: "min-width:100px;" },
  { key: "note", _style: "min-width:100px;" },
  { key: "Date_soutenance", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
import EditPFE from "./EditPFE.vue";
import AddPFE from "./AddPFE.vue";
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
    EditPFE,
    AddPFE,
  },
  methods: {
    async refresh() {
      this.loading = true;
      axios
        .get("admin/pfes/")
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
        title: "Delete this PFE?",
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4444",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        // <--
        if (result.value) {
          axios.delete(`admin/pfes/${id}`).then(() => {});
        }
        this.refresh();
      });
    },
    async edit(id) {
      await axios.get(`admin/pfes/${id}`).then((response) => {
        this.Id = response.data.data;
      });
      await this.$bvModal.show("bv-modal-example");
    },
    async Add() {
      await this.$bvModal.show("bv-modal-example2");
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
    console.log(this.$store.getters.Modules);
  },
  async created() {
    this.refresh();
    axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("profs", response.data.data.profs);
        this.$store.dispatch("classe", response.data.data.classes);
        this.$store.dispatch("pfeEtu", response.data.data.etudiantsPfe);
      })
      .catch((error) => console.log(error));
  },
};
</script>