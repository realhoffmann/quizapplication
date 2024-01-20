<!-- ListUserView -->
<template>
  <div class="home">
    <h1>Users</h1>
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card searchForm col-md-5">
        <div class="card-body">
          <div class="input-group">
            <!-- Search Query -->
            <input type="text" class="form-control" placeholder="Search for users" aria-label="Search for users" v-model="searchQuery">
            <button class="btn search-button" @click="searchUsers">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button-container justify-content-evenly">
    <div v-for="user in filteredUserIds" :key="user.id">
      <button class="category-button" @click="goToUserView(user.id)">
        {{ user.id }}
        <br>
        {{ user.firstName }} {{ user.lastName }}
      </button>
    </div>
  </div>
  <div v-if="filteredUserIds.length === 0">
    <p>No Users can be found.</p>
  </div>
</template>

<script>
import EndpointService from "@/services/server/EndpointService";

export default {
  name: "ListUserView",
  /**
   * Data properties
   */
  data() {
    return {
      userIdsArray: [],
      selectedUserId: null,
      userIds: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredUserIds() {
      if (!this.userIdsArray || this.userIdsArray.length === 0) {
        return [];
      }

      const query = this.searchQuery.toLowerCase();
      return this.userIdsArray.filter((user) => {
        return Object.values(user).some((value) =>
            value ? value.toString().toLowerCase().includes(query) : false
        );
      });
    },
  },
  created() {
    this.loadUserIds();
  },
  methods: {
    /**
     * Navigates to the user view.
     */
    goToUserView(userId) {
      this.$router.push({ name: "admin", params: { userId: userId } });
    },
    /**
     * Loads all user ids.
     */
    loadUserIds() {
      EndpointService.get("users/all")
          .then((response) => {
            this.userIdsArray = response.data;
          })
          .catch((error) => {
            console.log("Error loading user ids" + error);
            this.userIdsArray = [];
          });
    },
    /**
     * Searches for users.
     */
    searchUsers() {
      this.loadUserIds();
    },
  },
};
</script>
