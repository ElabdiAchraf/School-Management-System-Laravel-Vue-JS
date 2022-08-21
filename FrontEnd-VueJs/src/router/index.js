import Vue from 'vue'
import VueRouter from 'vue-router'
import Emploi from '../components/Etudiants/Emploi_De_Temps.vue'
import admin from '../components/AdminViews/AdminDashboard.vue'
import prof from '../components/Prof/ProfDashboard.vue'
import etu from '../components/Etudiants/EtudiantDashboard.vue'
import Mes_Notes from '../components/Etudiants/mes_notes.vue'
import reserver from '../components/Prof/reserver.vue'
import Mes_Modules from '../components/Prof/gestion_Notes/Mes_Modules.vue'
import gestion_notes from '../components/Prof/gestion_Notes/gestion_notes.vue'
import enter_notes from '../components/Prof/gestion_Notes/enterNotes.vue'
import login from '../components/login.vue'
import page404 from '../components/Page404.vue'
import TheContainer from '@/containers/TheContainer.vue'
import TheContainerProf from '@/containers2/TheContainer.vue'
import TheContainerEtu from '@/containersEtu/TheContainer.vue'
import register from '../components/register.vue'
import forgot from '../components/forgot.vue'
import reset from '../components/reset.vue'
import createUser from '../components/AdminViews/gestion_utilisateurs/CreeTeachers.vue'
import Etudiant from '../components/AdminViews/gestion_utilisateurs/Etudiant.vue'
import NEtudiant from '../components/AdminViews/gestion_utilisateurs/NewEtudiant.vue'
import getModules from '../components/AdminViews/gestion_modules/getModules.vue'
import getClasse from '../components/AdminViews/gestion_Classes/getClasses.vue'
import Salles from '../components/AdminViews/gestion_salles/getSalles.vue'
import Seances from '../components/AdminViews/gestion_seances_emploiT/getSalles.vue'
import Professeur from '../components/AdminViews/gestion_utilisateurs/Professeur.vue'
import Reservations from '../components/AdminViews/gestion_reservation/getSalles.vue'
import Pfe from '../components/AdminViews/gestion_PFE/getPFE.vue'
//import store from '../store'

Salles
Vue.use(VueRouter)

let routes = [
  {
    path: "/",
    redirect: "/login"
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register

  },
  {
    path: '/forgot',
    name: 'forgot',
    component: forgot

  }
  , {
    path: '/reset/:token',
    name: 'reset',
    component: reset
  },
  {
    path: '/page404',
    name: '404',
    component: page404
  },
  //-------------------ADMIN---------------------------
  {
    path: '/admin',
    name: 'admin',
    component: TheContainer,
    beforeEnter: (to, from, next) => {
      let role = localStorage.getItem("role");
      if (role != 2)
        next({ name: '404' });
      else
        next();
    },
    children:
      [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: admin
        },
        {
          path: 'users',
          redirect: '/users/create',
          name: 'users',
          component: {
            render(c) { return c('router-view') }
          },
          children:
            [
              {
                path: '/users/create',
                name: 'cree_user',
                component: createUser
              },
              {
                path: '/users/etudiants',
                name: 'etudiants',
                component: Etudiant
              },
              {
                path: '/users/newetudiants',
                name: 'etudiants',
                component: NEtudiant
              },
              {
                path: '/users/professeurs',
                name: 'profs',
                component: Professeur
              },
            ]
        },

        {
          path: 'modules',
          redirect: '/modules/get',
          name: 'users',
          component: {
            render(c) { return c('router-view') }
          },
          children:
            [
              {
                path: '/modules/get',
                name: 'getModules',
                component: getModules
              },
            ]
        },
        {
          path: '/classes',
          name: 'classes',
          component: getClasse
        },
        {
          path: '/salles',
          name: 'salles',
          component: Salles
        },
        {
          path: '/seances',
          name: 'Seances',
          component: Seances
        },
        {
          path: '/reservation',
          name: 'Reservations',
          component: Reservations
        },
        {
          path: '/pfes',
          name: 'PFE',
          component: Pfe
        },



      ]
  },
  //-------------------Prof----------------------------
  {
    path: '/prof',
    name: 'prof',
    component: TheContainerProf,
    beforeEnter: (to, from, next) => {
      let role = localStorage.getItem("role");
      if (role < 1)
        next({ name: '404' });
      else
        next();
    },
    children:
      [
        {
          path: '/prof/dashboard',
          name: 'Dashboard',
          component: prof
        },
        {
          path: '/prof/mes_modules',
          name: 'mes_modules',
          component: Mes_Modules
        },
        {
          path: '/gestion_notes/:id',
          name: 'gestion_notes',
          params: 'id',
          component: gestion_notes
        },
        {
          path: '/enter_notes/:id',
          name: 'enter_notes',
          params: 'id',
          component: enter_notes
        },
        {
          path: '/prof/reserver',
          name: 'reserver salle',
          params: 'id',
          component: reserver
        },
      ]
  },
  //-------------------Etudiant-------------------------
  {
    path: '/etudiant',
    name: 'Home',
    component: TheContainerEtu,
    beforeEnter: (to, from, next) => {
      let role = localStorage.getItem("role");
      if (role != 0)
        next({ name: '404' });
      else
        next();
    },
    children:
      [
        {
          path: '/etudiant/dashboard',
          name: 'Dashboard',
          component: etu
        },
        {
          path: '/etudiant/mesnotes',
          name: 'mes_modules',
          component: Mes_Notes
        },
        {
          path: '/gestion_notes/:id',
          name: 'gestion_notes',
          params: 'id',
          component: gestion_notes
        },
        {
          path: 'etudiant/emploi',
          name: 'Emploi',
          params: 'id',
          component: Emploi
        },
        {
          path: '/prof/reserver',
          name: 'reserver salle',
          params: 'id',
          component: reserver
        },
      ]
  }

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.name !== 'login' && to.name !== 'forgot' && to.name !== 'reset' && to.name !== 'register' && token == null)
    next({ name: 'login' });
  else
    next();
})

export default router
