<template>
    <div v-if="accom" class="accomCard">
        <table>
            <tbody>
                <tr>
                    <td class="accimgbox">
                        <img :src="accomimg?`${accomimg.filePath}`:'/regformpic.png'" @click="goDetailPage(accom.accomNum)">
                        <div>
                            <button v-for="ao in 6" @click.stop="stretchedbutton(ao - 1)" :class="ao-1==buttonnumber?'y':''"></button>
                        </div>
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
import router from '@/router';

const param = defineProps({
    accom: Object,
});
const emit = defineEmits(
    ['stretchedbutton']
)
const buttonnumber = ref(0);
const accomimg = ref(null);

const loadimg = async () => {
    if (param.accom && param.accom.accomNum) {
        try {
            const response = await axios.get(`http://localhost:8086/api/getaccomimage?accomNum=${param.accom.accomNum}`);
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
            loadimg();
        }
    },
    { immediate: true , deep : true }
);
// watch(()=>buttonnumber.value,(newVal, oldVal)=>{
//     if(newVal !== oldVal){
//         console.log(oldVal+"->"+newVal);
//     }
// })

const stretchedbutton = (e) =>{
    buttonnumber.value = e;
    emit('stretchedbutton',e);
}
const goDetailPage = (accnum) =>{
    router.push(`/accDetail/${accnum}`)
}
</script>
<style scoped>
    .accomCard{
        display: inline-block;
    }
    .accomCard:hover{
        cursor: pointer;
        text-decoration-line: underline;
    }
    .accimgbox{
        position: relative;
    }
    .accimgbox div{
        position: absolute;
        bottom: 30px;
        right: 60px;
    }
    .accimgbox img{
        width: 1150px;
        height: 400px;
    }
    .accimgbox button{
        display: inline-block;
        border-radius: 25px;
        width: 10px;
        height: 10px;
    }
    .textshorten{
        width: 1200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
    }
    .y{
        background-color: darkcyan;
    }
</style>