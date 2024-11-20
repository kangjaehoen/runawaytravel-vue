<template>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
        
      <Header></Header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/seller">판매자페이지</RouterLink>
      </nav>
      <RouterView></RouterView>
  </div>
  <br>
  <Footer></Footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>
<style scoped>
main {
    flex: 1; /* 메인 콘텐츠가 가능한 공간을 최대한 차지하도록 설정 */
    padding-top: 60px; /* 헤더 높이만큼 상단 여백 */
    padding-bottom: 40px; /* 푸터 높이만큼 하단 여백 */
}
</style>