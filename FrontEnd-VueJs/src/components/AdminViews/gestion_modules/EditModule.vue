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
        label="Nom Module"
        label-for="input-horizontal"
      >
        <b-form-input
          id="input-1"
          v-model="id.titre"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
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
        label="Classe"
        label-for="input-horizontal"
      >
        <b-form-select
          class="my-3"
          v-model="id.class_id"
          :options="optionsClass"
        ></b-form-select>
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
          placeholder="Enter email"
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
  //   created() {
  //     axios
  //       .get("admin/home")
  //       .then((response) => {
  //         this.$store.dispatch("module", response.data.data.moduls);
  //         this.$store.dispatch("classe", response.data.data.classes);
  //       })
  //       .catch((error) => console.log(error));
  //   },
  computed: {
    optionsProf() {
      return this.$store.getters.prof;
    },
    optionsClass() {
      return this.$store.getters.classe;
    },
  },
  methods: {
    async onSubmit(a) {
      await axios
        .put(`admin/modules/${a}`, {
          titre: this.id.titre,
          niveau: this.id.niveau,
          class_id: this.id.class_id,
          prof_id: this.id.prof_id,
          description: this.id.description,
        })
        .then(() => {});
      await this.$swal("edited successfully", "success");
      this.$emit("refresh");
    },
  },
};
</script>