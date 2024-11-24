<template>
    <section class="main">
    <RouterView :key="$route.fullPath"/>
    </section>
</template>
<script setup>
import { RouterView } from 'vue-router';
import router from '@/router';
import { onMounted } from 'vue';
const gomain = () =>{
    router.push("/");
}
onMounted(()=>{
    const already = sessionStorage.getItem("token");
    if(!already){
        gomain();
    }
})
</script>
<style>
    .main{
        width: 1200px;
        margin : 0;
        padding: 0;
        display: flex;
        align-self: center;
    }
    .sellerContainer{
        width: 100%;
        height: 1000px;
        align-self: center;
    }
    .sellerController{
        align-self: center;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .greenbutton,
    .sellerController button {
        background-color: #B2D055; /* 버튼 배경색 */
        color: white; /* 버튼 텍스트 색상 */
        border: none; /* 기본 테두리 제거 */
        border-radius: 5px; /* 버튼 모서리 둥글게 */
        padding: 8px 15px; /* 버튼 내부 여백 */
        font-size: 16px; /* 버튼 텍스트 크기 */
        cursor: pointer; /* 마우스 커서 변경 */
        transition: background-color 0.3s ease; /* 배경색 변화 애니메이션 */
    }
    .greenbutton:hover,
    .sellerController button:hover {
        background-color: #45a049;
    }
</style>