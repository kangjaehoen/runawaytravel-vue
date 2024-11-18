<template>
    <div class="convenience-item">
    <img :src="image" :alt="label" class="convenience-image" />
    <p class="convenience-label">{{ label }}</p>
</div>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
image: {
    type: String,
    required: true,
},
label: {
    type: String,
    required: true,
},
});
</script>

<style scoped>
.convenience-item {
display: flex;
flex-direction: row;
align-items: center;
text-align: center;
margin: 10px;
gap: 15px;
}

.convenience-image {
width: 50px;
height: 50px;
object-fit: contain;
margin-bottom: 5px;
}

.convenience-label {
font-size: 14px;
color: #333;
}
</style>
