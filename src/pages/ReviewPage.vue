<template>
<div>
    <ReviewRate></ReviewRate>
    <RatingChart></RatingChart>
</div>
</template>


<script setup>
    import { defineProps } from 'vue';
    import ReviewRate from '@/components/ReviewRate.vue'; 

    const props = defineProps({
        reviewRateData: {
            type: Object,
            required: true,
        },
        reviewData : {
            type : Object,
            required: true,
        },
    });
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
<style>
  /* 리뷰 섹션 스타일 */
  .reviews-section {
        padding: 20px;
        font-family: Arial, sans-serif;
        border : none !important;
    }

    /* 헤더 스타일 */
    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .reviews-header .rating {
        font-size: 24px;
        font-weight: bold;
        color: #B2D055;
    }

    .reviews-header .review-count {
        font-size: 16px;
        color: #666;
    }
    #ratingChart {
        width: 300px; /* 차트를 더 작게 만듦 */
        height: 300px;
        margin-right: 10px; /* 차트와 평점 사이에 여백 추가 */
    }

    /* 아이콘 섹션 스타일 */
    .icons {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 20px 0;
    }

    .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #333;
        text-align: center;
    }

    .icon-item i {
        font-size: 24px;
        margin-bottom: 8px;
        color: #B2D055;
    }

    .icon-item div {
        font-size: 12px;
        line-height: 1.5;
    }

    .icon-item strong {
        font-size: 14px;
        color: #000;
        display: block;
        margin-top: 5px;
    }

    /* 구분선 */
    .review-hr {
        border: none;
        border-top: 2px solid #B2D055;
        margin-bottom: 20px;
    }

    /* 리뷰 카드 스타일 */
    .review-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 20px;

    }

    .review-card {
        border: 1px solid #ffffff;
        border-radius: 10px;
        padding: 15px;
        background-color: #ffffff;
    }

    #reviewModal .review-card{
        width: 300px;
        height: 145px;

    }

    #reviewModal .icon-item{
        margin-top: 25px;
        width: 350px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #B2D055;

    }




    .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .user-id{

    }

    .review-details {
        margin-top: 10px;
    }

    .stars {
        color: #B2D055;
        font-size: 18px;
    }

    .review-date {
        display: block;
        font-size: 12px;
        color: #888;
        margin-top: 5px;
    }

    .review-text {
        margin-top: 10px;
        font-size: 14px;
    }

    /* 더보기 버튼 스타일 */
    .load-more {
        text-align: center;
        margin-top: 20px;
    }

    .load-more button {
        padding: 10px 20px;
        border: none;
        background-color: #B2D055;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }

    .load-more button:hover {
        background-color: #7e9537;
    }

            .modal {
                display: none; /* 처음에는 숨겨놓음 */
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                width: 90%; /* 너비를 90%로 변경 */
                max-width: 800px; /* 최대 너비를 800px로 변경 */
                max-height: 90%; /* 최대 높이를 80%로 설정 (옵션) */
               /* overflow-y: auto; /* 내용이 길어질 경우 스크롤 가능하게 설정 (옵션) */
            }

            .close-modal {
                text-align: right;
                font-size: 18px;
                cursor: pointer;
            }

            /* 리뷰 섹션 스타일 */
            .reviews-section {
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: Arial, sans-serif;
            }

            /* 모달 내부 스타일 */
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-header .rating {
                font-size: 24px;
                font-weight: bold;
                color: #B2D055;
            }

            .modal-header .review-count {
                font-size: 16px;
                color: #666;
            }

            .modal-body {
                margin-top: 20px;
            }

            .modal-half-right{
                width: 350px;
                height: auto;
                float: right;
            }

            .modal-half-left{
                width: 350px;
                height: auto;
                float: left;
                align-items: flex-start;
            }

            .review-card {
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 15px;
                background-color: #ffffff;
                margin-bottom: 20px;
            }

            .review-details {
                margin-top: 10px;
            }

            .stars {
                color: #B2D055;
                font-size: 18px;
            }

            .review-date {
                display: block;
                font-size: 12px;
                color: #888;
                margin-top: 5px;
            }

            .review-text {
                margin-top: 10px;
                font-size: 14px;
            }

            .pagination {
                display: flex;
                justify-content: center; /* 가운데 정렬 */
                margin-top: 20px;
            }

            .page-button {
                padding: 10px 15px;
                margin: 0 5px;
                border: none;
                background-color: white;
                color: #333;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .page-button:hover {
                color: #B2D055;
            }

        .search-container {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 25px;
            padding: 5px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-bottom:10px;
            width : 250px;
        }

        .search-input {
            border: none;
            outline: none;
            padding: 10px;
            border-radius: 25px;
            width: 200px;
        }

</style> 