<template>
<div>
    <div v-if="username">
      반갑습니다. {{ username }}님
    </div>
    <div class="search-bar-container">
        <div class="search-bar">
            
            <input type="text" v-model="searchtext" placeholder="검색할 내용을 입력해주세요." required @keyup.enter="searchacc(searchtext)">
            <button type="button" @click="searchacc(searchtext)">
                <img id="searchButton" src="../../images/searchbtn.png" />
            </button>
        </div>
    </div>
    <br>
    <div class="accomCardContainer">
    <AccCard v-if="randaccom.length > 0" v-for="accom in randaccom" :accom="accom" @click="goDetailPage(accom.accomNum)"></AccCard>
    </div>
</div>
</template>
<script setup>
import AccCard from "@/components/AccCard.vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { jwtDecode } from "jwt-decode";

const randaccom = reactive([]);
const searchtext = ref('');
// const getrandaccom = () =>{
//     axios
//     .get("http://localhost:8086/getrandom")
//     .then((response)=>{
//         randaccom.splice(0,randaccom.length, ...response.data.getContent);
//     })
// }

const searchacc = (e) =>{
    axios
    .get(`http://localhost:8086/search?key=${e}`)
    .then((response)=>{
        randaccom.splice(0,randaccom.length, ...response.data.getContent);
    })
}
const goDetailPage = (accnum) =>{
    router.push(`/accDetail/${accnum}`)

}

// onMounted(()=>{
//     getrandaccom(searchtext.value);
// })



const username = ref("");
const router = useRouter();

onMounted(() => {

  const token = sessionStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token); //토큰 디코딩
      username.value = decodedToken.username; //유저이름 꺼내기
    } catch (error) {
      console.error("Invalid token:", error); 
      router.push("/login");//에러나면 로그인페이지로
    }
  } else {
    console.log("No token found");
    router.push("/login"); // 토큰을 못찾을때도 로그인페이지로
  }
});
</script>

<style scoped>
    .accomCardContainer{
        display: flex;
        min-width: 1200px;
    }
    .search-bar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;

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

