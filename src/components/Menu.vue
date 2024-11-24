<template>
    <MenuLogin></MenuLogin>
    <MenuSeller v-if="isLoggedIn"></MenuSeller>
</template>
<script setup>
import MenuLogin from './MenuLogin.vue';
import MenuSeller from './MenuSeller.vue';
import { isLoggedIn } from '@/stores/login';
</script>
<style>
  .menu{
    min-width: 150px;
    text-align: center;
  }
  .submenu{
    display: none;
    padding-left:0;
    margin-left:0;
  }
  .menu:hover .submenu{
    display: block;
  }
  .submenu li{
    list-style-type: none;
    font-size: 13px;
  }
  .submenu li:hover{
    background-color: #8dbf3d;
  }
</style>