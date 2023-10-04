<template>
    <div class="home">
      <h1>Let's Play!</h1>
    </div>
    <div>
      <div class="container">
        <h2>{{ JSON.stringify(quizData) }}</h2>
        <div v-if="request">
            {{ searchQuiz() }}
            <div v-for="(question) in quizData.questions" :key="question.id">
            <QuestionComponent
                :question="question.question"
                :answerA="question.answerOptions[0].answer.answer"
                :answerB="question.answerOptions[1].answer.answer"
                :answerC="question.answerOptions[2].answer.answer"
                :answerD="question.answerOptions[3].answer.answer"
            />
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import QuestionComponent from "@/components/QuestionComponent.vue";
  import axios from "axios";
  
  export default {
    name: "QuizView",
    data() {
        return {
            quizData: "",
        };
    },
    methods: {
        searchQuiz() {
            axios
                .get(`http://localhost:5000/api/quiz/${this.request}`)
                .then((response) => {
                    this.quizData = response.data;
                    })
                .catch((error) => {
                    console.log(error);
                    });
        }
    },
    props: {
      request: String,
    },
    components: {
      QuestionComponent,
    },
  };
  </script>
  