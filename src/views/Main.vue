<template>
<div>
    <div class="search-bar-container">
    <form class="search-bar" @submit.prevent="search">
        <input
        type="text"
        v-model="searchTerm"
        placeholder="검색할 내용을 입력해주세요."
        required
        />
        <button type="submit">
        <img id="searchButton" src="../../images/searchbtn.png" />
        </button>
    </form>
    </div>

    <nav>
    <ul>
        <li v-for="type in accommodationTypes" :key="type.name">
        <a :href="`/nav?accType=${type.name}`">
            <img class="navImg" :src="type.image" />
        </a>
        <br />
        {{ type.label }}
        </li>
    </ul>
    </nav>

    <main>
    <section class="featured-image">
        <img class="slideImg" src="../../images/up.jpg" alt="특별한 여행" />
        <p>🌊 <strong>여행의 즐거움</strong> 🌊</p>
    </section>

    <section
        v-for="(category, index) in galleryCategories"
        :key="index"
        class="gallery"
    >
        <h2>{{ category.title }}</h2>
        <div class="gallery-grid">
        <div
            v-for="item in category.items"
            :key="item.accomNum"
            class="galler-gridList"
            @click="goToDetail(item.accomNum)"
        >
            <img :src="item.image" />
            <input
            type="hidden"
            class="accomNumName"
            :value="item.accomNum"
            />
            <p>
            <span>{{ item.accName }}</span>
            <span v-if="item.satisAvg !== 0">
                <span class="stars">★ {{ item.satisAvg }}</span>
            </span>
            </p>
            <p>{{ item.address }}</p><br />
            <p class="price">₩{{ item.price }} /박</p>
            <button
            class="wishlist-btn"
            @click.stop="toggleWishlist(item.accomNum, $event)"
            >
            <img
                :src="isInWishlist(item.accomNum) ? '../../images/FullLove.png' : '../../images/EmptyLove.png'"
                alt="위시리스트 하트"
            />
            </button>
        </div>
        </div>
    </section>
    </main>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// 검색 상태
const searchTerm = ref('');
// 위시리스트 상태
const wishlist = ref([]);

// 숙소 타입 정보
const accommodationTypes = reactive([
{ name: "호텔", label: "호텔", image: "../images/hotel.png" },
{ name: "게스트하우스", label: "게스트하우스", image: "../images/guestHouse.png" },
{ name: "펜션", label: "펜션", image: "../images/pension.png" },
{ name: "풀빌라", label: "풀빌라", image: "../images/poolVilla.png" },
{ name: "캠핑장", label: "캠핑장", image: "../images/camping.png" },
]);

// 갤러리 데이터
const galleryCategories = reactive([
{ title: "캠핑 가기 좋은 가을", items: [] },
{ title: "야경을 보고 싶으시다면?", items: [] },
{ title: "이번 오션뷰는 어디로?", items: [] },
]);

// 데이터 가져오기
const fetchData = async () => {
try {
    //const response= await axios.get(`http://localhost:8086/`);
    const { data: countryside } = await axios.get("/api/countryside");
    const { data: city } = await axios.get("/api/city");
    const { data: ocean } = await axios.get("/api/ocean");
    wishlist.value = await fetchWishlist();

    galleryCategories[0].items = countryside;
    galleryCategories[1].items = city;
    galleryCategories[2].items = ocean;
} catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
}
};


// 위시리스트 가져오기
const fetchWishlist = async () => {
try {
    const { data } = await axios.get("/api/wishlist");
    // console.log("데이터ㅓ터터터터",data);
    return data.map((item) => item.accomNum);
} catch (error) {
    console.error("위시리스트를 가져오는 중 오류 발생:", error);
    return [];
}
};

// 위시리스트에 추가/삭제
const toggleWishlist = async (accomNum, event) => {
event.preventDefault();
try {
    const isWished = isInWishlist(accomNum);
    if (isWished) {
    await axios.delete(`/api/wishlist/${accomNum}`);
    wishlist.value = wishlist.value.filter((num) => num !== accomNum);
    } else {
    await axios.post("/api/wishlist", { accomNum });
    wishlist.value.push(accomNum);
    }
} catch (error) {
    console.error("위시리스트 처리 중 오류 발생:", error);
}
};

// 위시리스트 여부 확인
const isInWishlist = (accomNum) => {
return wishlist.value.includes(accomNum);
};


// 검색 기능
const search = () => {
if (searchTerm.value) {
    window.location.href = `/search?search=${searchTerm.value}`;
}
};

// 상세 페이지로 이동
const router= useRouter();
const goToDetail = (accomNum) => {
    // window.location.href = `/accDetail?accomNum=${accomNum}`;
    if(!accomNum){
        console.error('accomNum 값이 유효하지 않습니다:', accomNum);
        return;
    }
    router.push({name: 'accDetail', params: {accomNum} });
};

onMounted(fetchData);

</script>

<style scoped>
.search-bar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;

    }

    nav ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        list-style-type: none;
    }

    nav li {
        margin-left: 50px;
        margin-right: 50px;
        text-align: center; /* 텍스트 중앙 정렬 */
    }

    .navImg {
        width: 32px;
        height: 32px;
        display: block; /* block으로 설정하여 중앙 정렬 가능 */
        margin: 0 auto; /* 자동 마진으로 가운데 정렬 */
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
    main {
        padding: 20px;
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
