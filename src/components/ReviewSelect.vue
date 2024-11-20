<template>
    <div class="review-cards">
        <div class="review-card1"  v-for="(item, index) in reviewData.list" :key="index">
            <div class="review-details">
                <div class="user-id">{{item.user.username}}</div>
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
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, defineProps } from  'vue';
    import axios from 'axios';
    import ReviewModal from './ReviewModal.vue';
    
    const props = defineProps ({
    accomNum: {
            type: String,
            required: true,
        },
})

    const reviewData = ref({
        list: [],  // 빈 배열로 초기화
        totalPage: 0,
        pageSize: 0,
        currentPage: 0,
    });


    let num =75; // 예시    
    let page=0; // 예시

    onMounted(()=>{ //onMounted는 컴포넌트가 초기 렌더링될 때 한 번만 실행
        axios.get("http://localhost:8086/review/"+props.accomNum+"?page="+page+"&&size="+6)
            .then((res) =>{
                reviewData.value = res.data;
    })
    console.log(reviewData.value);
})
</script>

<style>
</style>