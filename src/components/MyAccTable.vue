<template>
    <input v-model="state.Search" @keyup.enter="searchmine"></input>
    <br>
    <table>
        <thead>
            <tr>
                <td>숙소명</td>
                <td>주소</td>
                <td>기본가격</td>
                <td>초과가격</td>
                <td>카테고리</td>
                <td>유형</td>
                <td>판매상태</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in state.Acclist" :key="row.accomNum">
                <td>{{ row.accName }}</td>
                <td>{{ row.address }} {{ row.detailAddress }}</td>
                <td>{{ row.price }}</td>
                <td>{{ row.kidPrice }}</td>
                <td>{{ row.category }}</td>
                <td>{{ row.accType }}</td>
                <td>{{ salestatus[row.onSale] }}</td>
                
            </tr>
        </tbody>
    </table>
    <br>
    <div class="pagination">
    <button v-on:click="previouspage">이전</button><span>{{ Currentpage +1 }}</span> / <span>{{ state.Totalpage }}</span><button @click="nextpage">다음</button>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import { onMounted, reactive, ref } from 'vue';
const state = reactive({
    Acclist : [],
    Totalpage : "",
    Totalelement : "",
    Search : "",
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

const getData = ()=>{
    axios
    .post('http://localhost:8086/myaccomtable',{
        key : state.Search,
        page : Currentpage.value,
    })
    .then((response)=>{
        state.Acclist = response.data.content;
        state.Totalpage = response.data.totalPages;
        state.Totalelement = response.data.totalElements;
    })
    .catch((error)=>{
        console.error('데이터를 가져오던 중 에러 발생',error);
    });
};
onMounted(() => {
  getData();
});
</script>
<style>

</style>