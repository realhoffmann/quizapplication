<!-- LobbyView -->
<template>
  <!-- QuizEntryMolecule -->
  <div v-if="showQuizEntry">
    <QuizEntryMolecule @start-quiz="startQuiz" />
  </div>
  <div v-else>
    <div class="home">
      <h1>Select a Quiz</h1>
    </div>
    <div class="rankings-container justify-content-evenly">
      <div v-for="quizId in quizIdsArray" :key="quizId">
        <button class="category-button" @click="showQuizEntryView(quizId)" :class="{ 'expired': isQuizExpired(quizId) }"
          :style="getButtonStyle(quizStartDates[quizId], quizDurations[quizId])"
          :disabled="isQuizExpired(quizId) || quizStartDates[quizId] === 'Loading...'">
          {{ quizId }}
          <br>
          {{ getFormattedStartDate(quizStartDates[quizId]) }}
        </button>
      </div>
    </div>
    <div v-if="quizIdsArray.length === 0">
      <p>No quizzes available for this category.</p>
    </div>
  </div>
</template>

<script>
import {
  getButtonStyle,
  getFormattedStartDate,
  isQuizExpired,
  loadQuizDurations,
  loadQuizStartDates,
  startQuiz
} from "@/services/quiz/QuizLobbyService";
import QuizEntryMolecule from "@/components/molecules/QuizEntryMolecule.vue";
import { useAppStore } from "@/services/store/appStore";

export default {
  name: "LobbyView",
  props: ["quizIds"],
  components: {
    QuizEntryMolecule,
  },
  data() {
    return {
      quizIdsArray: [],
      quizStartDates: {},
      quizDurations: {},
      showQuizEntry: false,
      selectedQuizId: null,
    };
  },
  created() {
    if (this.quizIds) {
      this.quizIdsArray = this.quizIds.split(",");
      this.loadQuizStartDates();
      this.loadQuizDurations();
    }
  },
  methods: {
    /**
     * Loads the quiz start dates.
     */
    async loadQuizStartDates() {
      this.quizStartDates = loadQuizStartDates(this.quizIdsArray).then((result) => {
        this.quizStartDates = result;
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
     * Loads the quiz durations.
     */
    async loadQuizDurations() {
      this.quizDurations = loadQuizDurations(this.quizIdsArray).then((result) => {
        this.quizDurations = result;
        console.log("Quiz durations: " + this.quizDurations);
      }).catch((error) => {
        console.log(error);
      });
    },
    /**
     * Checks if the quiz with the given id is expired.
     */
    isQuizExpired(quizId) {
      return isQuizExpired(this.quizStartDates, quizId);
    },
    /**
     * Shows the quiz entry view.
     */
    showQuizEntryView(quizId) {
      this.selectedQuizId = quizId;
      this.showQuizEntry = true;
    },
    /**
     * Starts the quiz.
     */
    startQuiz(nickname) {
      this.showQuizEntry = false;
      const store = useAppStore();
      store.setNickname(nickname);
      startQuiz(this.$router, this.isQuizExpired, this.selectedQuizId);
    },
    /**
     * Returns the button style.
     */
    getButtonStyle(startDate, duration) {
      return getButtonStyle(startDate, duration);
    },
    /**
     * Returns the formatted start date.
     */
    getFormattedStartDate(startDate) {
      console.log("getFormattedStartDate: " + startDate);
      return getFormattedStartDate(startDate);
    },
  },
};
</script>