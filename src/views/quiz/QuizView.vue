<!-- QuizView -->
<template>
  <div class="home">
    <h1>Let's Play!</h1>
  </div>
  <!-- Points Badge-->
  <div class="points">
    <p class="badge rounded-pill">{{ points }} Points</p>
  </div>
  <!-- Quiz -->
  <div v-if="quizData !== null">
    <div :key="currentQuestion.id">
      <QuestionComponent :question="currentQuestion.question"
        :answerA="currentQuestion.answerOptions[0] == null ? {} : currentQuestion.answerOptions[0]"
        :answerB="currentQuestion.answerOptions[1] == null ? {} : currentQuestion.answerOptions[1]"
        :answerC="currentQuestion.answerOptions[2] == null ? {} : currentQuestion.answerOptions[2]"
        :answerD="currentQuestion.answerOptions[3] == null ? {} : currentQuestion.answerOptions[3]"
        @answer-clicked="handleAnswerClicked" />
    </div>
  </div>
  <div v-else>
    <p>Quiz is loading...</p>
  </div>
</template>

<script>
import QuestionComponent from "@/components/QuestionComponent.vue";
import EndpointService from "@/services/server/EndpointService";
import { useAppStore } from "@/services/store/appStore";

export default {
  name: "QuizView",
  data() {
    return {
      quizData: null,
      currentQuestionIndex: 0,
      timer: 15,
      points: 0,
      timerInterval: null,
      quizStartTime: null,
      playing: true,
    };
  },
  computed: {
    /**
     * Returns the current question.
     */
    currentQuestion() {
      return this.quizData.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    /**
     * Searches for a quiz with the given id and calls the startTimer function.
     */
    searchQuiz(quizId) {
      this.quizStartTime = Date.now();
      EndpointService.get(`quizzes/${quizId}`)
        .then((response) => {
          this.quizData = response.data;
          this.startTimer();
        })
        .catch((error) => {
          console.log(error);
          this.quizData = { questions: [] };
        });
    },
    /**
     * Navigates to the next question.
     */
    nextQuestion() {
      if (this.currentQuestionIndex < this.quizData.questions.length - 1) {
        this.currentQuestionIndex++;
        this.resetTimer();
      } else if (this.playing) {

        const quizEndTime = Date.now();
        const quizDuration = (quizEndTime - this.quizStartTime) / 1000;

        const store = useAppStore();

        store.setQuizDuration(quizDuration);
        store.setPoints(this.points);
        store.setRequestId(this.requestId);
        store.setSelectedCategory(this.quizData.category);

        const participant = {
          nickname: store.getNickname(),
          points: store.getPoints(),
          participantQuizDuration: store.getQuizDuration(),
        };

        EndpointService.post(`quizzes/${this.requestId}/addParticipant`, participant)
          .then((response) => {
            console.log(store.getNickname() + " has finished the quiz. (points: " + this.points + ")" + " (requestId: " + this.requestId + ")");
            console.log(response);

            this.$router.push({
              name: "rankings",
            });
          })
          .catch((error) => {
            console.log(error);
          });


        console.log("End of quiz reached. Redirecting to rankings. (points: " + this.points + ")" + " (requestId: " + this.requestId + "))");

        this.quizStartTime = null;
        this.playing = false;

        setTimeout(() => {
          this.points = 0;
        }, 1000);
      }
    },
    /**
     * Starts the timer.
     */
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.nextQuestion();
        }
      }, 1000);
    },
    /**
     * Resets the timer.
     */
    resetTimer() {
      clearInterval(this.timerInterval);
      this.timer = 15;
      this.startTimer();
    },
    /**
     * Handles the answer clicked event.
     */
    handleAnswerClicked(answerInfo) {
      console.log(answerInfo);
      if (answerInfo.isCorrect) {
        console.log("Correct answer!");
        this.points = this.points + 150 + (this.timer * 10);
        this.nextQuestion();
      } else {
        console.log("Wrong answer!");
        this.points += 0;
        this.nextQuestion();
      }
    },
  },
  props: {
    requestId: {
      type: String,
      required: true,
    },
  },
  components: {
    QuestionComponent,
  },
  mounted() {
    console.log(this.requestId);

    this.playing = true;
    this.searchQuiz(this.requestId);
  },
};
</script>
