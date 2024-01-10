
<template>
  <nav class="navbar navbar-expand-lg bg-light" aria-label="Main navigation">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/logo.png" width="60" height="60" alt="QuizApp Logo">
      </router-link>

      <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-evenly text-center" :class="{ 'show': isNavbarOpen }" id="navbarSupportedContent">
        <div><router-link to="/" class="nav-item">Home</router-link></div>
        <div><router-link v-if="loggedIn" :to="userLink" class="nav-item">{{ linkText }}</router-link></div>
        <div><router-link to="/login" class="nav-item" @click="login">{{ loggedIn ? 'Logout' : 'Login' }}</router-link></div>
        <div><router-link to="/about" class="nav-item">About</router-link></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAppStore } from "@/services/store/appStore";
import { computed } from "vue";
import { getUserFromToken } from "@/services/auth/TokenService";

export default {
  data() {
    const store = useAppStore();
    return {
      isNavbarOpen: false,
      loggedIn: computed(() => store.getLoggedIn())
    };
  },
  computed: {
    isAdmin() {
      const user = getUserFromToken(localStorage.getItem("auth_token"));
      return user && user.role === "ADMIN";
    },
    userLink() {
      return this.isAdmin ? '/Admin' : '/User';
    },
    linkText() {
      return this.isAdmin ? 'Admin' : 'Profile';
    }
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    login() {
      const store = useAppStore();
      if (store.getLoggedIn()) {
        this.logout();
      } else {
        this.$router.push({
          name: "login",
        });
      }
    },
    logout() {
      const store = useAppStore();
      store.logOut();
      this.$router.push({
        name: "home",
      });
    }
  }
};
</script>
