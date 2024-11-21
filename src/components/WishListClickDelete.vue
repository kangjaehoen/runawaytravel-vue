<template>

</template>

<script setup>
    import axios from 'axios';
    import { reactive, defineProps,  defineExpose } from 'vue';

    // const props = defineProps({
    //     accom : Number,
    //     required: true,
    // })

    const wishList = reactive({
        accomNum: 0, 
    });

    const clickHeart = async (accomNum) => {
    wishList.accomNum = accomNum;
    const token = localStorage.getItem("token");
    console.log('Token', token);

    if (token) {
        try {
            const response = await axios.delete(`http://localhost:8086/wish`, {
                wishList, // 요청 본문에 wishList 데이터를 포함
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${token}`, // 템플릿 리터럴 사용하여 Authorization 헤더에 토큰을 포함
                }
            });
            if (response.status === 200) {
                alert("위시리스트 삭제되었습니다.");
            } else {
                alert("위시리스트 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            alert("위시리스트 삭제 중 오류가 발생했습니다.");
        }
    } else {
        alert("로그인이 필요합니다.");
    }
};

// 부모에서 메서드를 호출할 수 있도록 expose
defineExpose({
    clickHeart, 
});

</script>

<style>

</style>