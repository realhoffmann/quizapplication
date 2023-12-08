<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Register</h1>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="row mb-2">
          <div class="from-group col-md-3">
            <label class="form-label" for="salutation">Gender</label>
            <SalutationSelectAtom  v-model="user.salutation"/>
          </div>
          <div class="col-md-4">
            <label class="form-label" for="firstName">First Name</label>
            <input v-model="user.firstName" type="text" class="form-control" id="firstName" placeholder="Max" required>
          </div>
          <div class="col-md-5">
            <label class="form-label" for="lastName">Last Name</label>
            <input v-model="user.lastName" type="text" class="form-control" id="lastName" placeholder="Mustermann"
              required>
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label" for="email">E-Mail-Adress</label>
          <input v-model="user.email" type="email" class="form-control" id="email" placeholder="max.muster@gmail.com"
            required>
        </div>
        <div>
          <label class="form-label" for="country">Country</label>
          <CountriesSelectAtom v-model="user.country" />
        </div>
        <div class="mb-2">
          <label class="form-label" for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="password" placeholder="********"
            minlength="8" required>
        </div>
        <div class="mb-2">
          <label class="form-label" for="confirm-password">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password"
            placeholder="********" minlength="8" required>
        </div>
        <br>
        <div class="form-actions">
          <button type="submit" class="form-control btn card-button">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/services/user/UserRegisterService";
import CountriesSelectAtom from "@/components/atoms/CountriesSelectAtom.vue";
import SalutationSelectAtom from "@/components/atoms/SalutationSelectAtom.vue";

export default {
  components: {SalutationSelectAtom, CountriesSelectAtom},
  data() {
    return {
      user: {
        salutation: 'none',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: 'none',
      },
      confirmPassword: '',
    };
  },
  methods: {
    async handleSubmit() {
      await registerUser(this.user, this.confirmPassword, this.$router).then((result) => {
        if (result) {
          this.goToLogin();
        }
      });
    },
    goToLogin() {
      setTimeout(() => {
        this.$router.push({
          name: "login",
        });
      }, 1500);
    },
  },
};
</script>