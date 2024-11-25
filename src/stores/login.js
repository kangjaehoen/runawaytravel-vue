import { ref } from "vue";

export const isLoggedIn = ref(!!sessionStorage.getItem("token"));