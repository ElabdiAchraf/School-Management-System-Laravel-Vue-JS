<template>
  <div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Module"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="module_titre"
          :options="optionsModul"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="jour"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.jour"
          :options="jours"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="heure_debut"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.heure_debut"
          :options="heures_debut"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="heures_fin"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.heure_fin"
          :options="heures_fin"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Salle"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.salle_id"
          :options="optionsSalles"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Description"
        label-for="input-horizontal"
      >
        <b-form-textarea
          id="textarea"
          v-model="id.description"
          placeholder="description..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" block variant="success">Add</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: {},
      module_titre: "java",
      jours: [
        { value: 1, text: "lundi" },
        { value: 2, text: "mardi" },
        { value: 3, text: "mercredi" },
        { value: 4, text: "jeudi" },
        { value: 5, text: "vendredi" },
        { value: 6, text: "samedi" },
        { value: 7, text: "dimanche" },
      ],
      heures_debut: [
        { value: "08:30", text: "8:30" },
        { value: "10:30", text: "10:30" },
        { value: "14:30", text: "14:30" },
        { value: "16:30", text: "16:30" },
      ],
      heures_fin: [
        { value: "10:15", text: "10:15" },
        { value: "12:15", text: "12:15" },
        { value: "16:15", text: "16:15" },
        { value: "18:15", text: "18:15" },
      ],
    };
  },
  methods: {
    async onSubmit() {
      await axios
        .post(`admin/seances/`, {
          jour: this.id.jour,
          module_titre: this.module_titre,
          heure_debut: this.id.heure_debut,
          heure_fin: this.id.heure_fin,
          salle_id: this.id.salle_id,
          description: this.id.description,
        })
        .then(() => this.$swal("created successfully", "success"))
        .catch(() => this.$swal("non disponible", "error"));

      this.$emit("refresh");
    },
  },
  mounted() {
    console.log(this.optionsModul);
  },
  computed: {
    optionsModul() {
      return this.$store.getters.module;
    },
    optionsClass() {
      return this.$store.getters.classe;
    },
    optionsSalles() {
      return this.$store.getters.salles;
    },
  },
  created() {
    axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("module", response.data.data.moduls);
        this.$store.dispatch("classe", response.data.data.classes);
        this.$store.dispatch("salles", response.data.data.salles);
      })
      .catch((error) => console.log(error));
  },
};
</script>