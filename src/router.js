import HomePageVue from './components/HomePage.vue';
import LoginFormVue from './components/User/LoginForm.vue';
// import WorkingsTime from './components/WorkingsTime.vue'
import RegisterForm from './components/User/RegisterForm.vue'
import infoUser  from './components/User/infoUser.vue';
import profileUser  from './components/User/profileUser.vue';
// import Charts  from './components/Charts/Charts.vue';
import { createRouter, createWebHistory } from "vue-router"
const routes = [
    {
        path: '/',
        component: HomePageVue,
        name:'home',
        props: true,
    },
    {
        path: '/login',
        component: LoginFormVue,
        name:'login',
        props: true,
    },
    {
        path:'/register',
        name: 'register',
        component:RegisterForm ,
        props:true
    },
    {
        path: '/user/:id/show/',
        name: 'infoUser',
        component: infoUser,
        props: true,
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: profileUser,
                props: true
            }
        ]
    },
    

      
]
const router = createRouter({
    history: createWebHistory(),

    routes
});


export default router ;