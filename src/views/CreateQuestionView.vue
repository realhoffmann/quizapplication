<template>
  <div class="home">
    <h1>Create Question & Answers</h1>
  </div>
  <div>
    <div v-for="index in questionComponentsCount" :key="index">
      <CreateQuestionComponent ref="questionComponents" />
    </div>
    <p>{{ getCategory }}</p>
    <button class="new-question-button" @click="addQuestion">Add Question</button>
    <button class="new-question-button" @click="submit">Submit Quiz</button>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CreateQuestionComponent from "@/components/CreateQuestionComponent.vue";
import { useAppStore } from "@/services/store/appStore";
import EndpointService from "@/services/server/EndpointService";

export default {
  components: {
    CreateQuestionComponent,
  },
  data() {
    return {
      questionComponentsCount: 1,
      quizQuestions: [], // To store questions and answers
    };
  },
  methods: {
    addQuestion() {
      this.questionComponentsCount++;
    },
    submit() {
      const questionComponents = this.$refs.questionComponents;
      this.quizQuestions = questionComponents.map((component) => component.getQuestionFromForm());

      const formQuiz = {
        creatorId: 1,
        category: this.getCategory,
        startDate: new Date().toLocaleDateString('en-CA'),
        duration: 30,
        questions: this.quizQuestions,
      };

      console.log(JSON.stringify(formQuiz));

      EndpointService.post("quizzes/createQuiz", formQuiz)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    getCategory() {
      const store = useAppStore();
      return store.getSelectedCategory()?.toUpperCase() || "";
    },
  },
};
</script>
