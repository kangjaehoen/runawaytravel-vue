<template>
   <div>
        <ReviewInsert></ReviewInsert>
    </div>
</template>

<script setup>
    import ReviewInsert from '@/components/ReviewInsert.vue';

</script>

<style>
  body {
        font-family: Arial, sans-serif;
    }

    body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9; /* 검은색 반투명 오버레이 */
        z-index: -1; /* 요소 위에 표시되도록 */
    }

    .review-container {
        width: 700px;
        height: 850px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #ffffff;
        position: relative;
        z-index: 2;
    }

    .title h2 {
        margin: 0;
        font-size: 1.5em;
    }

    .review-guide {
        margin: 10px 0;
        font-size: 0.9em;
        color: #666;
    }

    .review-form {
        display: flex;
        justify-content: space-between;
    }

    .left-column {
        flex: 1;
        text-align: center;
        padding-right: 20px;
    }

    .image-placeholder {
        width: 150px;
        height: 150px;
        background-color: #eaeaea;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        border-radius: 10px;
        color: #666;
    }

    .property-name {
        font-size: 1.2em;
        font-weight: bold;
        text-align: left;
    }

    .right-column {
        flex: 2;
    }

    .right-column p {
        margin-top: 0;
        font-weight: bold;
    }

    .ratings {
        margin-top: 10px;
    }

    .rating {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .rating span {
        margin-right: 10px;
    }

    .stars {
        display: flex;
    }

    .star {
        width: 25px;
        height: 25px;
        background-color: #e0e0e0;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        margin-right: 5px;
        cursor: pointer;
    }

    .star.filled {
        background-color: #B2D055; /* Green color for filled stars */
    }

    .comment-section {
        margin-top: 80px;
    }

    .comment-section h3 {
        font-size: 1.2em;
        margin-bottom: 10px;
    }

    .comment-box {
        width: 97%;
        height: 200px;
        border: 1px solid #d0e6c1;
        border-radius: 10px;
        padding: 10px;
        font-size: 1em;
        color: #999;
        resize: none;
        margin-top: 20px;
    }

    p{
    margin-top: 20px;

    }

    .comment-box::placeholder {
        color: #ccc;
    }

    .submit-btn {
        margin-top: 30px;
        background-color: #B2D055;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        float: right;
    }

    .submit-btn:hover {
        background-color: #5BA63D;
    }

    .comment-box:focus {
    outline: none; /* 클릭 시 발생하는 기본적인 외곽선 제거 */
    border-color: #d0e6c1; /* 기본 테두리 색상 유지 */
    background-color: white; /* 배경색이 변하지 않도록 유지 */
    }

     /* 모달 스타일 */
     .modal-overlay {
            display: none; /* 기본적으로 숨김 */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
            justify-content: center;
            align-items: center;
            z-index: 1000; /* 다른 요소들보다 위에 위치 */
        }

        .modal {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            width: 300px;
            text-align: center;
        }

        .modal h3 {
            margin-bottom: 10px;
        }

        .modal button {
            margin-top: 10px;
            background-color: #B2D055;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            cursor: pointer;
        }

        .modal button:hover {
            background-color: #5BA63D;
        }
        .modal .image-placeholder{
            margin-left: 70px;

        }

</style>