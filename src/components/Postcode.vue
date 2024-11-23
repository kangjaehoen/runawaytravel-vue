<template>
    <div>
      <input type="text" v-model="postcode" id="postcode" name="postcode"placeholder="우편번호" />
      <button @click="sample6_execDaumPostcode" type="button">우편번호 찾기</button><br>
      <input type="text" v-model="address" placeholder="주소" id="address" name="address"/><br>
      <input type="text" v-model="detailAddress" placeholder="상세주소" id="detailAddress" name="detailAddress" ref="detailAddressInput" />
      <input type="text" v-model="extraAddress" placeholder="참고항목" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const postcode = ref('');
  const address = ref('');
  const detailAddress = ref('');
  const extraAddress = ref('');
  const detailAddressInput = ref(null);
  
  function sample6_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function(data) {
        let addr = ''; 
        let extraAddr = ''; 
  
        if (data.userSelectedType === 'R') { 
          addr = data.roadAddress;
        } else { 
          addr = data.jibunAddress;
        }
  
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          extraAddress.value = extraAddr;
        } else {
          extraAddress.value = '';
        }
  
        postcode.value = data.zonecode;
        address.value = addr;
  
        // 상세 주소 필드로 커서를 이동
        detailAddressInput.value?.focus();
      }
    }).open();
  }
  
  onMounted(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  });
  </script>
  
<style>

</style>