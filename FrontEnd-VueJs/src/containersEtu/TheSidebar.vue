<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand
      class="d-md-down-none text-decoration-none"
      to="/etudiant/dashboard"
    >
      <span class="px-3 logo text-white c-sidebar-brand-full"> LSI2021 </span>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav2";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>
<style  scoped>
.logo {
  font-family: Impact, Charcoal, sans-serif;
  font-size: 30px;
  letter-spacing: 0.2px;
  word-spacing: -0.8px;
  font-weight: 400;
  font-style: italic;
  font-variant: small-caps;
  text-transform: uppercase;
  text-decoration: none;
}
</style>
