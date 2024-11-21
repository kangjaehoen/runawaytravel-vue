<template>
    <button class="w-100 btn btn-lg btn-warning" >로그아웃</button>
  </template>
  <!-- 
  <script>@click="logout"
  import axios from "axios";

  axios.defaults.withCredentials = true;

  export default {
    setup() {
      const logout = () => {
        const confirmLogout = window.confirm("로그 아웃 하시겠습니까?");

        if (confirmLogout) {
          axios
            .get("http://localhost:8086/logout")
            .then((res) => {
              if (res.headers["authorization"] === "delete") {
                sessionStorage.removeItem("token");
                window.alert("로그아웃 되었습니다.");
                this.$router.push({ name: "main" });
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
</script> -->