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
        label="Nom Salle"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.Nom"
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
    };
  },
  methods: {
    async onSubmit() {
      await axios
        .post(`admin/salles/`, {
          nom: this.id.Nom,
          numero: this.id.numero,
          departement: this.id.departement,
          etage: this.id.etage,
          description: this.id.description,
        })
        .then(() => {});
      await this.$swal(
        "created successfully",

        "success"
      );
      this.$emit("refresh");
    },
  },
};
</script>