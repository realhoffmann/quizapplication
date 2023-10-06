<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div id="error-message" class="alert alert-danger text-center d-none">
          <h1>Error</h1>
          <p>Quiz does not exist.</p>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search for a quiz" v-model="searchQuery" />
        </div>
        <div class="input-group-append">
          <button class="btn btn-primary" @click="searchQuiz">Search</button>
        </div>
      </div>
    </div>

    <CategoryComponent />

    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Quiz Details</h5>
              <ul>
                <li>
                  <strong>Category:</strong> {{ quiz.category }}
                </li>
                <li>
                  <strong>Start Date:</strong> {{ quiz.startDate }}
                </li>
                <li>
                  <strong>Duration:</strong> {{ quiz.duration }}
                </li>
              </ul>
              <h5 class="mt-3">Questions</h5>
              <ul v-for="(question, index) in quiz.questions" :key="question.id">
                <li>
                  <h6>{{ 'Question ' + (index + 1) + ': ' + question.question }}</h6>
                  <ul>
                    <li v-for="(option) in question.answerOptions" :key="option.id">
                      <input type="radio" :id="'q' + question.id + 'o' + option.id" :name="'question_' + question.id">
                      <label :for="'q' + question.id + 'o' + option.id">{{ option.answer.answer }}</label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryComponent from "@/components/organisms/CategoryComponentOrganism.vue";
import axios from "axios";

export default {
  name: "SearchQuizView",
  data() {
    return {
      searchQuery: "",
      quiz: "",
    };
  },
  methods: {
    searchQuiz() {
      axios
        .get(`http://localhost:5000/api/quiz/${this.searchQuery}`)
        .then((response) => {
          this.quiz = response.data;
          console.log(this.quiz)
          this.goToQuiz("http://localhost:5000/api/quiz/${this.searchQuery}");
        })
        .catch((error) => {
          console.error("Error while fetching quiz:", error);
          document.getElementById('error-message').classList.remove('d-none');
          //TO-DO: wenn man nicht mehr auf der view ist, dann keine getElementById fuehren
          setTimeout(() => {
            document.getElementById('error-message').classList.add('d-none');
          }, 3000);
        });
    },
    goToQuiz(quizData) {
      this.$router.push({ name: "quiz", params: { quizData: quizData } });
    },
  },
  components: { CategoryComponent }
};
</script>

  