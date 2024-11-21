import { createRouter, createWebHistory } from 'vue-router'
import MyAcc from '@/pages/MyAcc.vue'
import AccReg from '@/pages/AccReg.vue'
import SellerCalendar from '@/pages/SellerCalendar.vue'
import Main from '../views/Main.vue';
import AccDetail from '@/views/AccDetail.vue';
import Reservation from '@/views/Reservation.vue';
import Payment from '@/views/Payment.vue';
import SellerPage from '@/pages/SellerPage.vue';
import ReviewInsertPage from '@/pages/ReviewInsertPage.vue';
import Wishlist from '@/views/WishList.vue';
   import LoginView from '../views/LoginView.vue';
   import JoinView from '../views/JoinView.vue';
   import Logout from '../views/Logout.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/seller', name : 'seller', component : SellerPage,
      children : [
        { path: 'myacc', name : 'myacc', component: MyAcc },
        { path: 'accreg', name : 'accreg', component: AccReg},
        { path: 'sellercalendar', name : 'sellercalendar', component : SellerCalendar}
      ]
    },
    { path: '/', name: 'main', component: Main },
    { path: '/accDetail/:accomNum', name:'accDetail', component: AccDetail, props:true},
    { path: '/reservation', name:'reservation', component: Reservation},
    { path: '/payment', name:'payment', component: Payment},
	  { path: '/reviewInsertPage/:accomNum', component:ReviewInsertPage},
    { path: '/wishlist', name :'wishlist', component:Wishlist},
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      props:true
    },
    {
      path: "/join",
      name: "Join",
      component: JoinView,
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout,
    }
  ],
})

export default router
