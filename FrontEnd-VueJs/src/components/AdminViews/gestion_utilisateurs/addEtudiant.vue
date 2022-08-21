<template>
  <transition name="fade">
    <CForm @submit="onSubmit">
      <CInput placeholder="CNE" autocomplete="CNE" v-model="CNE"> </CInput>
      <CInput placeholder="nom" autocomplete="username" v-model="name">
      </CInput>
      <CInput placeholder="prenom" autocomplete="username" v-model="prenom">
      </CInput>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">classe:</label>
        </b-col>
        <b-col sm="10">
          <b-form-select
            label-field="classe"
            class="my-3"
            v-model="class_id"
            :options="optionsClass"
          ></b-form-select>
        </b-col>
      </b-row>

      <CInput placeholder="Email" autocomplete="email" v-model="email" />
      <CInput
        placeholder="Password"
        type="password"
        autocomplete="new-password"
        v-model="password"
      >
      </CInput>
      <CInput
        placeholder="Repeat password"
        type="password"
        autocomplete="new-password"
        class="mb-4"
        v-model="c_password"
      >
      </CInput>
      <CButton color="primary" type="submit" block>Create Account</CButton>
    </CForm>
  </transition>
</template>
<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      info: null,
      email: "",
      name: "",
      prenom: "",
      CNE: "",
      password: "",
      c_password: "",
      class_id: 1,
    };
  },
  mounted() {
    console.log(this.$store.getters.classe);
  },
  created() {
    axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("classe", response.data.data.classes);
      })
      .catch((error) => console.log(error));
  },
  computed: {
    optionsClass() {
      return this.$store.getters.classe;
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await axios.post("admin/etudiants", {
        email: this.email,
        name: this.name,
        CNE: this.CNE,
        prenom: this.prenom,
        class_id: this.class_id,
        permission: this.role,
        password: this.password,
        c_password: this.c_password,
        module_titre: this.module_titre,
      });
      this.$swal(
        "user created successfully",
        "You clicked the button!",
        "success"
      );
      this.$emit("refresh");
    },
  },
};
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

 