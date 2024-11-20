<template>
  <label class="menu">판매자페이지
    <ul class="submenu">
      <li @click="myacc">나의 숙소</li>
      <li @click="accreg">숙소 등록</li>
      <li @click="sellercalendar">예약 달력</li>
    </ul>
  </label>
</template>
<script setup>
import router from '@/router';
const myacc = () =>{
  router.push({name : "myacc"});
}
const accreg = () =>{
  router.push({name : "accreg"});
}
const sellercalendar = () =>{
  router.push({name : "sellercalendar"});
}
</script>
<style>
</style>