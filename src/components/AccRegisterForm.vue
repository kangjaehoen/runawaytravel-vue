<template>
<form ref="regform">
    <fieldset>
        <legend>상품명</legend>
        <input type="text" name="accName" maxlength="30" required>
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
                <div class="file-upload-wrapper">
                <span>이미지 삽입</span><br>
                <input type="file" name="imageUpload" class="file-upload" id="imageUpload" accept="image/*" multiple>
                <label for="imageUpload">파일 선택</label>

            <button class="navigation-button" id="prevButton" type="button">이전</button>
            <button class="navigation-button" id="nextButton" type="button">이전</button>
            </div>
            <img id="previewImage" class="preview-image" src="#" alt="이미지 미리보기">
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
            <div class="radio-group">
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
        <label v-for="day in weekday">
            <span v-text=day.dayofweek></span><input type="checkbox" name="dayoff" :value="day.value" :checked="day.checked">
        </label>
    </fieldset>
    <div>
        <legend>숙소 주소</legend>
        <Post></Post>
    </div>
    <fieldset>
        <legend>상세소개</legend>
        <textarea name="informtext" rows="20" cols="50"></textarea>
    </fieldset>
    <fieldset>
        <legend>숙소규칙</legend>
        <textarea name="accomRule" rows="10" cols="50"></textarea>
    </fieldset>

    <fieldset style="border : none;">
        <div class="button-container">
            <button type="submit" id="upload" @click="url($event,'accUpload')" value="등록하기">등록하기</button>
            <button type="submit" id="update" @click="url($event,'uploadtest3')" value="수정하기">수정하기</button>
            <button type="button" id="del" @click="del($event,'accDel')" value="숙소삭제">삭제하기</button>
        </div>
    </fieldset>
</form>
</template>
<script setup>
import axios from 'axios';
import Post from './Postcode.vue';
import { reactive, ref } from 'vue';
import router from '@/router';
const weekday = reactive([
    {"dayofweek":"월","value":1,"checked":false},
    {"dayofweek":"화","value":2,"checked":false},
    {"dayofweek":"수","value":3,"checked":false},
    {"dayofweek":"목","value":4,"checked":false},
    {"dayofweek":"금","value":5,"checked":false},
    {"dayofweek":"토","value":6,"checked":false},
    {"dayofweek":"일","value":7,"checked":false},
])

const regform = ref(null);
const url = (e,url) =>{
    e.preventDefault();
    console.log(url);
    const formdata = new FormData(regform.value);
    for(let elem of formdata.entries()){
        console.log(elem);
    }
    axios
    .post(`http://localhost:8086/${url}`,formdata)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        console.log("what the hell "+error);
    });
}

const del = (e,url) =>{
    //e.preventDefault(); type이 button이라 필요 없음.
    axios
    .delete(`http://localhost:8086/${url}`)
    .then((response)=>{
        alert(response.data);
        router.push("/myacc");
    })
    .catch((error)=>{
        console.log("what the hell "+error);
    });
}


</script>
<style>

</style>