<template>
    <!-- ReviewPage에 reviewRateData를 전달 -->
    <ReviewPage :reviewRateData="reviewRateData" />

    <div class="reviews-section" v-if="reviewRateData">
        <hr class="review-hr"> <!-- 여기를 위로 올림 -->
        <div class="reviews-header">
            <span class="rating">
                <i class="fas fa-star"></i> {{ reviewRateData.satisAvg }}
            </span>
            <span class="review-count">리뷰 {{ reviewRateData.reviewCount }}개</span>
        </div>

        <div class="icons">
            <div class="icon-item">
                <RatingChart :ratingsData="ratingsData" />
            </div>
            <div class="icon-item">
                <i class="fas fa-bars"></i>
                <div>전체 평점(만족도)<br><strong>{{ reviewRateData.satisAvg }}</strong></div>
            </div>
            <div class="icon-item">
                <i class="fas fa-stopwatch"></i>
                <div>청결도<br><strong>{{ reviewRateData.cleanAvg }}</strong></div>
            </div>
            <div class="icon-item">
                <i class="fas fa-check-circle"></i>
                <div>정확도<br><strong>{{ reviewRateData.accuracyAvg }}</strong></div>
            </div>
            <div class="icon-item">
                <i class="fas fa-tags"></i>
                <div>가격 대비 만족도<br><strong>{{ reviewRateData.scpAvg }}</strong></div>
            </div>
        </div>

        <hr class="review-hr">
        <ReviewSelect :accomNum="accomNum"></ReviewSelect>

        <div class="reviews-section">
            <!-- 기존 리뷰 섹션 -->
            <div class="load-more">
                <button @click="openModal" id="loadMoreBtn">리뷰 {{ reviewRateData.reviewCount }}개 더보기</button>
            </div>
        </div>
    </div>

    <!-- 모달을 감싸는 div를 따로 두어 모달을 배경으로 띄우는 방법 -->
   

    <reviewModal ref="modalRef" :reviewRateData="reviewRateData" :ratingsData="ratingsData" :accomNum="accomNum" />
</template>

<script setup>
import { ref, onMounted , defineProps } from 'vue';
import axios from 'axios';
import RatingChart from '@/components/RatingChart.vue';
import ReviewSelect from '@/components/ReviewSelect.vue';
import reviewModal from '@/components/ReviewModal.vue';

const modalRef = ref(null);  // modalRef 추가

const reviewRateData = ref('');
const ratingsData = ref('');

let num = 75; // 예시

const props = defineProps ({
    accomNum: {
            type: String,
            required: true,
        },
})

// 데이터 불러오기
onMounted(() => {
    axios.get("http://localhost:8086/review/rate/" + props.accomNum)
        .then((res) => {
            reviewRateData.value = res.data;
            ratingsData.value = {
                count5: res.data.count5,
                count4: res.data.count4,
                count3: res.data.count3,
                count2: res.data.count2,
                count1: res.data.count1,
            };
        })
});

// 모달 열기
const openModal = () => {
    if (modalRef.value) {
        modalRef.value.openModal();  // modalRef로 모달을 열도록 처리
    }
};
</script>


<style>
</style>


