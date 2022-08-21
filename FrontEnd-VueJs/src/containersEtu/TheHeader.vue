<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none"> </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto"> </CHeaderNav>
    <CHeaderNav class="mr-4">
      Hi

      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
  },
  computed: {
    ...mapGetters(["user"]),
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
}
</style>
