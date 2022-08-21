<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12">
        <b-jumbotron bg-variant="white" class="overflow-auto">
          <template #header>Emploi de Temps</template>
          <hr class="my-4" />
          <div class="card overflow-auto">
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <th width="125">Time</th>
                  <th v-for="jour in jours" :key="jour.value">
                    {{ jour.text }}
                  </th>
                </thead>
                <tbody>
                  <tr v-for="item in heures" :key="item.id">
                    <td>
                      {{ item.value }}
                    </td>
                    <td v-for="jour in jours" :key="jour.id">
                      <span v-for="seance in Seances" :key="seance.id">
                        <span
                          v-if="
                            seance.num == item.id && seance.jour == jour.value
                          "
                        >
                          module :<CBadge color="info">{{
                            seance.module
                          }}</CBadge>
                          <br />
                          prof :
                          <CBadge color="success">{{
                            seance.professeur
                          }}</CBadge>
                          <br />
                          salle :<CBadge color="danger">{{
                            seance.Salle
                          }}</CBadge>
                          <br />
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      Seances: [],
      jours: [
        { value: 1, text: "lundi" },
        { value: 2, text: "mardi" },
        { value: 3, text: "mercredi" },
        { value: 4, text: "jeudi" },
        { value: 5, text: "vendredi" },
        { value: 6, text: "samedi" },
      ],
      heures: [
        {
          value: "8:30-10:15",
          id: 1,
        },
        {
          value: "10:30-12:15",
          id: 2,
        },
        {
          value: "14:30-16:15",
          id: 3,
        },
        {
          value: "16:30-18:15",
          id: 4,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {},
  created() {
    axios
      .get("user/emploi")
      .then((response) => {
        this.Seances = response.data.data.map((item, id) => {
          return { ...item, id };
        });
      })
      .catch((error) => console.log(error));
    this.loading = false;
  },
};
</script>
