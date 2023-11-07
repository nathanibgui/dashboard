import GestionUtilisateurs from './components/GestionUtilisateurs.vue'
// import WorkingsTime from './components/WorkingsTime.vue'
import RegisterForm from './components/User/RegisterForm.vue'
import infoUser  from './components/User/infoUser.vue';
// import Charts  from './components/Charts/Charts.vue';
import { createRouter, createWebHistory } from "vue-router"
const routes = [
    {
        path: '/',
        component: GestionUtilisateurs,
        name:'home',
        props: true,
    },
    // {
    //     path:'/WorkingsTime/:id',
    //     component:WorkingsTime ,
    //     props:true
    // },
    {
        path:'/register',
        name: 'register',
        component:RegisterForm ,
        props:true
    },
    {
        path: '/user/:id/show',
        name: 'infoUser',
        component: infoUser,
        props: true
    },
    // {
    //     path: '/Charts',
    //     name: 'Charts',
    //     component: Charts,
    //     props: true
    // },
    
      
]
const router = createRouter({
    history: createWebHistory(),

    routes
});


export default router ;