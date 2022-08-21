<template>
  <CCardBody>
    <b-jumbotron bg-variant="white">
      <template #header>Mes Notes </template>
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
      </CDataTable>
    </b-jumbotron>
  </CCardBody>
</template>
<script>
const fields = [
  { key: "module", _style: "min-width:40px" },
  "note",
  { key: "Description", _style: "min-width:100px;" },
];
import axios from "axios";
export default {
  name: "AdvancedTables",
  data() {
    return {
      items: null,
      fields,
      details: [],
      collapseDuration: 0,
    };
  },
  methods: {
    async refreshNotes() {
      this.loading = true;
      axios
        .get("/user/notes")
        .then((response) => {
          this.items = response.data.data.map((item, id) => {
            return { ...item, id };
          });
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
  },
  async created() {
    this.refreshNotes();
  },
};
</script>