<template>
    <canvas id="ratingChart"></canvas> <!-- 차트를 그릴 캔버스 -->
</template>

<script setup>
import { onMounted } from 'vue';
import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';

// 필요한 구성 요소 등록
Chart.register(BarElement, CategoryScale, LinearScale, BarController);

const props = defineProps({
    ratingsData: {
        type: Object,
        required: true,
    },
});

onMounted(() => {
    // 차트 데이터를 props에서 가져옴
    const ratings = {
        labels: ['5', '4', '3', '2', '1'],
        datasets: [
            {
                label: '별점 분포',
                data: [
                    props.ratingsData.count5,
                    props.ratingsData.count4,
                    props.ratingsData.count3,
                    props.ratingsData.count2,
                    props.ratingsData.count1,
                ],
                backgroundColor: 'rgba(118, 185, 0, 0.5)',
                borderColor: 'rgba(118, 185, 0, 1)',
                borderWidth: 0.1,
            },
        ],
    };

    const options = {
        indexAxis: 'y', // 가로 막대형 차트
        maintainAspectRatio: true, // 부모 컨테이너에 맞춤
        aspectRatio: 2, // 차트의 너비와 높이 비율
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    // 차트를 렌더링
    const ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // 막대형 차트
        data: ratings,
        options: options,
    });
});
</script>

<style>
canvas {
    width: 100%; /* 부모 컨테이너 크기에 맞춤 */
    height: auto;
}
</style>