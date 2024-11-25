<template>
  <label class="menu">마이페이지
    <ul class="submenu">
      <li v-if="!isLoggedIn" @click="login">로그인</li>
      <li v-if="!isLoggedIn" @click="signup">회원가입</li>
      <li v-if="isLoggedIn" @click="logout">로그아웃</li>
      <li v-if="isLoggedIn" @click="myreservation">나의 예약 페이지</li>
      <li v-if="isLoggedIn" @click="wishListSelect">나의 위시리스트</li>
      <li v-if="isLoggedIn" @click="myPage">마이페이지</li>
    </ul>
  </label>  
</template>
<script setup>
import router from '@/router';
import { isLoggedIn } from '@/stores/login';
const login = () =>{
  router.push({name : "signin"});
}
const signup = () =>{
  router.push({name : "signup"});
}
const logout = () =>{
  sessionStorage.removeItem('token');
  isLoggedIn.value = false;
  alert('ㅂㅂ');
  router.push("/");
}
const myreservation = () =>{
  router.push({name : "payment"});
}
const wishListSelect = () => {
  router.push({name : "wishlist"})
}
const myPage = () => {
  router.push({name: "myPage"})
}
</script>