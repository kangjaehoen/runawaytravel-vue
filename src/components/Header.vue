<template>
    <header class="header">
      <div class="logo">
        <a href="/"> <!-- vue.js에서 a 태그대신 라우터 사용하기 -->
          <img src="/images/logo.png" alt="Logo" />
        </a>
      </div>
      <div style="display: flex; align-items: center; margin-right: 40px;">
        <!-- 로그인 상태에 따라 호스트 모드 표시 -->
        <div v-if="sessionId">
          <a :href="`/sellerPage?id=${sessionId}`" id="hostMove">호스트 모드로 전환</a><br />
        </div>
        <!-- 프로필 및 메뉴 -->
        <div id="myPage" style="position: relative;">
          <!-- <img
            src="/images/profile.png"
            alt="Profile"
            style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;"
          /> -->
          <span style="font-size: 24px; cursor: pointer;" @click="toggleMenu">&#9776;</span>
          <!-- 로그인 여부에 따라 다른 메뉴 표시 -->
          <div v-if="menuVisible && !sessionId" id="myPageList">
            <div id="loginMoveBtn">
              <a href="/loginForm.html">로그인</a>
            </div>
            <br />
            <div>
              <a href="/registerForm.html">회원가입</a>
            </div>
            <br />
            <div>도움말 센터</div>
          </div>
          <div v-if="menuVisible && sessionId" id="myPageList2">
            <div>
              <a href="/payment">결제내역</a>
            </div>
            <br />
            <div>
              <a href="/logout">로그아웃</a>
            </div>
            <br />
            <div>도움말 센터</div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // 세션 ID (임시로 상수로 설정, 실제로는 API나 상태 관리에서 가져와야 함)
  const sessionId = ref(null); // 로그인된 유저의 세션 ID
const menuVisible = ref(false);

// 메뉴 토글
const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
};
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f8f8;
}

.logo img {
width: 120px;
}

#myPageList,
#myPageList2 {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 10;
}

#myPageList div,
#myPageList2 div {
margin: 10px 0;
    font-size: 14px;
}

#myPageList a,
#myPageList2 a {
    text-decoration: none;
    color: #333;
}

#myPageList a:hover,
#myPageList2 a:hover {
    color: #007bff;
}
</style>
