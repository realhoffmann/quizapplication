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
import {handleError} from "@/services/MessageHandlerService";

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
      if(this.$refs.questionComponents.some((component) => component.getQuestionFromForm().question === "")) {
        handleError("Please fill in all questions");
        return;
      }

      if(this.$refs.questionComponents.some((component) => component.getQuestionFromForm().answerOptions.some(answer => answer.answer === ""))) {
        handleError("Please fill in all answers");
        return;
      }

      if(this.$refs.questionComponents.some((component) => component.getQuestionFromForm().answerOptions.every(answer => answer.correct === false))) {
        handleError("Please select at least one correct answer");
        return;
      }

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

      if(formQuiz.questions.some(question => question.question === "")) {
        handleError("Please fill in all questions");
        return;
      }

      if(formQuiz.questions.some(question => question.answerOptions.some(answer => answer.answer === ""))) {
        handleError("Please fill in all answers");
        return;
      }

      if(formQuiz.questions.some(question => question.answerOptions.every(answer => answer.correct === false))) {
        handleError("Please select at least one correct answer");
        return;
      }

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
