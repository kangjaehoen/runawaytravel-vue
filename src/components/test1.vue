<template>
    <div v-if="accom" class="accomCard">
        <table>
            <tbody>
                <tr>
                    <td><img class="accimg" src="/ocean.jpg"></td>
                </tr>
                <tr>
                    <td>
                        <p>{{ accom.accName }}</p>
                        <P>{{ accom.address }}</P>
                        <p>￦ {{ accom.price }}</p>
                    </td>
                </tr>
            </tbody>
        </table>       
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

 const p = defineProps({
    accomNum : Number,
 });
const accom = ref(null);
const accomimg = ref(null);
const review = ref(null);
onMounted(async()=>{
    await axios
    .get(`http://localhost:8086/getaccominformation?accomNum=${p.accomNum}`)
    .then((response)=>{
        accom.value=response.data;
    })
    await axios
    .get(`http://localhost:8086/getaccomimage?accomNum=${p.accomNum}`)
    .then((response)=>{
        accomimg.value=response.data
    })
})

</script>
<style>
    .accomCard{
        display: inline-block;
    }
    .accimg{
        width: 200px;
        height: 200px;
    }
</style>