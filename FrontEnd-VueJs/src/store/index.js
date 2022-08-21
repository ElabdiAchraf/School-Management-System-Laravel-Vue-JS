import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  user: null,
  classes: null,
  salles: null,
  modules: null,
  profs: null,
  etudiantsPfe: null,
  sidebarShow: 'responsive',
  sidebarMinimize: false
}
const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
    // get name of classes
    classe: (state) => {
      let classNAmes = state.classes.map(element => {
        if (element.name != 'class0') {
          let name = {};
          name.value = element.id;
          name.text = element.name;
          return name;
        }
      });
      return classNAmes;
    },
    //get salles
    salles: (state) => {
      let salles = state.salles.map(element => {
        let name = {};
        name.value = element.id;
        name.text = element.nom;
        return name;
      });
      return salles;
    },
    // get name of profs
    prof: (state) => {
      let ProfNAmes = state.profs.map(element => {
        let name = {};
        name.value = element.id;
        name.text = element.name;
        return name;
      });
      return ProfNAmes;
    },
    pfeEtu: (state) => {
      let PfeEtNAmes = state.etudiantsPfe.map(element => {
        let name = {};
        name.value = element.id;
        name.text = element.name;
        return name;
      });
      return PfeEtNAmes;
    },
    // get name of modules
    module: (state) => {
      let modulNAmes = state.modules.map(element => {
        let Name = element.titre;
        return Name;
      });
      return modulNAmes;
    },
    modules: (state) => {
      let modulNAmes = state.modules.map(element => {
        let name = {};
        name.value = element.id;
        name.text = element.titre;
        return name;
      });
      return modulNAmes;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    profs(state, prof) {
      state.profs = prof;
    },
    pfeEtu(state, etu) {
      state.etudiantsPfe = etu;
    },
    classe(state, classes) {
      state.classes = classes;
    },

    module(state, modules) {
      state.modules = modules;
    },
    salles(state, salles) {
      state.salles = salles;
    },
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
      state[variable] = value
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    classe(context, classes) {
      context.commit("classe", classes);
    },
    module(context, modules) {
      context.commit("module", modules);
    },
    salles(context, salles) {
      context.commit("salles", salles);
    },
    profs(context, profs) {
      context.commit("profs", profs);
    },
    pfeEtu(context, pfe) {
      context.commit("pfeEtu", pfe);
    },

  }


})


export default store;
