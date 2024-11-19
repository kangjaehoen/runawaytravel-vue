import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyAcc from '@/pages/MyAcc.vue'
import SellerMenu from '@/components/SellerMenu.vue'
import AccReg from '@/pages/AccReg.vue'
import ReviewRate from '@/components/ReviewRate.vue'
import ReviewInsertPage from '@/pages/ReviewInsertPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/MyAcc', component: MyAcc },
    { path: '/Seller', component : SellerMenu},
    { path: '/AccReg', component: AccReg},
    { path: '/reviewRate', component:ReviewRate},
    { path: '/reviewInsert', component:ReviewInsertPage}
  ],
})

export default router
