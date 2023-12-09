import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { createPinia } from 'pinia';
import {checkAuth} from "@/services/auth/SafetyGuard";

const app = createApp(App);
const pinia = createPinia();

// safety guard for routes
checkAuth();

app.use(router);
app.use(pinia);
app.mount('#app');
