<template>
<div class="guest-counter-item">
    <p class="guest-label">{{ label }}</p>
    <div class="counter-controls">
        <button @click="decrement" class="counter-button">-</button>
        <span class="count">{{ modelValue }}</span>
        <button @click="increment" class="counter-button">+</button>
    </div>
</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
label: {
    type: String,
    required: true,
},
modelValue: {
    type: Number,
    required: true,
},
});

const emit = defineEmits(['update:modelValue']);

// 인원 수 증가 함수
const increment = () => {
    emit('update:modelValue', props.modelValue + 1);
};

// 인원 수 감소 함수
const decrement = () => {
    if (props.modelValue > 0) {
        emit('update:modelValue', props.modelValue - 1);
    }
};
</script>

<style scoped>
.guest-counter-item {
display: flex;
align-items: center;
justify-content: space-between;
margin: 10px 0;
}

.guest-label {
font-size: 16px;
font-weight: bold;
color: #333;
}

.counter-controls {
display: flex;
align-items: center;
gap: 10px;
}

.counter-button {
background-color: #f1f1f1;
border: 1px solid #ccc;
border-radius: 5px;
width: 30px;
height: 30px;
font-size: 18px;
cursor: pointer;
}

.counter-button:hover {
background-color: #e0e0e0;
}

.count {
font-size: 18px;
font-weight: bold;
color: #333;
}
</style>
