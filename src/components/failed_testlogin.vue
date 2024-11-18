<template>
    아이디 : <input v-model="username">
    비밀번호 : <input v-model="password">
    <button @click="loginout">{{ status }}</button>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
    const username = ref("testID");
    const password = ref("미구현");
    const status = ref("로그인");
    const loginout = ()=> {
        if(status.value=="로그인"){
            login();
        } else {
            logout();
        }
    }
    const login= ()=>{
        axios
        .post('http://localhost:8086/testlogin',{
            "username" : username.value,
        }, { withCredentials: true })
        .then((response)=>{
            alert("아이디 전송됨"+username.value);
            status.value="로그아웃";
        })
    }
    const logout=()=>{
        axios
        .post('http://localhost:8086/testlogout',{}, { withCredentials: true })
        .then((response)=>{
            alert("로그아웃 됨")
            status.value="로그인";
        })
    }
</script>
<style>
</style>