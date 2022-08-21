<template>
  <CRow class="py-5">
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" header=" Total Etudiant" :text="nbr_etu">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>
              <router-link to="/users/etudiants"
                >Action
              </router-link></CDropdownItem
            >
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height: 70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" header="Total Module" :text="nbr_module">
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin" />
            </template>

            <CDropdownItem>
              <router-link to="/modules/get"
                >Action
              </router-link></CDropdownItem
            >
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height: 70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 } } }"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="warning"
        header=" Total Professeurs"
        :text="nbr_profs"
      >
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>
              <router-link to="/users/professeurs"
                >Action
              </router-link></CDropdownItem
            >
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height: 70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 } } }"
            point-hover-background-color="warning"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="danger" header="Total Classe" :text="nbr_class">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>

            <CDropdownItem>
              <router-link to="/classes">Action </router-link></CDropdownItem
            >
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height: 70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from "../charts/index.js";
import axios from "axios";
export default {
  name: "WidgetsDropdown",
  components: { CChartLineSimple, CChartBarSimple },
  props: [""],
  data() {
    return {
      nbr_profs: null,
      nbr_etu: null,
      nbr_class: null,
      nbr_module: null,
    };
  },
  created() {
    axios
      .get("admin/home")
      .then((response) => {
        this.nbr_class = response.data.data.classes_nbr;
        this.nbr_profs = response.data.data.profs_nbr;
        this.nbr_module = response.data.data.moduls_nbr;
        this.nbr_etu = response.data.data.etudiants_nbr;
      })
      .catch((error) => console.log(error));
  },
};
</script>
