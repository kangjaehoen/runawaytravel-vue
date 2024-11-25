<template>
    <h2>아이디 찾기</h2>
    <label><input type="text" v-model="state.form.name" name="name" placeholder="(필수)"></label><br>
    <label><input type="date" name="birth" v-model="state.form.birth" placeholder="YY/MM/DD"></label><br>
    <label><input type="email" name="email" v-model="state.form.email" placeholder="example@email.com"></label><br>
    <div v-if="state.message" class="response-message"></div> 
<button @click="usernameFind"></button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import {reactive, ref } from 'vue';
const state = reactive({
        form: {
            name: "",
            birth: "",
            email: ""
        }
    });
const usernameFind = () => {
    axios 
    .post("/usernameFind", state.form, {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        let username = res.data.username;
        state.message = "회원님의 아이디는 " + username + "입니다.";
        console.log("아이디찾기 성공띠"+ username+", "+ state.form.name + ", "+ state.form.date + ", " + email);
        
    })
}
</script>