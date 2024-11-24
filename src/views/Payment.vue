<template>
    <div class="container">
        <HeaderFragment />
    
        <div class="search-options">
        <div id="search-options">
            <h2>검색옵션</h2>
            <label for="year">청구년도</label>
            <select id="year" v-model="selectedYear">
            <option value="">전체 년도</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
    
            <label for="month">청구 월</label>
            <select id="month" v-model="selectedMonth">
            <option value="">전체 월</option>
            <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
            </select>
        </div>
    
        <div id="payment-status">
            <label>결제상태</label>
            <input type="radio" id="paid" value="Y" v-model="selectedStatus" /> 
            <label for="paid">결제완료</label>
            <input type="radio" id="refunded" value="N" v-model="selectedStatus" />
            <label for="refunded">환불완료</label>
            <button @click="searchPayments">검색</button>
        </div>
        </div>
    
        <div class="payment-history">
        <h2>
            결제내역 확인
            <button @click="cancelSelectedPayments">결제취소</button>
        </h2>
    
        <table class="paytable">
            <thead>
            <tr>
                <th><input type="checkbox" @change="toggleSelectAll($event)" /></th>
                <th>결제일시</th>
                <th>결제번호</th>
                <th>결제상품</th>
                <th>결제 금액</th>
                <th>상태</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="paymentList.length === 0">
                <td colspan="6" style="text-align: center;">결제내역이 존재하지 않습니다.</td>
            </tr>
            <tr v-for="(payment, index) in paymentList" :key="index">
                <td><input type="checkbox" v-model="selectedPayments" :value="payment.impUid" /></td>
                <td>{{ payment.payDate }}</td>
                <td>{{ payment.impUid }}</td>
                <!-- <td><a href="#" @click.prevent="openModal(payment.impUid)"> -->
                    <td>{{ payment.name }}</td>
                <td>{{ payment.amount }}</td>
                <td>{{ payment.pay_Status === 'Y' ? '결제완료' : '환불완료' }}</td>
            </tr>
            </tbody>
        </table>
        </div>
    
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 0">이전</button>
            {{ currentPage + 1 }} / {{ totalPages }}
            <button @click="nextPage" :disabled="currentPage >= totalPages - 1">다음</button>
        </div>
        <!-- <ReservationModal :payment="selectedPaymentDetails" v-if="isModalOpen" @close="isModalOpen = false" /> -->
    </div>
    </template>
    
    <script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { jwtDecode } from "jwt-decode";
    import axios from 'axios';
    
    const selectedYear = ref('');
    const selectedMonth = ref('');
    const selectedStatus = ref('');
    const selectedPayments = ref([]);

    // const isModalOpen = ref(false);
    const selectedPaymentDetails = ref(null);
    
    //년도 월 
    const years = Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => 1970 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    
    const paymentList = ref([]);
    const currentPage = ref(0);
    const totalPages = ref(1);
    const pageSize = ref(10);
    const pagination = reactive({ pages: [] });
    
    //결제내역 조회 및 검색
    // const searchPayments = async () => {
    // try {
    //     const response = await axios.get('http://localhost:8086/api/payment', {
    //     params: {
    //         status: selectedStatus.value || null,
    //         year: selectedYear.value || null,
    //         month: selectedMonth.value || null,
    //         page: currentPage.value,
    //         size: pageSize.value,
    //         },
    //     });
    //         // paymentList.value = response.data;
    //         // updatePagination(response.data);
    //         if (response.data) {
    //             paymentList.value = response.data.content || [];
    //             totalPages.value = response.data.totalPages || 1;
    //             currentPage.value = response.data.currentPage || 0;
    //         } else {
    //             paymentList.value = [];
    //         }    
    // } catch (error) {
    //     console.error('Error:', error);
    // }
    // };
    
    const searchPayments = () => {
    const token = sessionStorage.getItem("token"); // 토큰 가져오기

    let username = ""; 

    if (token) {
        try {
            const decodedToken = jwtDecode(token); // jwtDecode를 통해 토큰 디코딩
            username = decodedToken.username || ""; // username 값을 추출
        } catch (error) {
            console.error("토큰 디코딩 중 에러 발생:", error);
        }
    } else {
        console.error("토큰이 없습니다. 로그인 상태를 확인하세요.");
        return;
    }

    axios
        .get('http://localhost:8086/api/payment', {
            params: {
                status: selectedStatus.value || null,
                year: selectedYear.value || null,
                month: selectedMonth.value || null,
                page: currentPage.value,
                size: pageSize.value,
                username
            },
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `${token}`, // 헤더에 토큰 추가
            },
        })
        .then((response) => {
            if (response && response.data) {
                paymentList.value = response.data.content || [];
                totalPages.value = response.data.totalPages || 1;
                currentPage.value = response.data.currentPage || 0;
            } else {
                paymentList.value = [];
            }
        })
        .catch((error) => {
            console.error("결제 정보를 불러오는 중 에러 발생:", error.response || error);
        });
};




    // 다음 페이지로 이동
    const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
        searchPayments();
    }
    };

    // 이전 페이지로 이동
    const previousPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        searchPayments();
    }
    };

    const cancelSelectedPayments = async () => {
        if (selectedPayments.value.length === 0) {
            alert('취소할 결제를 선택하세요.');
            return;
        }
    
        if (!confirm('결제를 취소하시겠습니까?')) {
            return;
        }
    
    
        try {
            await axios.post('http://localhost:8086/api/payment/cancel', selectedPayments.value);
            alert('결제가 취소되었습니다.');
            selectedPayments.value=[];
            searchPayments();
        } catch (error) {
            alert('결제 취소 중 오류가 발생했습니다.');
            console.error('Error:', error);
        }
    
    };
    
    const toggleSelectAll = (event) => {
        if (event.target.checked) {
            selectedPayments.value = paymentList.value.map((payment) => payment.impUid);
        } else {
            selectedPayments.value = [];
        }
    };
    
    onMounted(() => {
        searchPayments();
    });
    </script>
    
    <style scoped>
    body {
        font-family: 'Pretendard-Regular', Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    
    .container {
        width: 100%;
        margin: 50px auto;
        background-color: white;
        padding: 30px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
    
    header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
        }
    
        .logo img {
            width: 120px;
            height: 100px;
            border-radius: 50%;
        }
    
        .pagination {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 40px; /* 페이지네이션 아래 간격 추가 */
        }
    
        .search-options {
            /*display: flex;
            flex-direction: column; */
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }
    
        #search-options, #payment-status {
            margin-bottom: 20px; /* 각 섹션 간의 여백 추가 */
        }
    
        .search-options select,
        .search-options input[type="radio"] {
            padding: 10px;
            margin-right: 10px;
        }
    
        .search-options label {
            margin-right: 10px;
            font-weight: bold;
        }
    
        .search-options button {
            background-color: #92c653;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            align-self: flex-start; /* 버튼을 왼쪽 정렬 */
        }
    
        button{
            background-color: #92c653;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            margin-left: 10px;
        }
    
        .search-options button:hover {
            background-color: #76a53b;
        }
    
        .payment-history {
            padding: 0; /* 왼쪽과 오른쪽에 각각 20px의 패딩 추가 */
            margin: 0;
        }
    
    
        .payment-history h2 {
            margin-bottom: 20px;
            /*font-size: 20px;*/
        }
    
        .payment-history table {
            width: 70%;
            border-collapse: collapse;
        }
    
        .payment-history th,
        .payment-history td {
            border: 1px solid #ddd;
            padding: 10px 10px;
            text-align: center;
        }
    
        .payment-history th {
            background-color: #f4f4f4;
        }
    
        .payment-history td a {
            color: #337ab7;
            text-decoration: none;
        }
    
        .payment-history td a:hover {
            text-decoration: underline;
        }
    
        .pagination {
            text-align: center;
            margin-top: 20px;
        }
    
        .pagination a {
            margin: 0 5px;
            padding: 8px 16px;
            background-color: #f4f4f4;
            text-decoration: none;
            color: #333;
            border-radius: 5px;
        }
    
        .pagination a:hover {
            background-color: #ddd;
        }
    
        @font-face {
            font-family: 'Pretendard-Regular';
            src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
            font-weight: 400;
            font-style: normal;
        }
    
        .modal {
            display: none; 
            position: fixed;
            z-index: 1000; 
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); 
            overflow: auto;
    
        }
    
        .modal-content {
            position: relative;
            background-color: #fff;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 800px; /* 모달 너비 */
            height : auto;
            border-radius: 8px; /* 모서리 둥글게 */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* 모달에 그림자 추가 */
        }
    
        .close-button {
            position: absolute;
            top: 10px;
            right: 20px;
            color: #aaa;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
        }
    
        .profile-icon img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
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
    
    
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
    
        .refund-policy {
            padding-top: 20px;
            font-size: 18px;
            letter-spacing: 0.5px;
        }
    
        .refund-policy p {
            margin: 10px 0;
        }
    
        .basic-rules ul {
            list-style: none;
            padding: 0;
        }
    
        .basic-rules ul li {
            margin: 5px 0;
            font-size: 18px;
            letter-spacing: 0.5px;
        }
    
        @font-face {
            font-family: 'Pretendard-Regular';
            src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
            font-weight: 400;
            font-style: normal;
        }
    
        #reviewMove{
        margin-left : 650px;
        }

        .paytable {
            /* width: 70%;
            border-collapse: collapse; */
            text-wrap: nowrap; 
        }
    
    </style>