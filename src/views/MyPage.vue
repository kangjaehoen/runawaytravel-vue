<template>
  <div class = "box">
  <div class="profile-container">
    <p class="profile-header">안녕하세요, {{ username }}님!</p>
    <div class="button-group">
      <button @click="myReservation">나의 예약 페이지</button>
      <button @click="wishListSelect">나의 위시리스트</button>
      <button class="logout-button" @click="logout">로그아웃</button>
    </div>
  </div>
</div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted } from "vue";
import router from "@/router";
import { isLoggedIn } from '@/stores/login';

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

    const logout = () => {
      if (confirm("로그아웃 하시겠습니까?")) {
        isLoggedIn.value =false;
        sessionStorage.removeItem("token");
        router.push("/");
      }
    };

    const myReservation = () => {
      router.push({ name: "payment" });
    };

    const wishListSelect = () => {
      router.push({ name: "wishlist" });
    };

    return {
      username,
      myReservation,
      wishListSelect,
      logout,
    };
  },
};
</script>

<style scoped>
.box{
  min-height: 700px;
}
.profile-container {
  width: 100%;
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}

.profile-header {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.98);
}

button:first-of-type {
  background-color: #007bff;
}

button:nth-of-type(2) {
  background-color: #6c757d;
}

button:nth-of-type(3) {
  background-color: #28a745;
}

button:nth-of-type(4) {
  background-color: #ffc107;
}

.logout-button {
  background-color: #dc3545;
}
</style>
