import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { createPinia } from 'pinia';
import { useAppStore } from '@/services/store/appStore';
import {handleError} from "@/services/MessageHandlerService";

const app = createApp(App);
const pinia = createPinia();

router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.getLoggedIn()) {
        next({ name: 'login' });
        handleError("You must be logged in to see this page.");
    } else {
        next();
    }
});

app.use(router);
app.use(pinia);
app.mount('#app');
