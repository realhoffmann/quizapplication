<template>
  <div class="home">
    <h1>Welcome to QuizApp!</h1>

  </div>
  <div class="button-container justify-content-evenly">
    <router-link to="/category" v-slot="{ navigate }">
      <button @click="navigate" class="action-button">Play</button>
    </router-link>
  </div><br>
  <div class="button-container justify-content-evenly">
    <router-link to="/register" v-slot="{ navigate }">
      <button @click="navigate" class="action-button">Create Game</button>
    </router-link>
    <router-link to="/register" v-slot="{ navigate }">
      <button @click="navigate" class="action-button">Rankings</button>
    </router-link>
  </div>
</template>

