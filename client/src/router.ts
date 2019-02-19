import VueRouter, { RouteConfig } from 'vue-router';
import MessageView from './pages/MessageView.vue';
import MessageSend from './pages/MessageSend.vue';
import Login from './pages/Login.vue';

const routes: RouteConfig[] = [
    { path: '/login', component: Login },
    { path: '/:name/view', component: MessageView },
    { path: '/:name/send', component: MessageSend },
    { path: '*', redirect: '/login' },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});
