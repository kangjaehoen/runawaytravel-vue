<template>
    <div :class ="date.getMonth()==thismonth ? 'calendar thismonth' : 'calendar lastnextmonth'">
        <p style="font-size: 23;">{{date.getDate()}}</p>
        <p class="eachres" v-for="elem in data" :style="{backgroundColor : elem[2]}" @click="sendthisres(elem[1])">{{ elem[1].accom.accName }}</p>
    </div>
</template>
<script setup>
    const p = defineProps({
        date : Date,
        thismonth : Number,
        data : Array,
    })
    const emit = defineEmits(['thisres'])
    const sendthisres = (e) => {
        emit('thisres',e);
    }
</script>
<style>
    .calendar{
        width: 150px;
        min-height: 150px;
    }
    .thismonth{
        background-color: cornsilk;
    }
    .lastnextmonth{
        color : gray;
        background-color: ivory;
    }
    .eachres{
        color : white;
        border-radius: 40px;
        text-align: center;
    }
</style>