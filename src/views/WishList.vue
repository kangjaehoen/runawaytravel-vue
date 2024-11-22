<template>
    <div class="accom-container">
        <h2>나의 위시리스트 </h2>
        <div class="accom-list">
        <!-- 숙소 카드 반복 출력 -->
            <div v-for="accom in accomList" :key="accom.accomNum" class="accom-card">
                <div class="accom-info"  @click="goToDetail(accom.accomNum)">
                    <h3>{{ accom.accName }}</h3>
                    <p class="address">{{ accom.address }}</p>
                    <p class="price">￦ {{ accom.price.toLocaleString() }}</p>
                    <button @click="handleRemove(accom.accomNum)" class="remove-btn">Remove</button>
                    
                </div>
            </div>
        </div>
        <WishListClickDelete ref="wishListDelete"></WishListClickDelete>
    </div>
</template>

<script setup>
    import WishListClickDelete from '@/components/WishListClickDelete.vue';
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const accomList =ref([]);
    const router = useRouter();
    const wishListDelete = ref();

    const fetchAccomList = () => {
    const token = localStorage.getItem("token");
    console.log('Token', token);  // 문제가 없으면 이 줄은 정상적으로 실행됩니다.

    if (token) {
        axios.get("http://localhost:8086/wish", {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${token}`,  // 템플릿 리터럴 사용하여 토큰 포함
            }
        })
        .then((response) => {
            accomList.value = response.data.map(item => ({
                accomNum: item.accomNum.accomNum,
                accName: item.accomNum.accName,
                address: item.accomNum.address,
                price: item.accomNum.price,
                accCall: item.accomNum.accCall,
            }));
        })
        .catch(error => {
            console.error("Failed to fetch accommodation list:", error);
        });
    } else {
        console.log("No token found");
    }
};

  onMounted(() => {
    fetchAccomList();
});


watch(accomList, () => { // accomList 변할때마다 감지
    fetchAccomList();
});
    const handleRemove = (accomNum) => {
      event.stopPropagation();
      console.log(accomNum);
      if(wishListDelete.value){
          wishListDelete.value.clickHeart(accomNum);
          console.log(accomNum);
        }
    };
    
    const goToDetail = (accomNum) => {
        router.push({ name: 'accDetail', params: { accomNum } });
    };

</script>

<style scoped>
/* 컨테이너 스타일 */
.accom-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* 제목 스타일 */
h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 숙소 리스트 스타일 */
.accom-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* 숙소 카드 스타일 */
.accom-card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.2s;
}

.accom-card:hover {
  transform: scale(1.05);
}

/* 이미지 스타일 */
.accom-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* 정보 영역 스타일 */
.accom-info {
  padding: 15px;
}

.accom-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.accom-info .address {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.accom-info .price {
  font-size: 16px;
  color: #57700c;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 버튼 스타일 */
.remove-btn {
  background: #B2D055;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #859f37;
}
</style>