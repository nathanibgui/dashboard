import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import GestionUtilisateurs from './components/GestionUtilisateurs.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/users/:city',
            component: GestionUtilisateurs,
            props: true,
        },
    ],
});

app.use(router);
app.mount('#app');


