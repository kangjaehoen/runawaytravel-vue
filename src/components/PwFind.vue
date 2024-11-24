<template>
    <div>
      <h2>비밀번호 찾기</h2>
      <form @submit.prevent="pwFind">
        <label>
          아이디
          <input
            type="text"
            name="username"
            v-model="state.form.username"
            placeholder="(필수)"
            required
          />
        </label>
        <br />
        <label>
          이름
          <input
            type="text"
            name="name"
            v-model="state.form.name"
            placeholder="(필수)"
            required
          />
        </label>
        <br />
        <label>
          생년월일
          <input
            type="date"
            name="birth"
            v-model="state.form.birth"
            placeholder="YY/MM/DD"
            required
          />
        </label>
        <br />
        <label>
          이메일
          <input
            type="email"
            name="email"
            v-model="state.form.email"
            placeholder="example@email.com"
            required
          />
        </label>
        <br />
        <button type="submit">확인</button>
      </form>
  
      <!-- 결과 메시지 -->
      <p v-if="state.message">{{ state.message }}</p>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { reactive } from "vue";
  
  const state = reactive({
    form: {
      username: "",
      name: "",
      birth: "",
      email: ""
    },
    message: ""
  });
  
  const pwFind = async () => {
    try {
      const response = await axios.post("/api/PwFind", state.form, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json"
        }
      });
  
      // API 성공 시 처리
      if (response.data.temporaryPassword) {
        state.message = `회원님의 임시 비밀번호는 "${response.data.temporaryPassword}"입니다.`;
        console.log("비밀번호 바꿔놓음 히힛:", response.data.temporaryPassword);
      } else {
        state.message = "비밀번호를 찾을 수 없습니다.";
        console.error("비밀번호 찾기 실패:", response.data);
      }
    } catch (error) {
      // API 실패 시 처리
      state.message = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      console.error("API 요청 오류:", error);
    }
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  
  p {
    color: green;
    font-weight: bold;
  }
  </style>
  