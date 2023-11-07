import { createApp } from 'vue'
import  router  from "./router";
import  '../src/assets/main.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons';




 createApp(App).use(router).mount('#app');
