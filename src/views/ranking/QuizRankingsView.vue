<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card searchForm">
      <div class="card-body">
        <div class="row">
          <div class="col-9">
            <input type="text" class="form-control" placeholder="Search for a quiz" v-model="searchQuery" />
          </div>
          <div class="col-3">
            <button class="btn btn-primary search-button" @click="searchQuizOnInputChange">Search</button>
          </div>
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
