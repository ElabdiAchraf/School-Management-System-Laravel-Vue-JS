<template>
  <CCardBody>
    <b-jumbotron bg-variant="white">
      <template #header>Mes Modules</template>
      <hr class="my-4" />
      <b-alert :show="loading" variant="info">Loading...</b-alert>
      <CRow>
        <CCol v-for="item in items" :key="item.id" lg="4">
          <b-card
            :title="item.Titre"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Classe: <CBadge color="info"> {{ item.Classe }}</CBadge> <br />
              Niveau: <CBadge color="success"> {{ item.Niveau }}</CBadge> <br />
            </b-card-text>

            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="push(item.ID_Module)"
              >gestion notes</CButton
            >
          </b-card>
        </CCol>
      </CRow>
    </b-jumbotron>
  </CCardBody>
</template>
<script>
const fields = [
  { key: "id", _style: "min-width:50px" },
  "Titre",

  { key: "Niveau", _style: "min-width:100px;" },
  { key: "Classe", _style: "min-width:100px;" },

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
  name: "Mes Modules",
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
        .get("prof/gestion_notes/")
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    push(id) {
      this.$router.push(`/gestion_notes/${id}`);
    },
  },
  mounted() {
    console.log(this.items);
  },
  async created() {
    this.refreshClasses();
  },
  computed: {
    optionsClass() {
      return this.$store.getters.classe;
    },
  },
};
</script>