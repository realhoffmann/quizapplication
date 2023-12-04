<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link to="/">
                <a class="navbar-brand"><img src="../assets/logo.png" width="60" height="60" alt="? ">
                </a></router-link>
            <button class="navbar-toggler" type="button" @click="toggleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-evenly text-center" :class="{ 'show': isNavbarOpen }"
                id="navbarSupportedContent">
                <router-link to="/">Home</router-link>
                <br>
                <!-- Profile Link: Visible only when the user is logged in -->
                <router-link v-if="loggedIn" to="/User">Profile</router-link>
                <br>
                <a class="login-logout" @click="login">{{ loggedIn ? 'Logout' : 'Login' }}</a><br>
                <router-link to="/about">About</router-link>
            </div>
        </div>
    </nav>
</template>
 
<script>

import { useAppStore } from "@/services/store/appStore";
import { computed } from "vue";

export default {
    data() {
        const store = useAppStore();
        return {
            isNavbarOpen: false,
            loggedIn: computed(() => store.getLoggedIn())
        };
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
    },
};
</script>
  