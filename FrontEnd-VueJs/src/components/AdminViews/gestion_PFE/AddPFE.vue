<template>
  <div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-form @submit.prevent="onSubmit">
      <!-- <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Nom Module"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.titre"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group> -->
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Professeur"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.prof_id"
          :options="optionsProf"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Etudiant PFE"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.etu_id"
          :options="optionsPfe"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="sujet"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.sujet"
          placeholder="sujet"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="date Soutenance"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          type="date"
          v-model="id.dateSout"
          placeholder="sujet"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
        label="Note"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          type="number"
          v-model="id.note"
          placeholder="Note"
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
  computed: {
    optionsProf() {
      return this.$store.getters.prof;
    },
    optionsClass() {
      return this.$store.getters.classe;
    },
    optionsPfe() {
      return this.$store.getters.pfeEtu;
    },
  },
  methods: {
    async onSubmit() {
      await axios
        .post(`admin/pfes/`, {
          sujet: this.id.sujet,
          note: this.id.note,
          etu_id: this.id.etu_id,
          prof_id: this.id.prof_id,
          dateSout: this.id.dateSout,
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