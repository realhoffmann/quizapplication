import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CategoryView from '../views/CategoryView.vue'
import QuizView from '../views/QuizView.vue'
import CreateQuizView from '../views/CreateQuizView.vue'
import RankingsView from '../views/RankingsView.vue'
import CreateQuestionView from '../views/CreateQuestionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView
  },
  {
    path: '/create-quiz',
    name: 'create-quiz',
    component: CreateQuizView
  },
  {
    path: '/rankings',
    name: 'rankings',
    component: RankingsView
  },
  {
    path: '/create-question',
    name: 'create-question',
    component: CreateQuestionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
