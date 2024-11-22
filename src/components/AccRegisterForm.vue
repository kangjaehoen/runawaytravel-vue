<template>
<form ref="regform" class="regform">
    <fieldset>
        <!--제출했을 때 username으로 해당 accomNum을 가지고 있는지 확인하는 알고리즘이 필요해보임. 안그러면 클라를 조작할 수 있잖아-->
        {{ accomNum }}
        <legend>상품명</legend>
        <input type="text" name="accName" maxlength="30" required class="accname">
    </fieldset>
    <fieldset>
        <legend>요금 설정</legend>
        <div class="flex-container">
            <div class="left-section">
                <span>기본요금</span><input type="number" name="price" min="0" max="999999999" step="100" maxlength="8" required><br>
                <span>기본 인원 제한</span><input type="number" name="occ" min="0" max="99999999" step="1" required><br>
            </div>
            <div class="right-section">
                <span>초과 인원 요금 (대인)</span><input type="number" name="adultPrice" min="0" max="99999999" step="100"><br>
                <span>초과 인원 요금 (소인)</span><input type="number" name="kidPrice" min="0" max="99999999" step="100"><br>
                <span>최대 초과 인원</span><input type="number" name="maxocc" min="0" max="999999999" step="1" placeholder="기본 인원 포함하여 작성해주세요"><br>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>숙소 정보</legend>
        <div class="flex-container">
            <div class="left-section">
                <AccRegImage></AccRegImage>
            </div>
            <div class="right-section">
                <span>숙소 전화번호</span><input type="tel" name="accCall"><br>
                <span>카테고리</span><input type="text" name="category" list="categorylist">
                <datalist id="categorylist">
                    <option>바다</option>
                    <option>산</option>
                    <option>섬</option>
                    <option>도시</option>
                </datalist>
                <span>체크인 시간</span>
                <input type="time" name="chkin_Time" value="14:00"><br>
                <span>체크아웃 시간</span>
                <input type="time" name="chkout_Time" value="12:00"><br>
                <span>침실 수</span>
                <input type="number" name="room" min="1" max="999999999" step="1"><br>
                <span>침대 수</span>
                <input type="number" name="bed" min="1" max="999999999" step="1"><br>
                <span>화장실 수</span>
                <input type="number" name="bathroom" min="1" max="999999999" step="1"><br>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>판매 유형</legend>
            <div class="group">
                <input type="radio" name="accType" id="house1" value="게스트하우스">
                <label for="house1">게스트하우스</label>
                <input type="radio" name="accType" id="house2" value="펜션">
                <label for="house2">펜션</label>
                <input type="radio" name="accType" id="house3" value="호텔">
                <label for="house3">호텔</label>
                <input type="radio" name="accType" id="house4" value="캠핑장">
                <label for="house4">캠핑장</label>
                <input type="radio" name="accType" id="house5" value="풀빌라">
                <label for="house5">풀빌라</label>             
            </div>
    </fieldset>
    <fieldset>
        <legend>휴일</legend>
        <div class="group">
            <template v-for="(day, index) in weekday">
                <input type="checkbox" name="dayoff" :id="'checkbox'+index" :value="day.value">
                <label v-text=day.dayofweek :for="'checkbox'+index"></label>
            </template>
        </div>
    </fieldset>
    <div>
        <fieldset>
        <legend>숙소 주소</legend>
        <Post></Post>
        </fieldset>
    </div>
    <fieldset>
        <legend>상세소개</legend>
        <textarea name="informtext" rows="20" cols="50" maxlength="1000" v-model="informtext"></textarea>
        <div class="textlength">{{ informtext.length }} / 1000</div>
    </fieldset>
    <fieldset>
        <legend>숙소규칙</legend>
        <textarea name="accomRule" rows="20" cols="50" maxlength="1000" v-model="accomRule" ></textarea>
        <div class="textlength">{{ accomRule.length }} / 1000</div>
    </fieldset>

    <fieldset style="border : none;">
        <div class="sellerController">
            <button type="submit" id="upload" @click="url($event,'accUpload')" value="등록하기">등록하기</button>
            <button type="submit" id="update" @click="url($event,'accUpload')" value="수정하기" v-if="accomNum">수정하기</button>
            <button type="button" id="del" @click="del($event,'accDel')" value="숙소삭제" v-if="accomNum">삭제하기</button>
        </div>
    </fieldset>
</form>
</template>
<script setup>
import axios from 'axios';
import Post from './AccRegPostcode.vue';
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';
import AccRegImage from './AccRegImage.vue';
import { useRoute } from 'vue-router';
const weekday = reactive([
    {"dayofweek":"월","value":1},
    {"dayofweek":"화","value":2},
    {"dayofweek":"수","value":3},
    {"dayofweek":"목","value":4},
    {"dayofweek":"금","value":5},
    {"dayofweek":"토","value":6},
    {"dayofweek":"일","value":7},
]);
const informtext = ref('');
const accomRule = ref('')

const regform = ref(null);
let inputs = [];
const route = useRoute();
const accomNum = ref(route.query.accomNum);
const lastdata = ref(null);
//저장or수정
const url = (e,url) =>{
    e.preventDefault();
    if (!regform.value.reportValidity()) {
        return; // 유효성 검사 실패 시 중단
    }
    const formdata = new FormData(regform.value);
    for(let input of inputs){
        if(input.value=='' || (input.type==='number' && isNaN(Number(input.value))))
        formdata.delete(input.name);
    }
    //수정하는 경우
    if (e.target.value=='수정하기' && !isNaN(Number(accomNum.value))){
        formdata.append("accomNum" , accomNum.value);
    }
    const token = sessionStorage.getItem("token");
    if(token){
    axios
    .post(`http://localhost:8086/${url}`,formdata, {headers:
        {
            "X-Requested-With": "XMLHttpRequest",
            Authentication: `${token}`
        }
    })
    .then((response)=>{
        alert(response.data);
        router.push({name : 'myacc'})
    })
    .catch((error)=>{
        console.log("what the hell "+error);
    });
}else{
    console.log("이게 뭐노: "+ error);
}
};
//값 불러오기
const loaddata = () =>{
    if (!isNaN(Number(accomNum.value))){
        axios
        .get(`http://localhost:8086/accLoad?accomNum=${accomNum.value}`)
        .then((response)=>{
            lastdata.value = response.data.oneAcc;
            for(let input of inputs){
                //여러개 선택하는 input 먼저 값 정하기
                if(input.name == 'accType' && input.value == lastdata.value[input.name]){
                        input.checked = true;
                    }
                else if(input.name == 'dayoff' && lastdata.value['dayoff'] != null && !isNaN(Number(lastdata.value['dayoff']))){
                        if([...lastdata.value['dayoff']].includes(input.value)){
                        input.checked = true;
                        };
                    }
                //나머지 input들
                else if(lastdata.value[input.name] != undefined){
                    input.value = lastdata.value[input.name];
                }
            }

        })
        .catch((error)=>{
            console.log(error);
        });
    }
}
//삭제
const del = (e,url) =>{
    //e.preventDefault(); type이 button이라 필요 없음.
    axios
    .delete(`http://localhost:8086/${url}`,{params : {accomNum : accomNum.value}})
    .then((response)=>{
        alert(response.data);
        router.push({name : "myacc"});
    })
    .catch((error)=>{
        console.log("what the hell "+error);
    });
};
onMounted(()=>{
    inputs = [...regform.value.querySelectorAll('input'), ...regform.value.querySelectorAll('textarea')];
    loaddata();
});

</script>
<style scoped>
    .regform{
        width: 1100px;
    }
    .regform fieldset {
    display: flex;
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    flex-direction: column; /* 세로 방향 정렬 */
    }
    .flex-container{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        width: 900px;
        margin: 0 auto;
    }
    .right-section,
    .left-section{
        width: 48%;
        display: flex;
        flex-direction: column;
    }
    .group{
        display: flex;
        justify-content: space-between;
        padding-left: 70px;
        padding-right: 70px;
    }
    .accname{
        width: 750px;
        text-align: center;
        font-size: 30px;
        border: 0;
    }
    .textlength{
        width: 100%;
        text-align: right;
    }
    textarea{
        width: 100%;
        border: 0;
        resize: none;
        font-size: 20px;
        line-height: 30px;
    }
    input{
        display: inline-block;
        width: 100%;
        height: 30px;
        align-self: center;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    textarea:focus,
    input:focus{
        outline: none;
    }
    input[type='radio']{
        display: none;
    }
    input[type='checkbox']{
        display: none;
    }
    input[type="radio"]:checked + label,
    input[type="checkbox"]:checked + label {
        background-color: #45a049;
        color: #fff;
    }
    label{
        min-width: 60px;
        height: 20px;
        text-wrap: nowrap;
        text-align: center;
        justify-content: center;
        border-radius: 7px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>