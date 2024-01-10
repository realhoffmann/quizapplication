<template>
  <nav class="navbar navbar-expand-lg bg-light" aria-label="Main navigation">
    <div class="container-fluid">
      <router-link to="/">
        <a class="navbar-brand">
          <img src="../assets/logo.png" width="60" height="60" alt="? ">
        </a>
      </router-link>
      <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-evenly text-center" :class="{ 'show': isNavbarOpen }" id="navbarSupportedContent">
        <div><router-link to="/" class="nav-item">Home</router-link></div>
        <div v-if="loggedIn" ><router-link :to="userLink" class="nav-item">{{ linkText }}</router-link></div>
        <div><router-link to="/login" @click="login" class="nav-item">{{ loggedIn ? 'Logout' : 'Login' }}</router-link></div>
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
      const user = getUserFromToken(localStorage.getItem("auth_token"));
      return this.isAdmin ? '/Admin/'+ user.id  : '/User';
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
