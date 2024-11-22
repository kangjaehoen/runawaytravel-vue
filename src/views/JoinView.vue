<template>
    <div class="join-container">
      <h2>회원가입</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">아이디</label>
          <input id="username" type="text" v-model="formData.username" required />
        </div>
        <div>
          <label for="name">이름</label>
          <input id="name" type="text" v-model="formData.name" required />
        </div>
        <div>
          <label for="email">이메일</label>
          <input id="email" type="email" v-model="formData.email" required />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input id="password" type="password" v-model="formData.password" required />
        </div>
        <div>
          <label for="gender">성별</label>
          <select v-model="formData.gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="birth">생년월일</label>
          <input id="birth" type="date" v-model="formData.birth" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <div v-if="message" class="response-message">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          name: '',
          email: '',
          password: '',
          gender: '',
          birth: '',
        },
        message: '',
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await fetch('http://localhost:8086/api/join', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData),
          });
  
          if (response.ok) {
            this.message = '회원가입 성공!';
            router.push({name: "Main"}); 
          } else {
            this.message = '회원가입 실패. 다시 시도해주세요.';
          }
        } catch (error) {
          this.message = '서버와의 연결이 실패했습니다.';
          console.error('회원가입 중 에러 ', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .join-container {
    width: 300px;
    margin: 0 auto;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  div {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .response-message {
    margin-top: 20px;
    font-weight: bold;
    color: green;
  }
  </style>
  