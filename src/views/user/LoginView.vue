<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="card loginForm login-card">
            <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="username">User Name/E-Mail</label>
                        <input v-model="email" type="text" class="form-control" id="username"
                               placeholder="Max/max.muster@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Passwort</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                               placeholder="********" minlength="8">
                    </div>
                    <div class="button-container justify-content-evenly">
                        <button type="submit" class="btn btn-primary card-button">Login</button>
                        <router-link to="/register" v-slot="{ navigate }">
                            <button @click="navigate" class="btn btn-primary card-button">Register</button>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from "@/services/user/UserRegisterService";

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async handleSubmit() {
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
