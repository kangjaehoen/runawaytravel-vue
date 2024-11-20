<template>
    <section class="main">
    <RouterView :key="$route.fullPath"/>
    </section>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<style>
</style>