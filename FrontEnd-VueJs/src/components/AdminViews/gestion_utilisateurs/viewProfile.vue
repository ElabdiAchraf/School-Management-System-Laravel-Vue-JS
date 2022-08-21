<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col class="text-primary" v-if="profile.role == 0">CNE</b-col>
      <b-col v-if="profile.role == 0">{{ profile.CNE }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Nom</b-col>
      <b-col>{{ profile.nom }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Prenom</b-col>
      <b-col>{{ profile.prenom }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Date Nais</b-col>
      <b-col>{{ profile.date_naiss }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Sexe</b-col>
      <b-col>{{ profile.sexe }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Phone</b-col>
      <b-col>{{ profile.phone }}</b-col>
      <div class="w-100"></div>
      <b-col class="text-primary">Address</b-col>
      <b-col>{{ profile.address }}</b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: ["profile"],
};
</script>