<!-- QuizRankingsView -->
<template>
  <div class="home">
    <h1>Rankings</h1>
  </div>
  <!-- Search Form -->
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card searchForm">
      <div class="card-body">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for quizzes" aria-label="Search for quizzes"
            v-model="searchQuery">
          <button class="btn search-button" @click="searchQuiz">Search</button>
        </div>
      </div>
    </div>
  </div>
  <rankings-molecule :key="quizId" :quizId="quizId"></rankings-molecule>
</template>

<script>
import RankingsMolecule from "@/components/molecules/RankingsMolecule.vue";
import { useAppStore } from "@/services/store/appStore";
import EndpointService from "@/services/server/EndpointService";
import { handleError, handleSuccess } from "@/services/MessageHandlerService";

export default {
  components: {
    RankingsMolecule,
  },
  methods: {
    /**
     * Searches for a quiz with the given id.
     */
    searchQuiz() {
      EndpointService.get(`quizzes/${this.searchQuery}/participants`)
        .then((response) => {
          if (response.status === 200) {
            this.quizId = this.searchQuery;
            handleSuccess("Quiz found. Rankings are displayed below.");
          } else {
            handleError("Quiz does not exist.");
          }
        })
        .catch((error) => {
          console.error("Error while fetching quiz:", error);
          handleError("An error occurred while fetching the quiz.");
        });
    },
    searchQuizOnInputChange() {
      if (this.isValidNumber(this.searchQuery)) {
        this.searchQuiz();
      }
    },
    /**
     * Checks if the given value is a valid number.
     */
    isValidNumber(value) {
      return !isNaN(value);
    },
  },
  data() {
    const store = useAppStore();
    return {
      quizId: store.getRequestId(),
      searchQuery: "",
    };
  },
};
</script>
