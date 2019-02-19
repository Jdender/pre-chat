import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import { client } from './graphql';
import Buefy from 'buefy';

Vue.use(VueApollo);
Vue.use(Buefy);

const apolloProvider = new VueApollo({
    defaultClient: client,
});

new Vue({
    el: '#app',
    render: h => h(App),
    apolloProvider,
});
