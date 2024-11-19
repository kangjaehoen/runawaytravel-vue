<template>
    <div class="accomCardContainer">
    <Test1 v-for="accom in 6" :accom-num="randaccom[accom]"></Test1>
    </div>
</template>
<script setup>
import Test1 from './test1.vue';
const randaccom = [8,9,10,11,12,14,27];
</script>
<style>
    .accomCardContainer{
        display: flex;
    }
</style>