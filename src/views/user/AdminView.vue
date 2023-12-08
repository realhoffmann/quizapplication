<template>
    <div class="home">
        <h1>Admin Dashboard</h1>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="card searchForm">
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
                </div>
            </div>
        </div>

        <!-- User Profile Section -->
        <div v-if="searchFor === 'user'">

            <div class="user-container d-flex">
                <div class="user-card">
                    <div class="profile-header d-flex align-items-center">
                        <img src="../../assets/default-profile-pic.webp" alt="Profile Picture" class="profile-pic" />
                        <h1 class="auth-title">Profile</h1>
                    </div>
                    <form class="auth-form">
                        <div class="row mb-2">
                            <div class="from-group col-md-3">
                                <label class="form-label" for="salutation">Gender</label>
                                <SalutationSelectAtom />
                            </div>
                            <div class="col-md-4">
                                <label class="form-label" for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="Max" required>
                            </div>
                            <div class="col-md-5">
                                <label class="form-label" for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Mustermann" required>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label" for="email">E-Mail-Adress</label>
                            <input type="email" class="form-control" id="email" placeholder="max.muster@gmail.com" required>
                        </div>
                      <div>
                        <label class="form-label" for="country">Country</label>
                        <CountriesSelectAtom />
                      </div>

                        <div class="form-actions">
                            <button type="submit" class="btn card-button">Update Profile</button>
                          <button type="button" class="btn delete-button" @click="deleteAccount">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Quiz Section -->
        <div v-if="searchFor === 'quiz'">
            <div class="button-container justify-content-evenly">
                <div class="quiz-card d-flex flex-column justify-content-center align-items-center">
                    Quiz id
                    <div>
                        <button class="btn quiz-button">Play</button>
                        <button class="btn quiz-button">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CountriesSelectAtom from '@/components/atoms/CountriesSelectAtom.vue';
import EndpointService from "@/services/server/EndpointService";
import {handleError} from "@/services/MessageHandlerService";
import SalutationSelectAtom from "@/components/atoms/SalutationSelectAtom.vue";

export default {
  components: {
    SalutationSelectAtom,
    CountriesSelectAtom,
  },
    data() {
        return {
            searchFor: 'none',
            searchQuery: '',
            searchResults: [],
        };
    },
    methods: {
        search() {
            if (this.searchFor === 'user') {
                this.searchResults = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
            } else if (this.searchFor === 'quiz') {
                this.searchResults = [{ id: 1, title: 'General Knowledge Quiz' }];
            }
        },
      deleteAccount() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          EndpointService.delete(`users/${this.user.id}`)
              .then(response => {
                if (response.status === 200 || response.status === 204) {
                  console.log("Account deleted successfully.");
                  this.logout();
                } else {
                  handleError("Error deleting account.");
                }
              })
              .catch(error => {
                console.error("Error deleting account:", error);
                handleError("An error occurred while deleting the account.");
              });
        }
      },
    }
};
</script>
  