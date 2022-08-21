<template>
  <CCardBody>
    <b-jumbotron bg-variant="white">
      <template #header>Gestion Notes</template>
      <hr class="my-4" />
      <b-alert :show="loading" variant="info">Loading...</b-alert>
      <h1>{{ $route.params.id }}</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">nom</th>
            <th scope="col">prenom</th>
            <th scope="col">note</th>
            <th scope="col">description</th>
            <th scope="col">save</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.prenom }}</td>
            <td>
              <input
                type="number"
                v-model="item.note"
                class="form-control sm"
              />
            </td>
            <td>
              <input class="form-control sm" v-model="item.description" />
            </td>
            <td>
              <button
                type="button"
                @click="addNote(item.Id, item.description, item.note)"
                class="btn btn-success"
              >
                save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </CCardBody>
</template>
<script>
const fields = [
  "name",
  { key: "prenom", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "Action",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];
import axios from "axios";
export default {
  name: "gestion_notes",
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
      let id = this.$route.params.id;
      axios
        .get(`prof/enter_notes/etudiants/${id}`)
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    addNote(id, description, note) {
      axios
        .post(`prof/gestion_notes/etudiant/${id}`, {
          note: note,
          module_id: this.$route.params.id,
          description: description,
        })
        .then(() => {
          this.$swal("note added !!", "success");
        })
        .catch(() => this.$swal("etudiant est la deja une note !!!", "error"));
    },
  },
  async created() {
    this.refreshClasses();
  },
};
</script>