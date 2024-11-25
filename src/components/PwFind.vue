
<template><div class="box">
  <div class="container">
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
      <button type="submit">확인</button>
    </form>

    <p :class="{ success: state.message.includes('임시 비밀번호') }">
      {{ state.message }}
    </p>
  </div>
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
      const response = await axios.post("http://localhost:8086/api/PwFind", state.form, {

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
    font-family: Arial, sans-serif;
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
  
  input:focus {
    border-color: #8dbf3d;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #8dbf3d;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  p {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #d9534f;
  }
  
  p.success {
    color: #28a745;
  }
  </style>
  