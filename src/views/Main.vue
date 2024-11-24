<template>
<div class="maincontainer">
<div>
    <div class="search-bar-container">
        <div class="search-bar">
            <input type="text" v-model="searchtext" placeholder="검색할 내용을 입력해주세요." required @keyup.enter="searchacc(searchtext)">
            <button type="button" @click="searchacc(searchtext)">
                <img id="searchButton" src="../../images/searchbtn.png" />
            </button>
        </div>
    </div>
    <br>
    <div class="stretchedContainer">
        <div class="box" style="text-align: center;">
        <AccCardStretched :accom="stretchedaccom[stretchedpage]" @stretchedbutton="movestrechedaccom"></AccCardStretched>
        </div>
    </div>
    <div class="accomCardContainer">
        <button @click="pagedown()" class="mainbutton">&lt</button>
        <div class="box">
            <AccCard v-if="accoms.length > 0" v-for="accom in accoms" :accom="accom"></AccCard>
        </div>
        <button @click="pageup()" class="mainbutton">&gt</button>
    </div>
</div>
</div>
{{ page +1  }} / {{ totalpage }}
</template>
<script setup>
import AccCard from "@/components/AccCard.vue";
import AccCardStretched from "@/components/AccCardStretched.vue";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
const accoms = reactive([]);
const searchtext = ref('');
const searched = ref('');
const page = ref(0);
const totalpage = ref(1);
const pageup = () =>{
    if(page.value < totalpage.value -1 ){
        page.value++;
    } else {
        page.value = 0;
        searched.value = key;
        searchacc2(key);
    }
    if(searched.value==""){
        getrandomaccoms();
    } else {
        searchacc2(searched.value);
    }
}
const pagedown = () =>{
    if(page.value > 0){
        page.value--;
    } else {
        page.value = totalpage.value - 1;
    }
    if(searched.value==""){
        getrandomaccoms();
    } else {
        searchacc2(searched.value);
    }
}
const getrandomone = async() =>{
    await axios
    .get(`http://localhost:8086/api/getrandom?page=${page.value}`)
    .then((response)=>{
        stretchedaccom.splice(0,accoms.length, ...response.data.getContent);
        stretchedtotalpage.value=response.data.getTotalPages;
    })
}
const stretchedaccom = reactive([]);
const stretchedpage = ref(0);
const stretchedtotalpage = ref(1);
const movestrechedaccom = (num) =>{
    stretchedpage.value = num;
}

const getrandomaccoms = async() =>{
    await axios
    .get(`http://localhost:8086/api/getrandom?page=${page.value}`)
    .then((response)=>{
        accoms.splice(0,accoms.length, ...response.data.getContent);
        totalpage.value=response.data.getTotalPages;
    })
}
const searchacc = (key) =>{
    page.value = 0;
    searched.value = key;
    searchacc2(key);
}

const searchacc2 = async(key) =>{
    axios
    .get(`http://localhost:8086/api/search?key=${key}&page=${page.value}`)
    .then((response)=>{
        accoms.splice(0,accoms.length, ...response.data.getContent);
        totalpage.value=response.data.getTotalPages;
    })
}

onMounted(()=>{
    getrandomaccoms();
    getrandomone();
})
</script>
<style scoped>
    .accomCardContainer{
        display: flex;
        min-width: 1200px;
        height: 330px;
    }
    .search-bar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
    .maincontainer{
        min-height: 1000px;
    }
    .mainbutton{
        height: 100%;
        border: 0;
        background-color: transparent;
    }
    .mainbutton:hover{
        background-color: #B2D055;
        transition: 3s;
    }
    .box{
        width: 1250px;
    }
    .box button{
        width: 100;
    }

    /* 검색바 스타일 */
    .search-bar {
        display: flex;
        background-color: #ffffff;
        width : 400px;
        border: 1px solid #ccc;
        border-radius: 50px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .search-bar select, .search-bar input {
        border: none;
        padding: 10px;
        margin-right: 10px;
        border-radius: 30px;
        background-color: white;
        outline: none;
    }


    .search-bar input {
        width: 350px;
    }

    .search-bar button {
        background-color: #B2D055;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
    }

    .search-bar button:hover {
        background-color: #45a049;
    }

    .featured-image {
        text-align: center;
    }

    .featured-image img {
        width: 700px;
        height: 400px;


    }
    #searchButton{
        width:20px;
        height:20px;
    }
</style>

