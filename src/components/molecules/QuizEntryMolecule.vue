<template>
  <div class="home">
    <h1>Enter a Nickname</h1>
  </div>
  <div class="container rankings-container d-flex justify-content-center align-items-center">
    <div class="card searchForm">
      <div class="card-body">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Nickname" v-model="nickname" @input="clearErrorMessage" />
        </div>
        <div class="button-container justify-content-evenly">
          <button class="btn btn-primary card-button" @click="startQuiz">Start Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleError } from "@/services/MessageHandlerService";

export default {
  data() {
    return {
      nickname: '',
      errorMessage: '',
    };
  },
  methods: {
    clearErrorMessage() {
      this.errorMessage = '';
    },
    startQuiz() {
      if (this.nickname.trim() === '') {
        handleError('Please enter a nickname')
      } else {
        this.$emit('start-quiz', this.nickname);
      }
    },
  },
};
</script>
