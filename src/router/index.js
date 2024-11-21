
import { createRouter, createWebHistory } from 'vue-router'
import AccDetail from '@/views/AccDetail.vue';
import Reservation from '@/views/Reservation.vue';
import Payment from '@/views/Payment.vue';
import SellerPage from '@/pages/SellerPage.vue'
import MainView from '../views/MainView.vue';
import LoginView from '../views/LoginView.vue';
import JoinView from '../views/JoinView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/reviewInsert/:accomNum', component:ReviewInsertPage },

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
    {
      path: "/",
      name: "Main",
      component: MainView,
    },
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
  ],
})
function isAuthenticated() {
  return !!localStorage.getItem('token'); // JWT 토큰 유무로 인증 확인
}

// 글로벌 가드
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
      // 인증이 필요한 페이지지만 로그인되지 않은 경우
      next({ name: 'Login' }); // 로그인 페이지로 리다이렉트
  } else {
      // 조건을 만족하면 라우트 진행
      next();
  }
});

export default router;
