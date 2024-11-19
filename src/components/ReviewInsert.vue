<template>

<div class="right-column">
            <p>숙박이 어떠셨나요?</p>
            <div class="ratings">
                <div class="rating">
                    <span>전체적 만족도</span>
                    <div class="stars" data-rating="satisfy" @click="satisfyStar">
                        <span class="star" data-value="1"></span>
                        <span class="star" data-value="2"></span>
                        <span class="star" data-value="3"></span>
                        <span class="star" data-value="4"></span>
                        <span class="star" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>정확도</span>
                    <div class="stars" data-rating="accuracy" @click="accuracyStar">
                        <span class="star" data-value="1"></span>
                        <span class="star" data-value="2"></span>
                        <span class="star" data-value="3"></span>
                        <span class="star" data-value="4"></span>
                        <span class="star" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>청결도</span>
                    <div class="stars" data-rating="clean" @click="cleanStar">
                        <span class="star" data-value="1"></span>
                        <span class="star" data-value="2"></span>
                        <span class="star" data-value="3"></span>
                        <span class="star" data-value="4"></span>
                        <span class="star" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>가격 대비 만족도</span>
                    <div class="stars" data-rating="scp" @click="scpStar">
                        <span class="star" data-value="1"></span>
                        <span class="star" data-value="2"></span>
                        <span class="star" data-value="3"></span>
                        <span class="star" data-value="4"></span>
                        <span class="star" data-value="5"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment-section">
        <h3>공개 후기 (필수항목)</h3>
        <textarea
        class="comment-box"
        v-model="reviewContent"
        placeholder="후기를 입력해주세요."
        @input="text"
        ></textarea>
        <button class="submit-btn" @click="openModal">후기 등록</button>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen " :style="{ display: isModalOpen ? 'flex' : 'none' }" class="modal-overlay">
        <div class="modal">
        <div class="image-placeholder">숙소 이미지</div>
        <h3>숙소 정보</h3>
        <p>리뷰를 정말 등록하시겠습니까?</p>
        <button @click="submitReview">YES</button>
        <button @click="closeModal">NO</button>
        </div>
    </div>
    
</template>

<script setup> 
    import axios from 'axios';

    import { ref } from 'vue';


    const reviewContent = ref("");

    const isModalOpen = ref(false);

    const text = () =>{
        console.log('검색어:', reviewContent.value);
    }
    

    const ratings = ref([
    { label: "전체적 만족도", value: 0 },
    { label: "정확도", value: 0 },
    { label: "청결도", value: 0 },
    { label: "가격 대비 만족도", value: 0 },
    ]);

    

    // 별점 업데이트 함수
    const updateRating = (index, value) => {
        ratings.value[index].value = value;
    }

    // 별점 선택 함수들
    const satisfyStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        updateRating(0, value);
        console.log("satisfy 클릭 : " +value);
        console.log(ratings.value);
    }

    const accuracyStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        updateRating(1, value);
        console.log("accuray 클릭 : " +value);
        console.log(ratings.value);
    }

    const cleanStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        updateRating(2, value);
        console.log("clean 클릭 : " +value);
        console.log(ratings.value);
    }

    const scpStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        updateRating(3, value);
        console.log("scp 클릭 : " +value);
    }

    // 모달 열기
    const openModal = () => {
        console.log("하이 모달");
        isModalOpen.value = true;
        console.log(reviewData);

    };

    // 모달 닫기
    const closeModal = () => {
        isModalOpen.value = false;
    };


    const reviewData = {
                accomNum : 75, // 숙소 번호 -> accomNum.value
                username: 'testID', // 사용자 ID -> username.value
                ratings: ratings.value, // 별점 정보
                reviewContent: reviewContent.valueOf(), // 리뷰 내용
    };

    const submitReview = async () => {
        const isValid = ratings.value.every(rating => rating.value > 0) && reviewContent.value;
            if (!isValid) {
                alert("모든 항목을 입력해주세요.");
                return;
            }

        try {
            const response = await axios.post("http://localhost:8086/review", {review : reviewData});
            if (response.status === 200) {
                alert("리뷰가 등록되었습니다.");
                closeModal();
            } else {
                alert("리뷰 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("리뷰 제출 중 오류 발생:", error);
            alert("서버와 연결이 원활하지 않습니다.");
        }
};



</script>

<style>

</style>