<!-- LoginView -->
<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Login</h1>
            <!-- Login Form -->
            <form class="auth-form" @submit.prevent="handleSubmit">
              <!-- E-Mail -->
                <div class="form-group">
                    <label class="form-label" for="username">User Name/E-Mail</label>
                    <input v-model="email" type="text" class="form-control" id="username"
                        placeholder="max.muster@gmail.com">
                </div>
                <!-- Password -->
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
  /**
   * Data properties
   */
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        /**
         * Handles submit event of the login form.
         */
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
        /**
         * Navigates to the home view.
         */
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
