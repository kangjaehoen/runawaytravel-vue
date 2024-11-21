<template>
    <div class="body">
      <nav class="sidebar">
        <RouterLink to="/myacc">나의숙소리스트</RouterLink>
        <RouterLink to="/accreg">숙소등록</RouterLink>
      </nav>
      <section class="main">
        <RouterView/>
      </section>
    </div>
  </template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<style>
</style>