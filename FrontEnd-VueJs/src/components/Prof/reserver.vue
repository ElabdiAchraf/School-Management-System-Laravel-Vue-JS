<template>
  <CCardBody>
    <b-jumbotron bg-variant="white">
      <template #header>Reserver Salle</template>
      <hr class="my-4" />
      <b-form @submit.prevent="onSubmit">
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
          label="heure_debut / forme 00:00"
          label-for="input-horizontal"
        >
          <b-form-input
            id="input-1"
            v-model="id.heure_debut"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="heure_fin / forme 00:00"
          label-for="input-horizontal"
        >
          <b-form-input
            id="input-1"
            v-model="id.heure_fin"
            required
          ></b-form-input>
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

        <b-button type="submit" variant="warning">reserver</b-button>
      </b-form>
    </b-jumbotron>
  </CCardBody>
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
    };
  },
  methods: {
    async onSubmit() {
      await axios
        .post(`prof/resrvation_seance`, {
          jour: this.id.jour,
          module_titre: this.module_titre,
          heure_debut: this.id.heure_debut,
          heure_fin: this.id.heure_fin,
          salle_id: this.id.salle_id,
          description: this.id.description,
        })
        .then(this.$swal("reserved successfully", "success"))
        .catch(() => {
          this.$swal("non disponible", "error");
        });

      this.$emit("refresh");
    },
  },
  mounted() {
    console.log(this.optionsSalles);
  },

  computed: {
    optionsSalles() {
      return this.$store.getters.salles;
    },
  },
};
</script>