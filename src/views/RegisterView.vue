<template>
    <div class="d-flex justify-content-center">
        <div class="card registerForm login-card">
            <div class="card-body">
                <div id="success-message" class="alert alert-success text-center d-none">
                    <h1>Success</h1>
                    <p>User has been created successfully</p>
                </div>
                <h2 class="card-title text-center">Register</h2>
                <form>
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <label for="salutation">Salutation</label>
                            <select class="form-control" id="salutation" name="salutation">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="col-md-5">
                            <label for="firstName">First Name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="Max">
                        </div>
                        <div class="col-md-5">
                            <label for="lastName">Last Name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Mustermann">
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="email">E-Mail-Adress</label>
                        <input type="email" class="form-control" id="email" placeholder="max.muster@gmail.com">
                    </div>
                    <div>
                        <label for="country">Country</label>
                        <select class="form-control" id="country" name="country">
                            <option value="none">-</option>
                            <option value="AT">Austria</option>
                            <option value="BE">Belgium</option>
                            <option value="BG">Bulgaria</option>
                            <option value="DK">Denmark</option>
                            <option value="DE">Germany</option>
                            <option value="EE">Estonia</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="GR">Greece</option>
                            <option value="IE">Ireland</option>
                            <option value="IT">Italy</option>
                            <option value="LV">Latvia</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="MT">Malta</option>
                            <option value="NL">Netherlands</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="RO">Romania</option>
                            <option value="SE">Sweden</option>
                            <option value="SK">Slovakia</option>
                            <option value="SI">Slovenia</option>
                            <option value="ES">Spain</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="HU">Hungary</option>
                            <option value="GB">Great Britain</option>
                            <option value="CY">Cyprus</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="********" minlength="8">
                    </div>
                    <div class="mb-2">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" class="form-control" id="confirm-password" placeholder="********"
                            minlength="8">
                    </div>
                    <br>
                    <div class="mb-2 button-container justify-content-evenly">
                        <button type="submit" class="btn btn-primary card-button">Register</button>
                        <button type="button" class="btn btn-primary card-button"
                            onclick="location.href='login.html'">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { registerUser } from '../services/register.js';

export default {
  methods: {
    registerUser() {
      const formData = {
        salutation: document.getElementById('salutation').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value,
      };

      registerUser(formData)
        .then((response) => {
          console.log('User registered successfully:', response.data);

          document.getElementById('success-message').classList.remove('d-none');
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    },

    redirectToLoginPage() {
      this.$router.push('/login');
    },
  },
};
</script>