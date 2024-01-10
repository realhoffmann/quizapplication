<template>
  <div class="home">
    <h1>Welcome to QuizApp!</h1>
  </div>
  <div class="button-container justify-content-evenly">
    <router-link to="/search-quiz" v-slot="{ navigate }">
      <button @click="navigate" class="action-button" aria-label="Play a Quiz">Play</button>
    </router-link>
  </div><br>
  <div class="button-container justify-content-evenly">
    <router-link to="/create-quiz" v-slot="{ navigate }">
      <button @click="navigate" class="action-button" aria-label="Create a Quiz">Create Quiz</button>
    </router-link>
    <router-link to="/rankings" v-slot="{ navigate }">
      <button @click="navigate" class="action-button" aria-label="View Rankings">Rankings</button>
    </router-link>
  </div>
</template>
