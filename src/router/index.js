
import { createRouter, createWebHistory } from 'vue-router'

import ReviewInsertPage from '@/pages/ReviewInsertPage.vue'
import SellerMenu from '@/pages/SellerMenu.vue'
import MyAcc from '@/pages/MyAcc.vue'
import AccReg from '@/pages/AccReg.vue'
import SellerCalendar from '@/pages/SellerCalendar.vue'
import Main from '../views/Main.vue';
import AccDetail from '@/views/AccDetail.vue';
import Reservation from '@/views/Reservation.vue';
import Payment from '@/views/Payment.vue';
   import LoginView from '../views/LoginView.vue';
   import JoinView from '../views/JoinView.vue';
   import Logout from '../views/Logout.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/reviewInsert/:accomNum', component:ReviewInsertPage, meta: { requiresAuth: true } },
    { path: '/seller', name : 'seller', component : SellerMenu, meta: { requiresAuth: true },
      children : [
        { path: 'myacc', name : 'myacc', component: MyAcc },
        { path: 'accreg', name : 'accreg', component: AccReg},
        { path: 'sellercalendar', name : 'sellercalendar', component : SellerCalendar}
      ]
    },
    { path: '/', name: 'main', component: Main },
    { path: '/accDetail/:accomNum', name:'accDetail', component: AccDetail, props:true},
    { path: '/reservation', name:'reservation', component: Reservation, meta: { requiresAuth: true } },
    { path: '/payment', name:'payment', component: Payment, meta: { requiresAuth: true } },
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
      meta: { requiresAuth: true } 
    }
  ],
})
function isAuthenticated() {
  return !!sessionStorage.getItem('token'); // JWT 토큰 유무로 인증 확인
}

const allowedPages = ['main', 'Login', 'Join', 'accDetail']; // 허용된 페이지 이름
// 글로벌 가드
router.beforeEach((to, from, next) => {
  if (allowedPages.includes(to.name)) {
    next(); // 화이트리스트에 있으면 진행
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
      // 인증이 필요한 페이지지만 로그인되지 않은 경우
      next({ name: 'Login' }); // 로그인 페이지로 리다이렉트
      // 조건을 만족하면 라우트 진행
      next();
  }
});

export default router;
