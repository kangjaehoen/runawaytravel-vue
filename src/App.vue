<template>
  <div>
  <Header />
  
  <main>
    <RouterView />
  </main>  

  <Footer />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Main from './views/Main.vue';
import AccDetail from './views/AccDetail.vue';
import Reservation from './views/Reservation.vue';
import Payment from './views/Payment.vue';
</script>
<style scoped>
main {
    flex: 1; /* 메인 콘텐츠가 가능한 공간을 최대한 차지하도록 설정 */
    padding-top: 60px; /* 헤더 높이만큼 상단 여백 */
    padding-bottom: 40px; /* 푸터 높이만큼 하단 여백 */
}
</style>