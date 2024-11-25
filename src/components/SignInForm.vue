<template>
<div class="box">
  <div class="signbody">
      <label for="floatingInput">아이디</label>
      <input placeholder="아이디" type="text" @keyup.enter="login" v-model="state.form.username" id="floatingInput"><br>
      <label for="floatingPassword">비밀번호</label>
      <input placeholder="비밀번호" type="password" @keyup.enter="login" v-model="state.form.password" id="floatingPassword"><br>
      <p v-if="state.message != '' ">{{state.message}}</p>
      <button class="btn btn-primary" @click="login">로그인</button>
  </div>
</div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';
import axios from 'axios';
import { isLoggedIn } from '@/stores/login';
const state = reactive({
        form: {
          username: "",
          password: "",
        },
        message: "",
      });

const login = () => {
    axios
    .post("http://localhost:8086/login", state.form, {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        },
        })
    .then((res) => {
        const token = res.headers.get('Authorization');
        if (token) {
        sessionStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        isLoggedIn.value = true;
        router.push("/");
        }
    })
    .catch((error) => {
    // 상태 코드 및 에러 메시지 출력
    console.error("Login error:", error.response?.data || error.message);
    state.message = "아이디와 비밀번호를 확인하세요.";
    });
};
const gomain = () =>{
    router.push("/");
}
onMounted(()=>{
    const already = sessionStorage.getItem("token");
    if(already){
        gomain();
    }
})
</script>
<style scoped>
.box{
  min-height: 700px;
}
.signbody {
  width: 100%;
  max-width: 350px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
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
  font-size: 14px;
  color: #d9534f;
  margin-top: -10px;
  margin-bottom: 15px;
}
</style>