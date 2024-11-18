<template>
    <tr>
        <td>{{ accName }}</td>
        <td>{{ address }} {{ detailAddress }}</td>
        <td>{{ price }} <br> {{ occ }} 명</td>
        <td> 성인 : {{ adultPrice }}  소인 : {{ kidPrice }} <br> 최대 {{ maxocc }} 명</td>
        <td> {{ category }}</td>
        <td> {{ accType }}</td>
    </tr>
</template>
<script>
    import { defineProps } from 'vue';
    const p = defineProps({
    accomNum : Number,
    accName : String,
    address : String,
    detailAddress : String,
    occ : Number,
    maxocc : Number,
    price : Number,
    kidPrice : Number,
    adultPrice : Number,
    accType : String,
    category : String,
    onSale : Number,
});
</script>