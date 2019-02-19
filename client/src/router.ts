import VueRouter, { RouteConfig } from 'vue-router';
import MessageView from './pages/MessageView.vue';
import MessageSend from './pages/MessageSend.vue';

const routes: RouteConfig[] = [
    { path: '/view', component: MessageView },
    { path: '/send', component: MessageSend },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});
