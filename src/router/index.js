import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SellerMenu from '@/pages/SellerMenu.vue'
import MyAcc from '@/pages/MyAcc.vue'
import AccReg from '@/pages/AccReg.vue'
import SellerCalendar from '@/pages/SellerCalendar.vue'
import Main from '../views/Main.vue';
import AccDetail from '@/views/AccDetail.vue';
import Reservation from '@/views/Reservation.vue';
import Payment from '@/views/Payment.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/aa', name: 'home', component: HomeView },
    { path: '/seller', name : 'seller', component : SellerMenu,
      children : [
        { path: 'myacc', name : 'myacc', component: MyAcc },
        { path: 'accreg', name : 'accreg', component: AccReg},
        { path: 'sellercalendar', name : 'sellercalendar', component : SellerCalendar}
      ]
    },
    { path: '/', name: 'main', component: Main },
    { path: '/accDetail/:accomNum', name:'accDetail', component: AccDetail, props:true},
    { path: '/reservation', name:'reservation', component: Reservation},
    { path: '/payment', name:'payment', component: Payment}
  ],
})

export default router
