<template>
    <div class="container">

    <!-- 예약 정보 및 규칙 섹션 -->
    <div class="reservation-and-rules">
    <form>
        <div class="reservation-info">
        <div class="reservation-details">
            <h3><strong>확인 및 결제</strong></h3>
            <p><strong>예약정보</strong></p>
            <p>날짜: {{ checkIn }} ~ {{ checkOut }}</p>
            <p>체크인 시간: {{ accom?.chkin_Time }} ~ {{ accom?.chkout_Time }}</p>
            <p>게스트: 성인 {{ adultCnt }}명<span v-if="kidCnt > 0">, 어린이 {{ kidCnt }}명</span></p>
        </div>
        <div class="price-details">
            <img src="/images/room.png" alt="서울의 호스텔" class="room-image" />
            <div class="price-texts">
            <p>{{ accom?.accName }}</p>
            <p>★ {{ revRate }} 후기({{ revCnt }}개)</p>
            <hr />
            <p>요금 세부정보</p>
            <p>{{ accom?.price }}원 × {{ totalDays }} 박</p>
            <p class="total-price">총 결제금액: {{ totalPayment }}원</p>
            </div>
        </div>
        </div>
    </form>
    <button @click="handleOrder">결제</button>
    <hr />
    <!-- 규칙 섹션 -->
    <div id="rules">
        <div class="refund-policy">
        <p><strong>환불정책</strong></p>
        <p>
            {{ checkIn }} 오후 {{ accom?.chkin_Time }} 전까지 무료로 취소하실 수 있습니다.<br />
            체크아웃 날짜인 {{ checkOut }} 전에 취소하면 부분 환불받으실 수 있습니다. 
        </p>
        </div>
        <div class="basic-rules">
        <p><strong>이용규칙</strong></p>
        <p>{{ accom?.accomRule }}</p>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route= useRoute();

// 예약 관련 데이터
//query로 전달
const checkIn = ref(route.query.checkIn || '');
const checkOut = ref(route.query.checkOut || '');
const adultCnt = ref(route.query.adultCnt);
const kidCnt = ref(route.query.kidCnt);
const totalDays = ref(route.query.totalDays);
const totalPayment = ref(route.query.totalPayment);
const revCnt= ref(0);
const revRate= ref('');
const accom= ref({});
const accomnum = ref(route.query.accomnum);
const reservation = ref([]);
const reservationInfo= ref({});

//query전달 외 accom정보들
const resAccom = async () => {
    try{
        const accomNum = route.query.accomnum || '';
        if(!accomNum){
            return;
        }
        const response= await axios.get(`http://localhost:8086/reservation/info`,{
            params: {accomNum},
        });
        if(response && response.data){
            revCnt.value= response.data.revCnt;
            revRate.value= response.data.revRate;
            accom.value= response.data.accom;
            reservation.value= response.data.reservation;
        }
    
    }catch(error){
        console.error("숙소 정보를 불러오던 중 에러발생", error.response || error);
    }

};


// 환불 정책 날짜 포맷팅
const formattedCheckInDate = ref(`${checkIn.value.substring(5, 7)}월 ${checkIn.value.substring(8)}일`);

let reservInfo= {};

// 결제 버튼 클릭 핸들러
const handleOrder = async () => {
   
    reservationInfo.value = {
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        adultCnt: adultCnt.value,
        kidCnt: kidCnt.value,
        totalDays: totalDays.value,
        totalPayment: totalPayment.value,
        accomNum: route.query.accomnum,
    };

    const reservInsert = await insertReservation(reservationInfo.value);

    if(reservInsert){
        processPayment();
    }

};


 // 예약 정보 삽입
const insertReservation = async (reservationInfo) => {
    try {
        const response= await axios.put(`http://localhost:8086/reservation/insertRes`, reservationInfo);
        
        if(response && response.data){
            reservationInfo.resNum=response.data.resNum;
            alert('예약이 성공적으로 완료되었습니다.');
            return true;
        }
    } catch (error) {
        alert('예약에 실패했습니다.');
        return false;
    }
};

// 결제 정보 삽입
const insertPayment = async (payInfo) => {
    try {
        await axios.put(`http://localhost:8086/api/payment`, payInfo);
        alert('결제가 성공적으로 완료되었습니다.');
        window.location.href = '/';
    } catch (error) {
        alert('결제 insert 실패');
    }
};

// 결제 처리 함수
const processPayment = () => {
if(!window.IMP){
    console.error("아임포트 SDK가 로드되지 않았습니다.");
    return;
}
window.IMP.init('imp16048664'); // 가맹점 식별코드
window.IMP.request_pay(
    {
    pg: 'html5_inicis',
    pay_method: 'card',
    merchant_uid: `merchant_${new Date().getTime()}`,
    name: accom.value.accName,
    amount: totalPayment.value,
    buyer_email: 'amy010901@naver.com',
    buyer_name: '수민짱',
    buyer_tel: '010-1234-5678',
    buyer_addr: '서울 송파구 중대로 135 it벤처타워',
    buyer_postcode: '123-456',
    },
    (res) => {
    if (res.success) {
        const payInfo = {
        accomNum: reservationInfo.value.accomNum,
        impUid: res.imp_uid,
        merchantUid: res.merchant_uid,
        amount: res.paid_amount,
        pay_Status: 'Y',
        name: accom.value.accName,
        resNum: reservationInfo.value.resNum,
        apply_num: res.apply_num,
        };

        if(res.apply_num){
            payInfo.apply_num= res.apply_num;
        }
        console.log("결제 정보 확인:", payInfo);
        insertPayment(payInfo);
    } else {
        alert(`결제에 실패하였습니다.\n실패사유: ${res.error_msg}`);
    }
    }
    );
};


onMounted(() => {
    resAccom();
});
</script>

<style scoped>
body {
    font-family: 'Pretendard-Regular', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
}

.container {
    width: 100%;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
}

button {
    background-color: #B2D055;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    display: inline-block;
    width: 50%;
    text-align: center;
    margin: 20px 0;
}

button:hover {
background-color: #92c653;
}

hr {
border: none;
border-top: 1px solid #ddd;
margin: 20px 0;
}

.reservation-and-rules {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }

        .reservation-info {
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
        }

        .reservation-details h3 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .reservation-details p {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .price-details {
            display: flex;
            align-items: center;
            text-align: right;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            background-color: white;
        }

        .room-image {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            margin-right: 20px;
        }

        .price-texts {
            display: flex;
            flex-direction: column;
        }

        .price-texts p {
            font-size: 18px;
            margin: 5px 0;
        }

        .total-price {
            font-weight: bold;
        }

        strong{
            font-weight: bold !important;
        }
</style>
