<template>
    <button class="w-100 btn btn-lg btn-warning" v-on:click="logout">로그아웃</button>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from 'vue-router';

  axios.defaults.withCredentials = true;

  export default {
    setup() {
      const router = useRouter();
      const logout = () => {
        const confirmLogout = window.confirm("로그 아웃 하시겠습니까?");

        if (confirmLogout) {
          axios
            .get("http://localhost:8086/logout", {
                headers: {
                    Authorization : `{token}`,
                },
            })
            .then((res) => {
              if (res.headers.get('Authorization') === "delete") {
                sessionStorage.removeItem("token");
                window.alert("로그아웃 되었습니다.");
                router.push({ name: 'main' });
              } else {
                window.alert("로그아웃 실패.");
              }
            })
            .catch(() => {
              window.alert("로그아웃을 수행하는 동안 오류가 발생하였습니다.");
            });
        } else {
          window.alert("로그아웃이 취소되었습니다.");
        }
      };

      return { logout };
    },
  };
</script>