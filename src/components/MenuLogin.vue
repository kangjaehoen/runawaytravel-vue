<template>
  <label class="menu">마이페이지
    <ul class="submenu">
      <li @click="login">로그아웃</li>
      <li @click="myreservation">나의 예약 페이지</li>
      <li @click="wishListSelect">나의 위시리스트</li>
    </ul>
  </label>
</template>
<script setup>
import router from '@/router';
const login = () =>{
  router.push({name : "main"});
}
const myreservation = () =>{
  router.push({name : "payment"});
}
const wishListSelect = () => {
  router.push({name : "wishlist"})
}
</script>