<template>
    <table class="showtable" :style="{'display' : isshow }">
        <thead>
            <tr>
                <td colspan="3">예약 정보<button class="xbutton" @click="close">X</button></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>숙소명</td>
                <td colspan="2" >{{ oneres.accom.accName }}</td>
            </tr>
            <tr>
                <td rowspan="2">예약자 정보</td>
                <td>성함 </td><td>{{ oneres.user.name }}</td>
            </tr>
            <tr>
                <td>예약자 번호</td><td>{{ oneres.user.accountnum }}</td>
            </tr>
            <tr>
                <td rowspan="3">날짜 정보</td>
                <td>예약일</td>
                <td>{{ oneres.resDate }}</td>
            </tr>
            <tr>
                <td>체크인</td>
                <td>{{ oneres.chkin_Date }}</td>
            </tr>
            <tr>
                <td>체크아웃</td>
                <td>{{ oneres.chkout_Date }}</td>
            </tr>
            <tr>
                <td rowspan="2" >예약인원</td>
                <td>대인</td>
                <td>{{ oneres.adultCnt }} 명</td>
            </tr>
            <tr>
                <td>소인</td>
                <td>{{ oneres.kidCnt }} 명</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
 const p = defineProps({
    oneres : Object,
    isshow : String,
 });
    const emit = defineEmits(['close']);
    const close = () =>{
        emit('close');
    }
</script>
<style>
    .showtable {
        position: fixed; /* 화면에 고정 */
        top: 50%; /* 화면의 세로 중앙 */
        left: 50%; /* 화면의 가로 중앙 */
        transform: translate(-50%, -50%); /* 가운데 정렬 */
        background-color: white; /* 배경색 */
        z-index: 1000; /* 다른 요소보다 위에 표시 */
        border-collapse: collapse;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
        padding: 20px;
        border-radius: 10px; /* 모서리 둥글게 */
    }
    .showtable tbody td{
        min-width: 150px;
        min-height: 150px;
        text-wrap: nowrap;
        background-color: cornsilk;
        text-align: center;
    }
    .showtable thead{
        text-align: center;
        background-color: #B2D055;
        color: #45a049;
        font-size: 20px;
        font-weight: bold;
        text-wrap: nowrap;
    }
    .xbutton{
        float: right;
        background-color: transparent;
        border : 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
</style>