<template>
<div class="signbody">
    <label for="floatingInput">아이디</label>
    <input placeholder="아이디" type="text" @keyup.enter="login" v-model="state.form.username" id="floatingInput"><br>
    <label for="floatingPassword">비밀번호</label>
    <input placeholder="비밀번호" type="password" @keyup.enter="login" v-model="state.form.password" id="floatingPassword"><br>
    <p v-if="state.message != '' ">{{state.message}}</p>
    <button class="btn btn-primary" @click="login">로그인</button>
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

</style>