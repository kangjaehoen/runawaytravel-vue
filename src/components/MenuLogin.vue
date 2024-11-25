<template>
  <label class="menu">마이페이지
    <ul class="submenu">
      <li v-if="!isLoggedIn" @click="login">로그인</li>
      <li v-if="isLoggedIn" @click="logout">로그아웃</li>
      <li v-if="!isLoggedIn" @click="signup">회원가입</li>
      <li v-if="!isLoggedIn" @click="usernameFind">아이디 찾기</li>
      <li v-if="!isLoggedIn" @click="pwFind">비밀번호 찾기</li>
      <li v-if="isLoggedIn" @click="myPage">마이페이지</li>
    </ul>
  </label>  
</template>
<script setup>
import router from '@/router';
import { isLoggedIn } from '@/stores/login';
const login = () =>{
  console.log("dd")
  router.push({name : "signin"});
}
const signup = () =>{
  router.push({name : "signup"});
}
const logout = () =>{
  sessionStorage.removeItem('token');
  isLoggedIn.value = false;
  // alert('ㅂㅂ');
  router.push("/");
}
// const myreservation = () =>{
//   router.push({name : "payment"});
// }
// const wishListSelect = () => {
//   router.push({name : "wishlist"})
// }
const usernameFind =() => {
  router.push({name: "usernameFind"});
}
const pwFind =() => {
  router.push({name: "pwFind"});
}
const myPage = () => {
  router.push({name: "myPage"})
}

</script>