<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <!-- <transition name="fade">
            <CAlert v-if="check != null" show color="success" class="my-3"
              >check your mail</CAlert
            >
          </transition> -->

          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit="onSubmit">
                  <h1>Reset Password</h1>
                  <CInput
                    placeholder="Your Email"
                    autocomplete="username email"
                    v-model="email"
                  >
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4"
                        >Send</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <router-link to="/register" class="text-white">
                  <CButton color="light" variant="outline" size="lg"
                    >Register Now!</CButton
                  >
                </router-link>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "forgot",
  data() {
    return {
      email: "",
      check: null,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const response = await axios.post("forgot", {
        email: this.email,
      });

      this.email = "";
      this.check = 1;
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "check your email",
        showConfirmButton: false,
      });
      // alert("check your email!!");
      console.log(response);
    },
  },
};
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
