<template>
      <div class="home rankings-container">
        <h1>Admin Dashboard</h1>
        <div class="container d-flex justify-content-center align-items-center">
          <div class="card searchForm col-md-5" >
            <div class="card-body">
              <div class="admin-filter col-4 mb-3">
                <select class="form-control" v-model="searchFor">
                  <option value="none">Search for: -</option>
                  <option value="user">Search for: User</option>
                  <option value="quiz">Search for: Quiz</option>
                </select>
              </div>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search..." aria-label="Search"
                       v-model="searchQuery">
                <button class="btn search-button" @click="search">Search</button>
              </div>
                <div class="container d-flex justify-content-evenly">
                <button class="btn update-button" name="Search All Users" @click="searchAllUsers">Search All Users</button>
                <button class="btn update-button" name="Search All Quizzes" @click="searchAllQuizzes">Search All Quizzes</button>
              </div>
            </div>
          </div>
        </div>

    <div v-if="editQuizVisible">
      <div class="user-container d-flex">
        <div class="user-card col-md-5">
          <div>
            <h1 class="auth-title">Edit Quiz</h1>
          </div>
          <form class="auth-form" @submit.prevent="saveQuizChanges">
            <!-- Date Input -->
            <div class="mb-3">
              <label for="editQuizDate" class="form-label">Select Start Date</label>
              <input type="date" class="form-control" id="editQuizDate" v-model="quizToEdit.editQuizDate">
            </div>

            <!-- Duration Input -->
            <div class="mb-3">
              <label for="editQuizDuration" class="form-label">Enter Duration (in days)</label>
              <input type="number" class="form-control" id="editQuizDuration"
                     v-model="quizToEdit.editQuizDuration">
            </div>

            <div class="form-actions">
              <button type="submit" class="btn update-button">Save Changes</button>
              <button type="button" class="btn delete-button" @click="cancelEditQuiz">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- User Profile Section -->
    <div v-if="fetchedUser">
      <div class="user-container d-flex">
        <div class="user-card col-md-5">
          <div class="profile-header d-flex align-items-center">
            <img src="../../assets/default-profile-pic.webp" alt="Profile Picture" class="profile-pic"/>
            <h1 class="auth-title">Profile</h1>
          </div>
          <form class="auth-form" @submit.prevent="updateUserProfile">
            <div class="row mb-2">
              <div class="from-group col-md-3">
                <label class="form-label" for="salutation">Gender</label>
                <select class="form-control" id="salutation" name="salutation" v-model="fetchedUser.salutation">
                  <option value="none">-</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div class="col-md-9" v-if="fetchedUser.salutation === 'OTHER'">
                <label class="form-label" for="otherSalutationDetail">Please Specify</label>
                <input type="text" v-model="fetchedUser.otherSalutationDetail" class="form-control"
                       id="otherSalutationDetail" maxlength="30">
              </div>

              <div class="col-md-4">
                <label class="form-label" for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="fetchedUser.firstName" required>
              </div>
              <div class="col-md-5">
                <label class="form-label" for="lastName">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="fetchedUser.lastName" required>
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label" for="email">E-Mail-Adress</label>
              <input type="email" class="form-control" id="email" v-model="fetchedUser.email" required>
            </div>
            <div>
              <label class="form-label" for="country">Country</label>
              <select class="form-control" id="country" name="country" v-model="fetchedUser.country">
                <option value="AT">Austria</option>
                <option value="DE">Germany</option>
                <option value="CH">Switzerland</option>
                <option value="BE">Belgium</option>
                <option value="BG">Bulgaria</option>
                <option value="DK">Denmark</option>
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
            <div>
              <label class="form-label password-toggle" :class="{ open: showPasswordFields }" @click="togglePasswordDropdown">
                Change Password
              </label>
              <div v-if="showPasswordFields">
                <div class="mb-2">
                  <label class="form-label" for="password">New Password</label>
                  <input type="password"  class="form-control" id="password" placeholder="********" minlength="8" required>
                </div>
                <div class="mb-2">
                  <label class="form-label" for="confirm-password">Confirm New Password</label>
                  <input type="password" class="form-control" id="confirm-password" placeholder="********" minlength="8" required>
                </div>
              </div>
              <!-- role of user -->
              <div class="mb-2">
                <label class="form-label" for="role">Role</label>
                <select class="form-control" id="role" name="role" v-model="fetchedUser.role">
                  <option value="none">-</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>

            </div>

            <div class="form-actions">
              <button type="submit" class="btn card-button">Update Profile</button>
              <button type="button" class="btn delete-button" @click="deleteUser">Delete Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Quiz Section -->

      <div v-for="quiz in fetchedQuiz" :key="quiz.id">
         <div v-if="quiz" class="quiz-details">
          <div class="button-container justify-content-evenly">
            <div class="quiz-card d-flex flex-column justify-content-center align-items-center">
              {{ quiz.id }}
              <div>
                <button class="btn quiz-button" @click="editQuiz(quiz)"> Edit</button>
                <button class="btn delete-quiz-button" @click="deleteQuiz(quiz.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import EndpointService from "@/services/server/EndpointService";
import {handleError, handleSuccess} from "@/services/MessageHandlerService";

export default {
  name: "AdminView",
  props: {
    userId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      searchFor: 'none',
      searchQuery: "",
      quiz: "",
      user: "",
      fetchedQuiz: [],
      fetchedUser: null,
      showPasswordFields: false,
      editQuizVisible: false,
      quizToEdit: null,
      updateQuizData: {
        startDate: "",
        duration: 0,
      },
    };
  },
  created() {
    if (this.userId) {
      this.searchQuery = this.userId;
      this.searchFor = 'user';
      this.search();
    }
  },
  methods: {
    togglePasswordDropdown() {
      this.showPasswordFields = !this.showPasswordFields;
    },
    search() {
      this.fetchedUser = null;
      this.fetchedQuiz = [];
      this.editQuizVisible = false;

      if (this.searchFor === 'quiz') {
        this.searchQuiz();
      } else if (this.searchFor === 'user') {
        this.searchUser();
      }
    },
    searchQuiz() {
      EndpointService.get(`quizzes/${this.searchQuery}`)
          .then((response) => {
            if (response.status === 200) {
              this.fetchedQuiz = [response.data];
              console.log(this.fetchedQuiz);
            } else {
              handleError("Quiz does not exist.");
            }
          })
          .catch((error) => {
            console.error("Error while fetching quiz:", error);
            handleError("Quiz does not exist.");
          });
    },
    searchAllUsers() {
      this.$router.push({ name: "listUsers" });
    },
    searchAllQuizzes() {
      this.fetchedUser = null;
      this.fetchedQuiz = [];
      this.editQuizVisible = false;

      EndpointService.get(`quizzes/all`)
          .then((response) => {
            if (response.status === 200) {
              this.searchFor = 'quiz';
              for (let i = 0; i < response.data.length; i++) {
                this.fetchedQuiz.push(response.data[i]);
              }
            }
          })
          .catch((error) => {
            console.error("Error while fetching quizzes by category:", error);
            handleError("An error occurred while fetching quizzes ");
          });
    },
    deleteQuiz(quizId) {
      EndpointService.delete(`quizzes/${quizId}`)
          .then(response => {
            if (response.status === 200 || response.status === 204) {
              console.log('Quiz deleted successfully');
              handleSuccess("Quiz deleted successfully");
            } else {
              handleError('Failed to delete quiz.');
            }
          })
          .catch(error => {
            console.error('Error while deleting quiz:', error);
            handleError('An error occurred while deleting the quiz.');
          });
    },

    updateUserProfile() {
      if (this.fetchedUser.password !== this.fetchedUser.confirmPassword) {
        handleError('Passwords do not match.');
        return;
      }

      const payload = {
        ...this.fetchedUser,
        ...(this.fetchedUser.salutation === 'OTHER' && {otherSalutationDetail: this.fetchedUser.otherSalutationDetail}),
      };

      if (this.showPasswordFields) {
        payload.password = this.fetchedUser.password;
      }

      const data = {
        file: null,
        user: payload,
      };

      EndpointService.put(`users/${this.fetchedUser.id}`, data)
          .then(response => {
            if (response.status === 200) {
              handleSuccess("User has been updated successfully");
              console.log('User profile updated successfully.');
              this.fetchedUser = {...this.fetchedUser, ...response.data};
            } else {
              handleError('Failed to update user profile.');
            }
          })
          .catch(error => {
            console.error('Error while updating user profile:', error);
            handleError('An error occurred while updating the user profile.');
          });
    },
    searchUser() {
      EndpointService.get(`users/${(this.searchQuery)}`)
          .then(response => {
            if (response.status === 200) {
              this.fetchedUser = response.data;
              console.log(this.fetchedUser);
            } else {
              handleError("User does not exist.");
            }
          })
          .catch(error => {
            console.error("Error while fetching user:", error);
            handleError("User does not exist.");
          });
    },
    deleteUser() {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      EndpointService.delete(`users/${this.fetchedUser.id}`)
          .then(response => {
            if (response.status === 200 || response.status === 204) {
              handleSuccess("User has been deleted");
              console.log('User deleted successfully');
            } else {
              handleError('Failed to delete user.');
            }
          })
          .catch(error => {
            console.error('Error while deleting user:', error);
            handleError('An error occurred while deleting the user.');
          });
      }
    },
    editQuiz(quiz) {
      console.log("edit quiz");
      this.editQuizVisible = true;
      this.quizToEdit = quiz;
      console.log("edit quiz visible: " + this.editQuizVisible);
    },
    cancelEditQuiz() {
      this.editQuizVisible = false;
    },
    saveQuizChanges() {
      // Validate and save quiz changes
      if (this.validateQuiz()) {
        const quizId = this.quizToEdit.id;

        this.updateQuizData.startDate = this.quizToEdit.editQuizDate;
        this.updateQuizData.duration = this.quizToEdit.editQuizDuration;

        // Continue with your save logic...
        EndpointService.put(`quizzes/${quizId}/startDate/${this.updateQuizData.startDate}/duration/${this.updateQuizData.duration}`)

            .then((response) => {
              if (response.status === 200) {
                console.log('Quiz updated successfully');
                handleSuccess("Quiz updated successfully");
                this.cancelEditQuiz();
              } else {
                handleError('Failed to update quiz.');
              }
            })
            .catch((error) => {
              console.error('Error while updating quiz:', error);
              handleError('An error occurred while updating the quiz.');
            });
      }
    },

    validateQuiz() {
      if (this.fetchedQuiz.editQuizDate === "") {
        handleError("Please select a date");
        return false;
      }

      if (this.fetchedQuiz.editQuizDuration === "") {
        handleError("Please enter a duration");
        return false;
      }

      let today = new Date();
      let startDate = new Date(this.fetchedQuiz.editQuizDate);
      if (startDate > today) {
        handleError("Start date should not be in the future");
        return false;
      }

      return true;
    },

  }
};
</script>

