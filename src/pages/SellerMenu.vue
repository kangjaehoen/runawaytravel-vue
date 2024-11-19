<template>
    <div class="body">
      <nav class="sidebar">
        <RouterLink :to="{name : 'myacc'}">나의숙소</RouterLink>
        <RouterLink :to="{name : 'accreg'}">숙소등록</RouterLink>
        <RouterLink :to="{name : 'sellercalendar'}">예약달력</RouterLink>
      </nav>
      <section class="main">
        <RouterView :key="$route.fullPath"/>
      </section>
    </div>
  </template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<style>
</style>