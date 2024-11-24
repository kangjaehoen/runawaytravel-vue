<template>
<div ref="modal" id="reviewModal" class="modal">
    <div class="modal-content">
            <div class="close-modal" @click="closeModal">&times;</div>
            <div v-if="reviewRateData">
                <div class="modal-header">
                <span class="rating">
                    <i class="fas fa-star"></i> {{reviewRateData.satisAvg}}
                </span>
                <span class="review-count">리뷰 {{reviewRateData.reviewCount}}개</span>
            </div>
            <hr class="review-hr">
            <div class="modal-body">
                    <div class="modal-half-left">
                        <div class="icon-item">
                            <i class="fas fa-bars"></i>
                            <div>전체 평점(만족도)<br><strong>{{reviewRateData.satisAvg}}</strong></div>
                        </div>

                        <div class="icon-item">
                            <i class="fas fa-stopwatch"></i>
                            <div>청결도<br><strong>{{reviewRateData.cleanAvg}}</strong></div>
                        </div>

                        <div class="icon-item">
                            <i class="fas fa-check-circle"></i>
                            <div>정확도<br><strong>{{reviewRateData.accuracyAvg}}</strong></div>
                        </div>

                        <div class="icon-item">
                            <i class="fas fa-tags"></i>
                            <div>가격 대비 만족도<br><strong>{{reviewRateData.scpAvg}}</strong></div>
                        </div>

                    </div>
                    <div class="modal-half-right" v-if="reviewModalData"> 
                        <div class="search-container"> 
                            <input 
                                v-model="search" 
                                @input="searchReviews" 
                                type="text" 
                                placeholder="후기 검색" 
                                class="search-input" 
                                name="search">
                        </div> <!-- 여기 추가된 닫는 div 태그 -->
                    
                        <div class="review-card" v-for="(item, index) in reviewModalData.list" :key="index">
                            <div class="user-info">{{item.user.username}}</div>
                                <div v-if="item.satisfy === 5">
                                    <span class="stars">★★★★★</span>
                                </div>
                                <div v-else-if="item.satisfy === 4">
                                    <span class="stars">★★★★</span>
                                </div>
                                <div v-else-if="item.satisfy === 3">
                                    <span class="stars">★★★</span>
                                </div>
                                <div v-else-if="item.satisfy === 2">
                                    <span class="stars">★★</span>
                                </div>
                                <div v-else="item.satisfy === 1">
                                    <span class="stars">★</span>
                                </div>
                                <span class="review-date">{{item.hiredate}}</span>
                                <div class="review-text">{{item.revContent}}</div>
                        </div>
                        <div class="pagination">
                                <button 
                                    :disabled="reviewModalData.currentPage === 0" 
                                    @click="goToPage(reviewModalData.currentPage - 1)">
                                    Prev
                                </button>
                                <button 
                                    v-for="page in pageRange" 
                                    :key="page" 
                                    :class="{ 'active-page': page - 1 === reviewModalData.currentPage }" 
                                    @click="goToPage(page - 1)">
                                    {{ page }}
                                </button>
                                
                                <button 
                                    :disabled="reviewModalData.currentPage === reviewModalData.totalPage - 1" 
                                    @click="goToPage(reviewModalData.currentPage + 1)">
                                    Next
                                </button>
                        </div>
                    </div>
                </div>    
            </div>
    </div>
</div>

</template>


<script setup>
import axios from 'axios';
import { ref, defineExpose ,defineProps, watch, onMounted , computed  } from 'vue';

let num = 75;

    const props = defineProps({
    reviewRateData: {
        type: Object,
        default: () => ({
        satisAvg: 0,
        reviewCount: 0,
        cleanAvg: 0,
        accuracyAvg: 0,
        scpAvg: 0,
        }),
    },
    accomNum: {
            type: String,
            required: true,
        },


});   



const reviewRateData = ref(props.reviewRateData);

// Props 값 변경 시 reviewRateData 업데이트
watch(
    () => props.reviewRateData,
    (newVal) => {
        reviewRateData.value = newVal;
    },
  { immediate: true } // 컴포넌트 초기화 시에도 실행
);


const modal = ref(null);

const openModal = () => {

    if (modal.value) {
        modal.value.style.display = 'flex';
    }
};

defineExpose({
    openModal,
});

const reviewModalData = ref({
        list: [],  // 빈 배열로 초기화
        totalPage: 0,
        pageSize: 0,
        currentPage: 0,
    });

 const pageRange = computed(() => {
    const totalPages = reviewModalData.value.totalPage;
    const currentPage = reviewModalData.value.currentPage;

    const maxVisiblePages = 5; // 최대 보여줄 페이지 버튼 수
    const startPage = Math.floor(currentPage / maxVisiblePages) * maxVisiblePages + 1; 
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // startPage부터 endPage까지의 배열 생성
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
});

const search = ref(''); 

const searchReviews = () => {


    reviewModalData.value.currentPage = 0;

    if(search.value != ''){
        axios.get(`http://localhost:8086/api/review/${props.accomNum}/${search.value}?page=${reviewModalData.value.currentPage}`)
            .then((response) => {
            reviewModalData.value = response.data;
        });
    } else {
        axios.get(`http://localhost:8086/api/review/${props.accomNum}?page=${reviewModalData.value.currentPage}`)
            .then((response) => {
            reviewModalData.value = response.data;
        });
    }          
    
};


onMounted(()=> {
        axios.get(`http://localhost:8086/api/review/${props.accomNum}`)
            .then((response)=>{
            reviewModalData.value= response.data;
    });
});



const goToPage = (page) => {
    
    if (page >= 0 && page < reviewModalData.value.totalPage) {
        reviewModalData.value.currentPage = page;

        if (search.value !== '') {
            axios.get(`http://localhost:8086/review/${props.accomNum}/${search.value}?page=${reviewModalData.value.currentPage}`)
                .then((response) => {
                    reviewModalData.value = response.data;
                });
        } else {
            axios.get(`http://localhost:8086/review/${props.accomNum}?page=${reviewModalData.value.currentPage}`)
                .then((response) => {
                    reviewModalData.value = response.data;
                });
        }
        
    }
};

const closeModal = () => {
    
    if (modal.value) {
        modal.value.style.display = 'none';
    }
};

</script>

<style>
</style>

