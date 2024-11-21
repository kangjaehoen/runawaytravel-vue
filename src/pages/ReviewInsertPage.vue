<template>
   <div>
        <ReviewInsertAccomInfo></ReviewInsertAccomInfo>
        <ReviewInsert></ReviewInsert>
    </div>
</template>

<script setup>
    import ReviewInsert from '@/components/ReviewInsert.vue';
    import ReviewInsertAccomInfo from '@/components/ReviewInsertAccomInfo.vue'

</script>

<style>


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
        cursor: pointer;
        width: 20px;
        height: 20px;
        background-color: #ccc;
        display: inline-block;
        margin-right: 5px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
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

    .ptext{
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



</style>