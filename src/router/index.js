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
import SignForm from '@/components/SignInForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import MyPage from '../views/MyPage.vue';
import UsernameFind from '@/components/UsernameFind.vue';
import PwFind from '@/components/PwFind.vue';



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
    { path: '/wishlist', name :'wishlist', component:Wishlist, meta: { requiresAuth: true }},
    { path: '/reservation', name:'reservation', component: Reservation, meta: { requiresAuth: true } },
    { path: '/payment', name:'payment', component: Payment, meta: { requiresAuth: true } },
    { path: "/signin", name: "signin", component: SignForm},
    { path: "/signup", name: "signup", component: SignUpForm},
    { path: "/pwFind", name: "pwFind", component: PwFind },
    { path: "/UsernameFind", name: "usernameFind", component: UsernameFind },
    { path: "/reviewInsert:accomNum", name:"reviewInsert",component:ReviewInsertPage },
    { path: "/mypage", name: "myPage", component: MyPage},
  ],
})
// function isAuthenticated() {
//   return !!sessionStorage.getItem('token'); // JWT 토큰 유무로 인증 확인
// }


// const allowedPages = ['main', 'signin', 'signup', 'accDetail', 'myPage', 'usernameFind', 'pwFind']; // 허용된 페이지 이름
// // 글로벌 가드
// router.beforeEach((to, from, next) => {
//   if (allowedPages.includes(to.name)) {
//     console.log("허용된 페이지당 힛");
//     next(); // 화이트리스트에 있으면 진행
//   } else if (to.meta.requiresAuth && !isAuthenticated()) {
//       console.log("인증이 필요한 페이지임");
//       // 인증이 필요한 페이지지만 로그인되지 않은 경우
//       next({ name: 'Login' }); // 로그인 페이지로 리다이렉트
//       // 조건을 만족하면 라우트 진행
//       next();
//   }
// });

export default router;
