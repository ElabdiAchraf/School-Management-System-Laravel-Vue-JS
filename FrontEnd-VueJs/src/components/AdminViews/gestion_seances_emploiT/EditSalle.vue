<template>
  <div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-form @submit.prevent="onSubmit(id.id)">
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Nom Salle"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.nom"
          placeholder="Enter Nom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Numero"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.numero"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Departement"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.departement"
          placeholder="Enter departement"
          required
        ></b-form-input>
      </b-form-group>
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
          v-model="id.etage"
          type="number"
          required
        ></b-form-input>
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

      <b-button type="submit" block variant="info">Edit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  mounted() {
    console.log(this.id);
  },
  methods: {
    async onSubmit(a) {
      await axios
        .put(`admin/salles/${a}`, {
          nom: this.id.nom,
          numero: this.id.numero,
          departement: this.id.departement,
          etage: this.id.etage,
          description: this.id.description,
        })
        .then(() => {});
      await this.$swal("edited successfully", "success");
      this.$emit("refresh");
    },
  },
};
</script>