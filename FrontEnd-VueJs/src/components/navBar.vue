<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="px-5">
      <router-link to="/">NavBar</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="!user" class="ms-auto">
          <b-nav-item>
            <button><router-link to="register"> register </router-link></button>
          </b-nav-item>
          <b-nav-item> <router-link to="login">login</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ms-auto">
          <b-nav-item>
            <button @click="logOut">logOut</button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "navBar",
  // props: ["user"],
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<style  scoped>
.navbar {
  display: flex;
  justify-content: space-between !important;
}
#nav-collapse {
  width: 200px;
}
</style>
