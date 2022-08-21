<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="12">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <h1>Edit Profile</h1>
              <p class="text-muted">Create an account</p>
              <transition name="fade">
                <CForm @submit="onSubmit" class="my-3">
                  <CInput
                    placeholder="nom"
                    autocomplete="username"
                    v-model="info.nom"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="prenom"
                    autocomplete="username"
                    v-model="info.prenom"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    label="date de naissance"
                    type="date"
                    v-model="info.date_naiss"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <input type="radio" id="one" value="F" v-model="info.sexe" />
                  <label for="one">F</label>
                  <br />
                  <input type="radio" id="two" value="M" v-model="info.sexe" />
                  <label for="two">M</label>
                  <CInput label="Phone" v-model="info.phone">
                    <template #prepend-content>
                      <i class="cis-contact-phone"></i>
                    </template>
                  </CInput>
                  <b-form-textarea
                    id="textarea"
                    v-model="info.address"
                    placeholder="address..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>

                  <CButton class="my-3" color="primary" type="submit" block
                    >Create Account</CButton
                  >
                </CForm>
              </transition>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",
  props: ["info"],
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await axios.post(`profile/update/${this.info.id}`, {
        nom: this.info.nom,
        prenom: this.info.prenom,
        address: this.info.address,
        phone: this.info.phone,
        sexe: this.info.sexe,
        date_naiss: this.info.date_naiss,
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