<template>
    <div class="sellerContainer">
        <div class="sellerController">
            <input v-model="state.Search" @keyup.enter="searchmine" class="searchbarmyacc"></input>
        </div>
        <div style="width: 1200px;">
            <button @click="checkedonsalechange" class="greenbutton" style="float: right;">판매상태 변경</button>
        </div>
        <div class="myacctablecontainer">
        <br><br>
            <table class="myacctable">
            <thead>
                <tr>
                    <td><input type="checkbox" @change="checkchange($event)"></td>
                    <td>숙소명</td>
                    <td>주소</td>
                    <td>기본가격 / 초과가격</td>
                    <td>기본인원 / 최대인원</td>
                    <td>카테고리</td>
                    <td>유형</td>
                    <td>판매상태</td>
                </tr>
            </thead>
            <tbody v-if="state.Acclist.length > 0">
                <tr v-for="(row, index) in state.Acclist" :key="row.accomNum">
                    <td><input type="checkbox" v-model="state.checkboxs[index]"></td>
                    <td @click="loadAcc(row.accomNum)" class="accname">{{ row.accName }}</td>
                    <td>{{ row.address }} {{ row.detailAddress }}</td>
                    <td>{{ row.price.toLocaleString('en-US') }} 원<br>어린이 {{ row.kidPrice.toLocaleString('en-US') }} 원 , 성인 {{ row.adultPrice.toLocaleString('en-US') }} 원</td>
                    <td>{{ row.occ }} 명 / {{ row.maxocc }} 명</td>
                    <td>{{ row.category }}</td>
                    <td>{{ row.accType }}</td>
                    <td>{{ salestatus[row.onSale] }}</td>                
                </tr>
            </tbody>
        </table>
        </div>
        <br>
        <div class="sellerController">
            <button v-on:click="previouspage">이전</button><span>{{ Currentpage +1 }} / {{ state.Totalpage }}</span><button @click="nextpage">다음</button>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { jwtDecode } from 'jwt-decode';
const state = reactive({
    Acclist : [],
    Totalpage : "",
    Totalelement : "",
    Search : "",
    checkboxs : [false,false,false,false,false,false,false,false,false,false],
});
const salestatus = ["판매중지","판매중"];
const Currentpage = ref(0);
const nextpage = ()=>{
    if(Currentpage.value<state.Totalpage -1){
        Currentpage.value++;
        getData();
    }
}
const previouspage = ()=>{
    if(Currentpage.value>0){
        Currentpage.value--;
        getData();
    }
}
const searchmine = () =>{
    Currentpage.value = 0;
    getData();
}

const router = useRouter();

const getData = () => {
    const token = localStorage.getItem("token");
    console.log('Token', token);
    
    if (token) {
        axios
            .post('http://localhost:8086/myaccomtable', {
                key: state.Search,
                page: Currentpage.value,
            })
            .then((response) => {
                state.Acclist = response.data.content;
                state.Totalpage = response.data.totalPages;
                state.Totalelement = response.data.totalElements;
            })
            .catch((error) => {
                console.error('데이터를 가져오던 중 에러 발생', error);
            });
    } else {
        console.log("No token found");
    }
};

const loadAcc = (number) =>{
    router.push({name : 'accreg', query : {accomNum : number}});
}
const checklist = computed(()=>{
    const ary = [];
    for(let eachcheck in state.checkboxs){
        if(state.checkboxs[eachcheck]){
            ary.push(state.Acclist[eachcheck].accomNum);
        }
    }
    return ary;
})

const checkchange = (e)=>{
    if(e.target.checked){
        state.checkboxs = [true,true,true,true,true,true,true,true,true,true];
    } else {
        state.checkboxs = [false,false,false,false,false,false,false,false,false,false];
    }
}
const checkedonsalechange = async() =>{
    if(checklist.value.length != 0){
        await axios
        .post("http://localhost:8086/changeonsale",checklist.value)
        .then((response)=>console.log(response.data));
    }
    getData();
}

onMounted(() => {
  getData();
});
</script>
<style scoped>
    .myacctablecontainer{
        min-height: 600px;
    }
    .myacctable{
        background-color: cornsilk;
        text-wrap: nowrap;
    }
    .myacctable thead{
        text-align: center;
        background-color: #B2D055;
        color: #45a049;
        font-size: 20px;
        font-weight: bold;
        text-wrap: nowrap;
    }
    .myacctable td{
        min-width: 130px;
        min-height: 50px;
        text-align: center;
    }
    .myacctable tr td:nth-of-type(1),
    .myacctable thead tr td:nth-of-type(1) {
        min-width: 30px;
        width: 30px;
        text-align: center;
    }
    .myacctable tr:nth-of-type(2n){
        background-color: wheat;
    }
    .searchbarmyacc{
        display: flex;
        background-color: #ffffff;
        width : 400px;
        height: 70px;
        border: 1px solid #ccc;
        border-radius: 50px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .accname{
        cursor: pointer;
    }
</style>