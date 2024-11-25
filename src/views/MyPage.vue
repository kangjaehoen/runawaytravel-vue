<template>
    <div>
      <p>안녕하세요, {{ username }}님!</p>
    </div>
    <div>
      <!-- 개인정보 수정 페이지로 이동 -->
      <button @click="goToEditProfile">개인정보 수정</button>
    </div>
    <div>
      <li @click="myReservation">나의 예약 페이지</li>
    </div>
    <div>
      <li @click="wishListSelect">나의 위시리스트</li>
    </div>
  </template>
  
  <script>
  import { jwtDecode } from "jwt-decode";
  import { ref, onMounted } from "vue";
  import router from "@/router";
  
  export default {
    name: "UserProfile",
    setup() {
      const username = ref("");
  
      onMounted(() => {
        const token = sessionStorage.getItem("token");
  
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            username.value = decodedToken.username;
          } catch (error) {
            console.error("토큰 디코딩 문제:", error);
          }
        } else {
          console.log("토큰이 없음");
        }
      });
  
      const myReservation = () => {
        router.push({ name: "payment" });
      };
  
      const wishListSelect = () => {
        router.push({ name: "wishlist" });
      };
  
      const goToEditProfile = () => {
        router.push({ name: "editProfile" }); // 적절한 라우트 이름으로 수정 필요
      };
  
      return {
        username,
        myReservation,
        wishListSelect,
        goToEditProfile,
      };
    },
  };
  </script>
  