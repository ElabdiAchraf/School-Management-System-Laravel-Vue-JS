<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit="onSubmit">
                <h1>Reset</h1>
                <p class="text-muted">Reset your password</p>
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
                  v-model="password_c"
                >
                </CInput>
                <CButton color="success" type="submit" block>reset</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script>
import axios from "axios";
//import axios from "axios";

export default {
  name: "reset",
  data() {
    return {
      password: "",
      password_c: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const response = await axios.post("reset", {
        password: this.password,
        password_c: this.password_c,
        token: this.$route.params.token,
      });

      console.log(response);
      this.$router.push("/login");
    },
  },
};
</script>
