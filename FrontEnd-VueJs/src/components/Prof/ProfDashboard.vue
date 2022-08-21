<template>
  <div>
    <WidgetsDropdown />
    <!-- <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Traffic</h4>
            <div class="small text-muted">November 2017</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-right">
              <CIcon name="cil-cloud-download" />
            </CButton>
            <CButtonGroup class="float-right mr-3">
              <CButton
                color="outline-secondary"
                v-for="(value, key) in ['Day', 'Month', 'Year']"
                :key="key"
                class="mx-0"
                :pressed="value === selected ? true : false"
                @click="selected = value"
              >
                {{ value }}
              </CButton>
            </CButtonGroup>
          </CCol>
        </CRow>
        <MainChartExample style="height: 300px; margin-top: 40px" />
      </CCardBody>
      <CCardFooter>
        <CRow class="text-center">
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="success"
              :value="40"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="info"
              :value="20"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="warning"
              :value="60"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="danger"
              :value="80"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Bounce Rate</div>
            <strong>Average Rate (40.15%)</strong>
            <CProgress class="progress-xs mt-2" :precision="1" :value="40" />
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
    <WidgetsBrand />
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader> Traffic &amp; Sales </CCardHeader>
          <div class="fullcalendar-basic"></div>
        </CCard>
      </CCol>
    </CRow> -->
    <b-calendar block locale="en-US"></b-calendar>
  </div>

  <!-- <h1>Prof</h1>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text v-if="user"> hello {{ user }} </b-card-text>
      <b-card-text v-else> You are not login </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import WidgetsDropdown from "../../views/widgets/WidgetsDropdown";
export default {
  name: "ProfDashboard",
  components: {
    WidgetsDropdown,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    axios
      .get("prof/home")
      .then((response) => {
        this.$store.dispatch("salles", response.data.data.salles);
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>