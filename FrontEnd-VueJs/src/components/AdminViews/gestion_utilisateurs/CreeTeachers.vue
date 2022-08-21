<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <b-jumbotron bg-variant="white">
        <template #header>Gestion Utilisateur</template>

        <hr class="my-4" />
        <CRow class="justify-content-center">
          <CCol md="12">
            <CCard class="mx-4 mb-0">
              <CCardBody class="p-4">
                <h1>Créé Utilisateur</h1>
                <p class="text-muted">Create an account</p>
                <CRow class="align-items-center">
                  <CCol col="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
                    <CButton
                      @click="profRole"
                      block
                      :variant="outlineP"
                      color="primary"
                      >prof</CButton
                    >
                  </CCol>
                  <CCol col="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
                    <CButton
                      @click="etuRole"
                      block
                      color="success"
                      :variant="outlineE"
                      >Etudiant</CButton
                    >
                  </CCol>
                </CRow>
                <transition name="fade">
                  <CForm v-if="role != null" @submit="onSubmit" class="my-3">
                    <CInput
                      v-if="role == 0"
                      placeholder="CNE"
                      autocomplete="CNE"
                      v-model="CNE"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user"
                      /></template>
                    </CInput>
                    <CInput
                      placeholder="nom"
                      autocomplete="username"
                      v-model="name"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user"
                      /></template>
                    </CInput>
                    <CInput
                      placeholder="prenom"
                      autocomplete="username"
                      v-model="prenom"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user"
                      /></template>
                    </CInput>

                    <b-form-select
                      class="my-3"
                      v-model="class_id"
                      :options="optionsClass"
                      v-if="role == 0"
                    ></b-form-select>
                    <b-form-select
                      class="my-3"
                      v-model="module_titre"
                      :options="optionsModul"
                      v-if="role == 1"
                    ></b-form-select>

                    <CInput
                      placeholder="Email"
                      autocomplete="email"
                      prepend="@"
                      v-model="email"
                    />
                    <CInput
                      placeholder="Password"
                      type="password"
                      autocomplete="new-password"
                      v-model="password"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-lock-locked"
                      /></template>
                    </CInput>
                    <CInput
                      placeholder="Repeat password"
                      type="password"
                      autocomplete="new-password"
                      class="mb-4"
                      v-model="c_password"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-lock-locked"
                      /></template>
                    </CInput>
                    <CButton color="primary" type="submit" block
                      >Create Account</CButton
                    >
                  </CForm>
                </transition>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </b-jumbotron>
    </CContainer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      // fade: "",
      outlineP: "outline",
      outlineE: "outline",
      email: "",
      name: "",
      prenom: "",
      CNE: "",
      password: "",
      c_password: "",
      role: null,
      class_id: 1,
      check: null,
      module_titre: "java",
    };
  },
  mounted() {
    console.log(this.$store.getters.classe);
  },
  created() {
    axios
      .get("admin/home")
      .then((response) => {
        this.$store.dispatch("module", response.data.data.moduls);
        this.$store.dispatch("classe", response.data.data.classes);
      })
      .catch((error) => console.log(error));
  },
  computed: {
    optionsModul() {
      return this.$store.getters.module;
    },
    optionsClass() {
      return this.$store.getters.classe;
    },
  },
  methods: {
    etuRole() {
      this.outlineP = "outline";
      this.role = 0;
      this.outlineE = "";
    },
    profRole() {
      this.outlineE = "outline";
      this.role = 1;
      this.outlineP = "";
    },

    async onSubmit(event) {
      event.preventDefault();
      await axios.post("admin/create/user", {
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
      this.check = 1;
      this.email = "";
      this.name = "";
      this.role = "";
      this.password = "";
      this.c_password = "";
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

 