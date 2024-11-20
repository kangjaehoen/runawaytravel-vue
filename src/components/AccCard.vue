<template>
    <div v-if="accom" class="accomCard">
        <table>
            <tbody>
                <tr>
                    <td>
                        <img class="accimg" :src="accomimg?`/images/${accomimg.filePath}`:'/ocean.jpg'">
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>{{ accom.accName }}</p>
                        <p>{{ accom.address }}</p>
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

 const param = defineProps({
    accom : Object,
 });
const accomimg = ref(null);
const review = ref(null);
onMounted(async()=>{
    await axios
    .get(`http://localhost:8086/getaccomimage?accomNum=${param.accom.accomNum}`)
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