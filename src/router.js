import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
// import Contact from './views/Contact.vue'
// import HouseDetails from './views/HouseDetails.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: Contact
    // },
    // {
    //   path: '/house/:houseId?',
    //   name: 'house-details',
    //   component: HouseDetails
    // },
  ]
  })