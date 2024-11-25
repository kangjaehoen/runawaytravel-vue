<template>
 <div class="title">
        <h2>평가 및 후기</h2>
        <h3><strong>{{list.accName}}</strong>의 대한 리뷰를 남겨주세요.</h3>
    </div>

    <div class="review-guide">
        <p><strong>{{list.accName}}</strong> 후기의 대한 가이드라인 및 이용 약관</p>
        <p>여행 업고 튀어는 이에 대한 문제 해결을 위해 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’ 등을 근거로 권리침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 권리보호센터를 운영하고 있습니다. 보다 상세한 내용 및 절차는 권리보호센터 소개를 참고해 주세요.</p>
    </div>

    <div class="review-form">
        <div class="left-column">
            <div class="image-placeholder">
                <img :src="images.length==0?'/regformpic.png':images[imagenum].filePath">
            </div>
            <div class="property-name">{{list.accName}}</div>
        </div>
    </div>    
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed  } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { jwtDecode } from "jwt-decode";

const route = useRoute(); 
const accomNum = route.params.accomNum; 
console.log(accomNum);

const list = ref({});
const aVO = ref({});

const images = ref([]);
const imagenum = ref(0);

const accomInfo = async () => {
try {
    const response = await axios.get(`http://localhost:8086/api/accDetail/${accomNum}`);
    if (response && response.data) {
        aVO.value= response.data.accom;
        list.value = response.data.accom;
        images.value = response.data.images;

        console.log(list.value.accName);


        // JSON 문자열을 객체로 변환
        if (typeof list.value === 'string') {
            list.value = JSON.parse(list.value);
            console.log(list.value); 
            
        }
    }
} catch (error) {
    console.log('숙소정보를 불러오던 중 에러발생', error);
}
};

onMounted(() => {
    accomInfo();
    console.log("accomInfo 함수 호출 완료");
});
</script>

<style scoped>
img{
    width: 100%;
    height: 100%;
}

</style>