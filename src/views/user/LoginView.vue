<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Login</h1>
            <form class="auth-form" @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label class="form-label" for="username">User Name/E-Mail</label>
                    <input v-model="email" type="text" class="form-control" id="username"
                        placeholder="Max/max.muster@gmail.com">
                </div>
                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="********"
                        minlength="8">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn card-button">Login</button>
                    <router-link to="/register" v-slot="{ navigate }">
                        <button @click="navigate" class="btn card-button">Register</button>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { login } from "@/services/user/UserRegisterService";
import router from "@/router";

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async handleSubmit() {
          router.afterEach(() => {
            location.reload();
          });
            await login(this.email, this.password, this.$router).then((result) => {
                if (result) {
                    this.goToHomeView();
                }
            });
        },
        goToHomeView() {
            setTimeout(() => {
                this.$router.push({
                    name: "home",
                });
            }, 300);
        },
    },
};
</script>
