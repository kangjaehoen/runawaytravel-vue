<template>
<div class="maincontainer">
    <div class="search-bar-container">
        <div class="search-bar">
            <input type="text" v-model="searchtext" placeholder="검색할 내용을 입력해주세요." required @keyup.enter="searchacc(searchtext)">
            <button type="button" @click="searchacc(searchtext)">
                <img id="searchButton" src="../../images/searchbtn.png" />
            </button>
        </div>
    </div>
    <br>
    <div class="stretchedContainer">
        <div class="box" style="text-align: center;">
        <AccCardStretched :accom="accoms[0]" @click="goDetailPage(accoms[0])"></AccCardStretched>
        </div>
    </div>
    <div class="accomCardContainer">
        <button @click="pagedown()" class="mainbutton">&lt</button>
        <div class="box">
            <AccCard v-if="accoms.length > 0" v-for="accom in accoms" :accom="accom" @click="goDetailPage(accom.accomNum)"></AccCard>
        </div>
        <button @click="pageup()" class="mainbutton">&gt</button>
    </div>
</div>
{{ page +1  }} / {{ totalpage }}
</template>
<script setup>
import AccCard from "@/components/AccCard.vue";
import AccCardStretched from "@/components/AccCardStretched.vue";
import router from "@/router";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
const accoms = reactive([]);
const searchtext = ref('');
const searched = ref('');
const page = ref(0);
const totalpage = ref(1);
const pageup = () =>{
    if(page.value < totalpage.value -1 ){
        page.value++;
    } else {
        page.value = 0;
    }
    searchacc2(searched.value);
}
const pagedown = () =>{
    if(page.value > 0){
        page.value--;
    } else {
        page.value = totalpage.value - 1;
    }
    searchacc2(searched.value);
}
const getrandomaccoms = async() =>{
    await axios
    .get(`http://localhost:8086/getrandom?page=${page.value}`)
    .then((response)=>{
        accoms.splice(0,accoms.length, ...response.data.getContent);
        totalpage.value=response.data.getTotalPages;
    })
}
const searchacc = (key) =>{
    page.value = 0;
    searched.value = key;
    searchacc2(key);
}

const searchacc2 = async(key) =>{
    axios
    .get(`http://localhost:8086/search?key=${key}&page=${page.value}`)
    .then((response)=>{
        accoms.splice(0,accoms.length, ...response.data.getContent);
        totalpage.value=response.data.getTotalPages;
    })
}
const goDetailPage = (accnum) =>{
    router.push(`/accDetail/${accnum}`)
}

onMounted(()=>{
    getrandomaccoms();
})
</script>
<style scoped>
    .accomCardContainer{
        display: flex;
        min-width: 1200px;
        height: 330px;
    }
    .search-bar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
    .maincontainer{
        min-height: 1000px;
    }
    .mainbutton{
        height: 100%;
        border: 0;
        background-color: transparent;
    }
    .mainbutton:hover{
        background-color: #B2D055;
        transition: 3s;
    }
    .box{
        width: 1250px;
    }

    /* 검색바 스타일 */
    .search-bar {
        display: flex;
        background-color: #ffffff;
        width : 400px;
        border: 1px solid #ccc;
        border-radius: 50px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .search-bar select, .search-bar input {
        border: none;
        padding: 10px;
        margin-right: 10px;
        border-radius: 30px;
        background-color: white;
        outline: none;
    }


    .search-bar input {
        width: 350px;
    }

    .search-bar button {
        background-color: #B2D055;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
    }

    .search-bar button:hover {
        background-color: #45a049;
    }

    .featured-image {
        text-align: center;
    }

    .featured-image img {
        width: 700px;
        height: 400px;


    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 카드가 최소 300px씩 공간을 차지하면서 나열되게 함 */
        gap: 20px; /* 카드들 간의 간격을 20px로 설정 */
        align-items: start; /* 카드들이 위쪽으로 정렬되게 만듦 */
    }

    .gallery-grid div {
        display: flex;
        flex-direction: column; /* 이미지를 위, 텍스트를 아래로 배치 */
        align-items: center;
        background-color: #fff; /* 카드 배경색 */
        border-radius: 15px; /* 둥근 모서리 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
        overflow: hidden; /* 내용이 박스 밖으로 넘치지 않도록 */
        transition: transform 0.3s ease; /* 카드에 마우스를 올렸을 때의 애니메이션 */
        position: relative;
    }

    .gallery-grid div:hover {
        transform: translateY(-10px); /* 마우스를 올리면 살짝 위로 이동 */
    }

    .gallery-grid img {
        width: 100%; /* 카드의 너비를 가득 채우도록 */
        height: 200px; /* 이미지 높이를 고정 */
        object-fit: cover; /* 이미지가 찌그러지지 않고 적절하게 자르기 */
        border-bottom: 1px solid white; /* 이미지 아래쪽에 구분선을 추가 */
    }

    .gallery-grid p {
        margin: 5px 0; /* 줄 간격을 줄이기 위해 마진을 줄임 */
        font-size: 14px;
        color: #333;
        text-align: left;
        width: 90%;
        line-height: 1.2; /* 줄 간격을 줄임 */
        display: flex; /* 평점과 가격을 정렬하기 위해 플렉스박스 사용 */
        justify-content: space-between; /* 좌우로 아이템들을 배치 */
    }

    .gallery-grid span.stars {
        color: #B2D055;
        font-size: 16px;
        margin-right: 10px; /* 평점을 좀 더 오른쪽으로 이동 */
    }

    .gallery-grid p span {
        margin-right: 10px; /* 이름과 평점 사이의 간격 조절 */
    }

    .wishlist-btn {
        position: absolute;
        bottom: 5px; /* 하단에서 10px 위로 */
        right: 10px; /* 오른쪽에서 10px 왼쪽으로 */
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;

    }

    .wishlist-btn img {
        width: 22px;
        height: 22px;
        transition: transform 0.3s ease;
        outline: none;
    }

    .wishlist-btn img:hover {
        transform: scale(1.1); /* 마우스를 올렸을 때 아이콘이 커지는 효과 */
    }

    .price {
        text-align: left;
        width: 90%; /* 가격 텍스트를 왼쪽에 붙임 */
        font-size: 16px;
        color: #000;
        margin-top: 5px;
    }

    #searchButton{
        width:20px;
        height:20px;
    }
    .stars {
        color: #B2D055;
        font-size: 18px;
    }

</style>
