<!-- Register View -->
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Register</h1>
      <!-- Register Form -->
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="row mb-2">
          <!-- Salutation -->
          <div class="from-group col-md-3">
            <label class="form-label" for="salutation">Gender</label>
            <SalutationSelectAtom  v-model="user.salutation"/>
          </div>
          <!-- "Other" Salutation -->
          <div v-if="user.salutation === 'OTHER'" class="col-md-9">
            <label class="form-label" for="otherSalutationDetail">Please Specify</label>
            <input v-model="user.otherSalutationDetail" type="text" class="form-control" id="otherSalutationDetail" placeholder="Specify your salutation/gender" maxlength="30">
          </div>
          <!-- First Name -->
          <div class="col-md-4">
            <label class="form-label" for="firstName">First Name</label>
            <input v-model="user.firstName" type="text" class="form-control" id="firstName" placeholder="Max">
          </div>
          <!-- Last Name -->
          <div class="col-md-5">
            <label class="form-label" for="lastName">Last Name</label>
            <input v-model="user.lastName" type="text" class="form-control" id="lastName" placeholder="Mustermann">
          </div>
        </div>
        <!-- E-Mail -->
        <div class="mb-2">
          <label class="form-label" for="email">E-Mail-Adress</label>
          <input v-model="user.email" type="email" class="form-control" id="email" placeholder="max.muster@gmail.com">
        </div>
        <div>
          <!-- Country -->
          <label class="form-label" for="country">Country</label>
          <CountriesSelectAtom v-model="user.country" />
        </div>
        <!-- Password -->
        <div class="mb-2">
          <label class="form-label" for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="password" placeholder="********">
        </div>
        <!-- Confirm Password -->
        <div class="mb-2">
          <label class="form-label" for="confirm-password">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password"
            placeholder="********" minlength="8">
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
  /**
   * Data properties
   */
  data() {
    return {
      user: {
        salutation: 'none',
        otherSalutationDetail: '',
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
    /**
     * Handles submit of the form
     */
    async handleSubmit() {
      console.log("Registering user:", this.user);
      await registerUser(this.user, this.confirmPassword, this.$router).then((result) => {
        if (result) {
          this.goToLogin();
        }
      });
    },
    /**
     * Redirects to the login page
     */
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