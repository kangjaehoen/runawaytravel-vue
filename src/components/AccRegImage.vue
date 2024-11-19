<template>
    <div class="file-upload-wrapper">
        <span>이미지 삽입</span><br>
        <input type="file" name="imageUpload" class="file-upload" accept="image/*" multiple @change="upload" :src="imagebox.images[imagebox.currentindex]">
        <label for="imageUpload">파일 선택</label>
            <button class="navigation-button" id="prevButton" type="button" @click="previmg">이전</button>
            <span v-if="imagebox.images.length > 0">{{ imagebox.currentindex +1 }} / {{imagebox.images.length}}</span>
            <button class="navigation-button" id="nextButton" type="button" @click="nextimg">이전</button>
        </div>
    <img id="previewImage" class="preview-image" :src="imagebox.images[imagebox.currentindex]" alt="이미지 미리보기">
</template>
<script setup>
import { reactive, ref } from 'vue';
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
<style>
    .preview-image{
        width: 300px;
        height: 300px;
    }
</style>