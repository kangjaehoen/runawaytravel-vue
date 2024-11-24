<template>
    <div class="wrapper">
      <Header></Header>
      <RouterView></RouterView>
  </div>
  <br>
  <Footer></Footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>
<style>
@font-face {
    font-family: 'NPSfontBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/NPSfontBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
*{
  font-family: 'NPSfontBold';
}
</style>