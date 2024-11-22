<template>
    <span>이미지 삽입</span><br>
    <div class="imgController">
        <label for="imageUpload">파일 선택</label>
        <input type="file" name="imageUpload" id="imageUpload" class="file-upload" accept="image/*" multiple @change="upload" style="display: none;">
            <button class="navigation-button" id="prevButton" type="button" @click="previmg">이전</button>
            <div imgsubcontroller>
            <span v-if="imagebox.images.length > 0">{{ imagebox.currentindex +1 }} / {{imagebox.images.length}}</span>
            </div>
            <button class="navigation-button" id="nextButton" type="button" @click="nextimg">다음</button>
        </div>
        <br>
    <img id="previewImage" class="preview-image" :src="imagebox.images.length===0?'/regformpic.png':imagebox.images[imagebox.currentindex]" alt="이미지 미리보기">
</template>
<script setup>
import { reactive } from 'vue';
    const imagebox=reactive({
        images : [],
        currentindex : 0
    })
    const upload = (e)=>{
        const files = e.target.files;
        if(files.length>5){
            alert("이미지는 5장까지 가능합니다.");
            e.target.value = "";
        }
        else {
            imagebox.images.forEach((url) => URL.revokeObjectURL(url));
            imagebox.images = Array.from(files, (file)=>URL.createObjectURL(file));
            imagebox.currentindex = 0;
        }
    }
    const nextimg = () => {
        if(imagebox.currentindex<imagebox.images.length - 1){
            imagebox.currentindex++;
        } else{
            imagebox.currentindex=0;
        }
    }
    const previmg = () => {
        if(imagebox.currentindex>0){
            imagebox.currentindex--;
        } else{
            imagebox.currentindex=imagebox.images.length - 1;
        }
    }

</script>
<style scoped>
    .preview-image{
        width: 430px;
        height: 300px;
    }
    .imgController{
        display: flex;
        width: 100%;
        justify-content: space-between;
        text-wrap: nowrap;
    }
    .imgsubcontroller{
        width: 60px;
        display: flex;
        justify-content: space-between;
    }

    label,
    button {
        background-color: #B2D055; /* 버튼 배경색 */
        color: white; /* 버튼 텍스트 색상 */
        border: none; /* 기본 테두리 제거 */
        border-radius: 5px; /* 버튼 모서리 둥글게 */
        padding: 8px 15px; /* 버튼 내부 여백 */
        font-size: 16px; /* 버튼 텍스트 크기 */
        cursor: pointer; /* 마우스 커서 변경 */
        transition: background-color 0.3s ease; /* 배경색 변화 애니메이션 */
    }
    button:hover {
        background-color: #45a049;
    }
</style>