
  <template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit="onSubmit">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="email"
                  >
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4"
                        >Login</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      >
                      <router-link to="/forgot" class="text-white">
                        <CButton color="link" class="px-0"
                          >Forgot password?</CButton
                        >
                      </router-link>
                      <router-link to="/register" class="text-white">
                        <CButton color="link" class="d-lg-none"
                          >Register now!</CButton
                        >
                      </router-link>
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
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      // let response
      await axios
        .post("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.data.role);
          this.$store.dispatch("user", response.data.data.name);
          console.log(response.data.success);

          if (response.data.data.pass_hashed == 0) this.$router.push("/forgot");
          else {
            if (response.data.data.role == 2) {
              this.$router.push("/admin/dashboard");
            } else if (response.data.data.role == 1) {
              this.$router.push("/prof/dashboard");
            } else {
              this.$router.push("/etudiant/dashboard");
            }
          }
        })
        .catch(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "Invalid email/password",
          });
        });
    },
  },
};
</script>