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
                    <td class="td-class">
                        <p class="p-accName">{{ accom.accName }}</p> 
                        <img @click='clickHeart(accom.accomNum)' :src="heartImage" class="heartImg">
                        <p>{{ accom.address }}</p>
                        <p>￦ {{ accom.price }}</p>
                        <WishListClickInsert ref="wishListInsert" :accom="accom.accomNum"></WishListClickInsert> 
                        <WishListClickDelete ref="wishListDelete" :accom="accom.accomNum"></WishListClickDelete>
                        
                    </td>
                </tr>
            </tbody>
        </table>      
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref , watch , onMounted } from 'vue';
import WishListClickInsert from '@/components/WishListClickInsert.vue'
import WishListClickDelete from '@/components/WishListClickDelete.vue'

const param = defineProps({
    accom : Object,
});



const accomimg = ref(null);
const heartImage = ref('/images/EmptyLove.png');
const wishListInsert = ref();
const wishListDelete = ref();

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


  const heart = async () => { 
    axios.get("http://localhost:8086/wish") // 유저 값 나중에 추가해줘야함.
        .then((response)=>{
            const isWishlisted = response.data.some((item) => 
                item.accomNum.accomNum === param.accom.accomNum
            );


            if (isWishlisted) {
                heartImage.value = "/images/FullLove.png";
            } else {
                heartImage.value = "/images/EmptyLove.png";
            }
        })
        .catch((error) => {
            console.error("Error fetching wishlist:", error);
        });
    } 



watch(
    () => param.accom?.accomNum,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            loadimg();
            heart();
        }
    },

    { immediate: true , deep : true }
);

const clickHeart = (accomNum) =>{
    event.stopPropagation();
    if(heartImage.value === "/images/EmptyLove.png"){
        if(wishListInsert.value){
            wishListInsert.value.clickHeart(accomNum); // 메서드 이름은 예시입니다.
        }
        heartImage.value = "/images/FullLove.png";
    }else{
        if(wishListDelete.value){
            wishListDelete.value.clickHeart(accomNum);
        }
        heartImage.value = "/images/EmptyLove.png";
    }
}
</script>

<style>
    .accomCard{
        display: inline-block;
    }
    .accimg{
        width: 200px;
        height: 200px;
    }
    .p-accName{
    display: inline-block;
    }

    .td-class {
        position: relative; /* td를 기준으로 절대 위치 설정 */
        padding-right: 30px; /* 오른쪽 여백을 줘서 heartImg와 겹치지 않도록 설정 */
    }

    .heartImg {
        position: absolute;
        right: 10px; /* 오른쪽으로 10px 떨어지게 */
        top: 15%; 
        transform: translateY(-50%); /* 정확히 중앙 정렬 */
        width: 20px;
        height: 20px;
        display: inline-block;
    }
</style>