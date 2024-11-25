<template>
    <div class="box">
    <div class="container">
      <h2>아이디 찾기</h2>
      <form @submit.prevent="usernameFind">
        <label>
          이름
          <input type="text" v-model="state.form.name" name="name" placeholder="(필수)" required />
        </label>
        <label>
          생년월일
          <input type="date" name="birth" v-model="state.form.birth" placeholder="YY/MM/DD" required />
        </label>
        <label>
          이메일
          <input type="email" name="email" v-model="state.form.email" placeholder="example@email.com" required />
        </label>
        <button type="submit">확인</button>
      </form>
      <div v-if="state.message" class="response-message">{{ state.message }}</div>
    </div>
</div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { reactive } from "vue";
  
  const state = reactive({
    form: {
      name: "",
      birth: "",
      email: ""
    },
    message: ""
  });
  
  const usernameFind = () => {
    axios
      .post("http://localhost:8086/api/UsernameFind", state.form, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.data.username) {
          state.message = `회원님의 아이디는 "${res.data.username}"입니다.`;
        }
      })
      .catch((error) => {
        state.message = "아이디를 찾을 수 없습니다.";
        console.error("아이디 찾기 오류:", error);
      });
  };
  </script>
  
  <style scoped>
  .box{
  min-height: 700px;
}
  .container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  button {
    padding: 10px;
    background-color: #8dbf3d;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .response-message {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #28a745;
  }
  </style>
  

