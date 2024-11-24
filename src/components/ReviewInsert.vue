<template>
<div class="right-column">
            <p class="ptext">숙박이 어떠셨나요?</p>
            <div class="ratings">
                <div class="rating">
                    <span>전체적 만족도</span>
                    <div class="stars" data-rating="satisfy" @click="satisfyStar">
                        <span class="star" :class="{'filled': satisfy >= 1}" data-value="1"></span>
                        <span class="star" :class="{'filled': satisfy >= 2}" data-value="2"></span>
                        <span class="star" :class="{'filled': satisfy >= 3}" data-value="3"></span>
                        <span class="star" :class="{'filled': satisfy >= 4}" data-value="4"></span>
                        <span class="star" :class="{'filled': satisfy >= 5}" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>정확도</span>
                    <div class="stars" data-rating="accuracy" @click="accuracyStar">
                        <span class="star" :class="{'filled': accuracy >= 1}" data-value="1"></span>
                        <span class="star" :class="{'filled': accuracy >= 2}" data-value="2"></span>
                        <span class="star" :class="{'filled': accuracy >= 3}" data-value="3"></span>
                        <span class="star" :class="{'filled': accuracy >= 4}" data-value="4"></span>
                        <span class="star" :class="{'filled': accuracy >= 5}" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>청결도</span>
                    <div class="stars" data-rating="clean" @click="cleanStar">
                        <span class="star" :class="{'filled': clean >= 1}" data-value="1"></span>
                        <span class="star" :class="{'filled': clean >= 2}" data-value="2"></span>
                        <span class="star" :class="{'filled': clean >= 3}" data-value="3"></span>
                        <span class="star" :class="{'filled': clean >= 4}" data-value="4"></span>
                        <span class="star" :class="{'filled': clean >= 5}" data-value="5"></span>
                    </div>
                </div>

                <div class="rating">
                    <span>가격 대비 만족도</span>
                    <div class="stars" data-rating="scp" @click="scpStar">
                        <span class="star" :class="{'filled': scp >= 1}" data-value="1"></span>
                        <span class="star" :class="{'filled': scp >= 2}" data-value="2"></span>
                        <span class="star" :class="{'filled': scp >= 3}" data-value="3"></span>
                        <span class="star" :class="{'filled': scp >= 4}" data-value="4"></span>
                        <span class="star" :class="{'filled': scp >= 5}" data-value="5"></span>
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
        <button class="submit-btn" @click="submitReview">후기 등록</button>
    </div>

    <!-- 모달 -->
<!--<div v-if="isModalOpen " :style="{ display: isModalOpen ? 'flex' : 'none' }" class="modal-overlay2">
        <div class="modal2">
        <div class="image-placeholder">숙소 이미지</div>
        <h3>숙소 정보</h3>
        <p  class="ptext">리뷰를 정말 등록하시겠습니까?</p>
        <button @click="submitReview">YES</button>
        <button @click="closeModal">NO</button>
        </div>
    </div> -->
    
</template>

<script setup>
    import axios from 'axios';
    import { reactive, ref , defineProps } from 'vue';

    const reviewContent = ref("");

    const satisfy = ref(0);  
    const accuracy = ref(0);  
    const clean = ref(0);  
    const scp = ref(0);  

    const props = defineProps({
        accomNum: {
            type: String,
            required: true,
        },
    })
    console.log("확인 url 값 : "+props.accomNum);

    const satisfyStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        satisfy.value = value;
        console.log(satisfy.value);
    }

    const accuracyStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        accuracy.value = value;
        console.log(accuracy.value);
    }

    const cleanStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        clean.value = value;
        console.log(clean.value);
    }

    const scpStar = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'), 10);
        scp.value = value;
        console.log(scp.value);
    }

    // 리뷰 등록
    const submitReview = async () => {
        const isValid = satisfy.value > 0 && accuracy.value > 0 && clean.value > 0 && scp.value > 0 && reviewContent.value;
        if (!isValid) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const reviewData = reactive({
            accomNum: props.accomNum, // 숙소 번호
            satisfy: satisfy.value,
            accuracy: accuracy.value,
            clean: clean.value,
            scp: scp.value,
            revContent: reviewContent.value, // 리뷰 내용
        });
        console.log("reviewData: ", reviewData);
        

        const token = localStorage.getItem("token");
        console.log('Token', token);
        if (!token) {
            alert("로그인이 필요합니다. 토큰이 없습니다.");
            console.log("No token found.");
            return;
        }

        try {
            // POST 요청
            const response = await axios.post(
                "http://localhost:8086/api/review",
                reviewData, // 리뷰 데이터
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
                    },
                }
            );
            if (response.status === 200) {
                alert("리뷰가 등록되었습니다.");
            } else {
                alert("리뷰 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("리뷰 등록 중 오류 발생:", error);
            alert("리뷰 등록 중 문제가 발생했습니다.");
        }
    };
</script>

<style>
</style>