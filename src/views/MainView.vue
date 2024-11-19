<template>
    <div class="form">
      반갑습니다. dd님
    </div>
  </template>
  
  <!-- <script>
  import * as decode from 'jwt-decode';
  
  export default {
    data() {
      return {
        name: "", // Initial state for name
      };
    },
    mounted() {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token");
  
      if (token) {
        try {
          // Decode the token to extract user info (e.g., name)
          const decodedToken = decode(token);
          // Ensure that 'name' is part of the decoded token
          this.name = decodedToken.name || 'User'; // Set default to 'User' if 'name' is missing
        } catch (error) {
          console.error("Invalid token:", error);
          // Optionally, redirect or show an error message
          this.$router.push("/login");
        }
      } else {
        console.log("No token found");
        // Optionally, redirect to login page if no token exists
        this.$router.push("/login");
      }
    },
  };
  </script>
   -->