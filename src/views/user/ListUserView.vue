<template>
  <div class="home">
      <h1>Users</h1>
    </div>
    <div class="button-container justify-content-evenly">
      <div v-for="user in userIdsArray" :key="user">
        <button class="category-button" @click="goToUserView(user.id)">
          {{ user.id }}
          <br>
          {{ user.firstName }} {{ user.lastName }}
        </button>
      </div>
    </div>
    <div v-if="userIdsArray.length === 0">
      <p>No Users can be found.</p>
  </div>
</template>

<script>

import EndpointService from "@/services/server/EndpointService";

export default {
  name: "ListUserView",
  data() {
    return {
      userIdsArray: [],
      selectedUserId: null,
      userIds: null,
    };
  },
  created() {
      this.loadUserIds();
  },
  methods: {
    goToUserView(userId) {
      this.$router.push({ name: "user", params: { userId: userId } });
    },
    loadUserIds() {
      EndpointService.get("users/all").then((response) => {
        this.userIdsArray = response.data;
      }).catch((error) => {
        console.log("Error loading user ids"+ error);
        this.userIdsArray = [];
      });
    },
  },
};
</script>