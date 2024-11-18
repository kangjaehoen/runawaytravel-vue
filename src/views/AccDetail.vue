<template>
<div>
    <div class="container mt-5">
    <!--전체 감싸기-->
    <div class="row">
        <div class="main-content">
            <h2 class="main-title">{{ list.accName }}</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
        <img :src="list.imageUrl ||  '/images/숙소1.png'" alt="숙소이미지" class="img-fluid" />
        </div>
    </div>

    <!-- 숙소 상세정보와 사이드바 함께 묶기 -->
    <div class="row">
        <div class="col-md-8">
        <div class="info-and-sidebar">
            <!-- 편의시설 및 리뷰 섹션 -->
            <div class="convenience-and-reviews">
            <h1 class="sub-title">{{ list.accName }}</h1>
            <p>
                최대 인원 {{ list.maxocc }}명 · 침실 {{ list.room }}개 · 침대
                {{ list.bed }}개 · 욕실 {{ list.bathroom }}개
            </p>
            <p>★ {{ revRate }} 후기 {{ revCnt }}개</p>
            <hr />
            <!--편의시설 안내-->
            <div id="convenience">
                <div id="conven1">
                <ConvenienceItem
                    image="../../images/Convenience/한적한시골.png"
                    label="한적한 시골"
                />
                <ConvenienceItem
                    image="../../images/Convenience/tv.png"
                    label="TV"
                />
                <ConvenienceItem
                    image="../../images/Convenience/wifi.png"
                    label="와이파이"
                />
                </div>
                <div id="conven2">
                <ConvenienceItem
                    image="../../images/Convenience/주차가능.png"
                    label="주차가능"
                />
                <ConvenienceItem
                    image="../../images/Convenience/셀프체크인.png"
                    label="셀프 체크인"
                />
                <ConvenienceItem
                    image="../../images/Convenience/중앙냉방시설.png"
                    label="중앙 냉방시설"
                />
                </div>
            </div>
            <hr />
            <div class="additional-info">
                <h4>호스트: {{ list.username?.name }}</h4><br> <!--옵셔널 체이닝-->
                <p>숙소설명: {{ list.informtext }}</p><br>
                <p>이용규칙: {{ list.accomRule }}</p>
            </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar" id="sidebar">
            <form @submit.prevent="validateForm">

                <div class="form-group">
                <label for="checkIn" class="form-label">체크인</label><br />
                <!-- <input
                    type="date"
                    class="form-control form-control-lg"
                    v-model="checkIn"
                    required
                /> -->
                <DatePicker 
                    v-model="checkIn"
                    :disabled-date="isDisabledDate"
                    :input-attr="{ placeholder: '연도-월-일' }"
                />    

                </div>
                <div class="form-group">
                <label for="checkOut" class="form-label">체크아웃</label><br />
                <!-- <input
                    type="date"
                    class="form-control form-control-lg"
                    v-model="checkOut"
                    required
                /> -->
                <DatePicker
                    v-model="checkOut"
                    :disabled-date="isDisabledDate"
                    :input-attr="{ placeholder: '연도-월-일' }"
                />
                </div>
                <div class="form-group">
                <label class="form-label" @click="toggleGuestCounter"> <!-- 폰트크기때문에 form-control 에서 from-label로 변경  -->
                    게스트
                </label>
                <div 
                    class="guest-counter"
                    id="guestCounterContainer"
                >
                <div>
                    <GuestCounter
                    label="성인"
                    v-model="adultCnt"
                    />
                </div>
                <div class="guest-counter-item">    
                    <GuestCounter
                    label="어린이"
                    v-model="kidCnt"
                    />
                </div>        

                </div>
                </div>
                <!--숙박일수랑 총금액-->
                <input type="hidden" v-model="totalDays" />
                <input type="hidden" v-model="totalPayment" />


                <button
                    @click="reservInfo"
                    type="submit"
                    class="btn btn-primary btn-block btn-lg full-width"
                    style="background-color: #b2d055; border: none; color: white; height: 40px;"
                >
                예약하기
                </button>

            </form>

            <div class="total-price mt-3">
                <p>
                {{ list.price }} x <span id="totalNights">{{ totalDays }}</span>
                </p>
                <p>총 합계: {{ totalPayment }} 원</p><br>

                <p>
                    * 어린이는 2세 ~ 12세까지를 기준으로 하며<br> 13세 이상은 성인요금이 부여됩니다.
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>

    <ReviewsSection :replyRate="replyRate" :reviewList="reviewList" />
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import ConvenienceItem from '@/components/ConvenienceItem.vue';
import GuestCounter from '@/components/GuestCounter.vue';
import axios from 'axios';

// 숙소 정보 로드 함수
const accomInfo = async () => {
try {
    const response = await axios.get(`http://localhost:8086/accDetail/${accomNum}`);
    if (response && response.data) {
        aVO.value= response.data.accom;
        list.value = response.data.accom;
        revCnt.value = response.data.revCnt;
        revRate.value = response.data.revRate;  
        reservation.value= response.data.reservation;

        // JSON 문자열을 객체로 변환
        if (typeof list.value === 'string') {
            list.value = JSON.parse(list.value); 
        }
    }
} catch (error) {
    console.log('숙소정보를 불러오던 중 에러발생', error);
}
};

const isDisabledDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];

    // reservation 배열에서 체크인-체크아웃 날짜 범위를 확인
    return reservation.value.some((res) => {
    const checkInDate = new Date(res.chkin_Date);
    const checkOutDate = new Date(res.chkout_Date);

    // 체크인 날짜 <= 선택 날짜 < 체크아웃 날짜
    return formattedDate >= checkInDate.toISOString().split('T')[0] &&
            formattedDate < checkOutDate.toISOString().split('T')[0]; // 체크아웃 날짜는 선택 가능
    });
};


//props로 예약정보  넘기기
const router= useRouter();
const reservInfo = () =>{
    if(!validateForm){
        return;
    }

    router.push({
        name: "reservation",
        query: {
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            adultCnt: adultCnt.value,
            kidCnt: kidCnt.value, 
            totalDays: totalDays.value,
            totalPayment: totalPayment.value,
            accomnum: aVO.value.accomNum,
        },
    });
};

// Props, 데이터 바인딩
const list = ref({});
const aVO = ref({});
const replyRate = ref({});
const reviewList = ref([]);
const revCnt = ref(0);
const revRate = ref(null);

const checkIn = ref('');
const checkOut = ref('');
const reservation = ref([]);
const adultCnt = ref(1);
const kidCnt = ref(0);
const totalDays = ref(0);
const totalPayment = ref(0);
const guestCounterVisible = ref(true);

//url 파라미터 가져오기
const route = useRoute();
const accomNum = route.params.accomNum;


const validateForm = () => {
if (!checkIn.value || !checkOut.value) {
    alert('체크인과 체크아웃 날짜를 선택해주세요.');
    return false;
}

const date1 = new Date(checkIn.value);
const date2 = new Date(checkOut.value);

if (date2.getTime() <= date1.getTime()) {
    alert('체크아웃 날짜는 체크인 날짜 이후여야 합니다.');
    return false;
}

if (adultCnt.value === 0 && kidCnt.value === 0) {
    alert('성인 또는 어린이 인원을 최소 1명 이상 선택해주세요.');
    return false;
}

calculateDays();
    return true;
};

const calculateDays = () => {
if (checkIn.value && checkOut.value) {
    const date1 = new Date(checkIn.value);
    const date2 = new Date(checkOut.value);
    const timeDifference = date2.getTime() - date1.getTime();
    const daysDifference = Math.abs(timeDifference / (1000 * 60 * 60 * 24));
    // totalDays.value = daysDifference;

    // if (daysDifference <= 0) {
    // alert('체크아웃 날짜를 확인해주세요.');
    // return;
    // }
    // updatePrice(daysDifference);

    if(daysDifference > 0){
        totalDays.value= daysDifference;
        updatePrice(totalDays.value);
    }else{
        totalDays.value=0;
        totalPayment.value=0;
    }
}
};

//checkOut 변경시 자동 날짜계산
watch([checkIn, checkOut], calculateDays);


const updatePrice = (days) => {
const pricePerNight = parseFloat(aVO.value.price) || 0;
const priceOneAdult = parseFloat(aVO.value.adultPrice) || 0;
const priceOneKid = parseFloat(aVO.value.kidPrice) || 0;
const maxOccupancy = parseInt(aVO.value.maxocc) || 0;

const totalGuests = adultCnt.value + kidCnt.value;
let totalPrice = 0;

if (totalGuests <= maxOccupancy) {
    totalPrice = pricePerNight * days;
} else {
    const excessCount = totalGuests - maxOccupancy;
    const excessAdults = Math.max(0, adultCnt.value - maxOccupancy);
    const excessKids = Math.max(0, excessCount - excessAdults);

    totalPrice = pricePerNight * days;

    if (excessAdults > 0) {
    totalPrice += excessAdults * priceOneAdult * days;
    }
    if (excessKids > 0) {
    totalPrice += excessKids * priceOneKid * days;
    }
}

totalPayment.value = totalPrice;

};

onMounted(() => {
    accomInfo();
});

</script>

<style scoped>
body {
    width: 100%;
}
.guest-counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.guest-counter-item {
    /* margin-left: 15px;  
    margin-right: 15px; */
    margin-bottom: 15px;
}

.guest-adjustment {
    display: flex;
    align-items: center;
}
.guest-adjustment button {
    width: 30px;
    height: 30px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
}
.guest-adjustment input {
    width: 40px;
    text-align: center;
    border: none;
    background-color: #fff;
    margin: 0 10px;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
}
.gallery img {
    width: 100%;
    height: auto;
}
.info-and-sidebar {
    display: flex;
    gap: 20px; /* 편의시설과 사이드바 사이 간격 */
}
.convenience-and-reviews {
    flex: 2; /* 편의시설과 리뷰가 더 넓은 공간을 차지하도록 설정 */
}
.sidebar {
    flex: 1; /* 사이드바의 크기 비율 설정 */
    position: sticky;
    top: 80px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.container {
    width: 100%;
    max-width: 1140px;
    padding: 0 15px;
}
.main-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.main-title {
    flex-grow: 1;
}
.like-button {
    flex-shrink: 0;
}
#convenience {
    display: flex; /* 가로 배치 */
    justify-content: space-between; /* 항목 간의 간격 */
    gap: 5px; /* 항목 간의 간격을 좁게 조정 */
}

#conven1,
#conven2 {
    display: flex;
    flex-direction: column; /* 세로 배치 */
    gap: 10px; /* 항목 간격을 좁게 조정 */
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    font-size: 1.2rem; /* 레이블 폰트 크기 확대 */
    font-weight: bold;
    margin-bottom: 10px;
}

.form-control-lg {
    height: calc(2.5rem + 2px);
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    width: 100%;
}

.btn-lg {
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* .vue-datepicker-next {
    z-index: 1050; /* 모달이나 다른 요소보다 위로 오도록 설정 
} */

</style>
