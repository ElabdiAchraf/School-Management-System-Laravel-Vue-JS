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
        label="Nom de classe"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.name"
          placeholder="Nom de classe"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Niveau"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.niveau"
          placeholder="niveau"
          required
        ></b-form-input>
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
        .put(`admin/classes/${a}`, {
          name: this.id.name,
          niveau: this.id.niveau,
        })
        .then(() => {});
      await this.$swal("edited successfully", "success");
      this.$emit("refresh");
    },
  },
};
</script>