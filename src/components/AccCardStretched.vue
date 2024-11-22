<template>
    <div v-if="accom" class="accomCard">
        <table>
            <tbody>
                <tr>
                    <td>
                        <img class="accimg" :src="accomimg?`${accomimg.filePath}`:'/ocean.jpg'">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h1 class="textshorten">{{ accom.accName }}</h1>
                        <p class="textshorten">{{ accom.address }} ￦ {{ accom.price }}</p>  
                    </td>
                </tr>
            </tbody>
        </table>       
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';

const param = defineProps({
    accom: Object,
});

const accomimg = ref(null);

const loadimg = async () => {
    if (param.accom && param.accom.accomNum) {
        try {
            const response = await axios.get(`http://localhost:8086/getaccomimage?accomNum=${param.accom.accomNum}`);
            accomimg.value = response.data;
        } catch {
            accomimg.value = null;
        }
    }
};

watch(
    () => param.accom?.accomNum,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            console.log("accomNum 변경됨");
            loadimg();
        }
    },
    { immediate: true , deep : true }
);
</script>
<style scoped>
    .accomCard{
        display: inline-block;
    }
    .accomCard:hover{
        background-color: bisque;
    }
    .accimg{
        width: 1150px;
        height: 400px;
    }
    .textshorten{
        width: 1200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
    }
</style>