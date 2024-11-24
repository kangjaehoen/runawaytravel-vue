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
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 상태 관리
  const formData = reactive({
    username: '',
    name: '',
    email: '',
    password: '',
    gender: '',
    birth: '',
  });
  
  const message = ref('');
  const router = useRouter();
  
  // 회원가입 처리 함수
  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:8086/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        message.value = '회원가입 성공!';
        router.push("/");
      } else {
        const errorData = await response.json(); // 서버에서 보낸 오류 메시지 확인
        message.value = errorData.message || '회원가입 실패. 다시 시도해주세요.';
      }
    } catch (error) {
      message.value = '서버와의 연결이 실패했습니다.';
      console.error('회원가입 중 에러 ', error);
    }
  };
  </script>