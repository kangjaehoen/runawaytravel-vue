<template>
    <table class="showtable">
        <thead>
            <tr>
                <td colspan="3">예약 정보</td>
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
    oneres : Object
 })
</script>
<style>
    .showtable {
        margin : 30px;
        border-collapse: collapse;
        display: inline-block;
    }
    .showtable tbody td{
        min-width: 150px;
        min-height: 150px;
        text-wrap: nowrap;
        background-color: cornsilk;
        text-align: center;
        cursor: pointer;
    }
    .showtable thead{
        text-align: center;
        background-color: #B2D055;
        color: #45a049;
        font-size: 20px;
        font-weight: bold;
        text-wrap: nowrap;
    }    
</style>