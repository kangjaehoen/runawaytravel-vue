import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SellerMenu from '@/pages/SellerMenu.vue'
import MyAcc from '@/pages/MyAcc.vue'
import AccReg from '@/pages/AccReg.vue'
import SellerCalendar from '@/pages/SellerCalendar.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/seller', name : 'seller', component : SellerMenu,
      children : [
        { path: 'myacc', name : 'myacc', component: MyAcc },
        { path: 'accreg', name : 'accreg', component: AccReg},
        { path: 'sellercalendar', name : 'sellercalendar', component : SellerCalendar}
      ]
    },
  ],
})

export default router
