<template>
    <header class="header">
      <div class="logo">
        <a href="/"> <!-- vue.js에서 a 태그대신 라우터 사용하기 -->
          <img src="/images/logo.png" alt="Logo" />
        </a>
      </div>
      <div class="headerRight">
      <Menu></Menu>
      
      </div>
    </header>
  </template>
  
  <script setup>
import Menu from './Menu.vue';

</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  min-width: 1200px;
  min-height: 170px;
}

.logo img {
width: 120px;
}
.headerRight{
display: flex;
}
</style>
