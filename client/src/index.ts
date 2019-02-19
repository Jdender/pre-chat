import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import App from './App.vue';
import { apolloProvider } from './graphql';
import { router } from './router';

Vue.use(VueApollo);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App),
    apolloProvider,
    router,
});
