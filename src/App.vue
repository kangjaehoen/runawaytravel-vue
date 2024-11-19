<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <Header />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/seller">판매자페이지</RouterLink>
      </nav>
      <main>
        <RouterView />
      </main>  
    </div>
  </header>
  <br>
  <RouterView />
  <Footer />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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