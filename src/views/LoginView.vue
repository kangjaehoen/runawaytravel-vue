<template>
    <div class="login-view">
      <h1>로그인 페이지</h1>
  
      <!-- Username Input -->
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="아이디"
          @keyup.enter="login"
          v-model="state.form.username"
        />
        <label for="floatingInput">아이디</label>
      </div>
  
      <!-- Password Input -->
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="비밀번호"
          @keyup.enter="login"
          v-model="state.form.password"
        />
        <label for="floatingPassword">비밀번호</label>
      </div>
      <button class="btn btn-primary" @click="login">로그인</button>
    </div>
    <div v-if="state.message" class="response-message">
      {{ state.message }}
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";

  axios.defaults.withCredentials = true;

  export default {
    setup() {
      const state = reactive({
        form: {
          username: "",
          password: "",
        },
        message: "",
      });
      const router = useRouter();

      const login = () => {
        axios
          .post("http://localhost:8086/login", state.form, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
        const token = res.headers["authorization"];
        if (token) {
        sessionStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
      }router.push({ name: "Main" });
})
          .catch((error) => {
            // 상태 코드 및 에러 메시지 출력
            console.error("Login error:", error.response?.data || error.message);
            state.message = "로그인 실패. 아이디와 비밀번호를 확인하세요.";
          });
      };

      return {
        state,
        login,
      };
    },
  };
</script>

  
  <style scoped>
  .login-view {
    max-width: 330px;
    padding: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn {
    width: 100%;
  }
  </style>
  