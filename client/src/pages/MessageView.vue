<template>
    <div>
        <router-link 
            to="send" 
            class="button is-fullwidth has-text-centered
            has-text-black-bis is-size-5"
        >
            Send message
        </router-link>

        <ApolloQuery
            :query="messages"
            :variables="{ 
                skip: 0,
                take: 30,
            }"
        >
            <template slot-scope="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading">Loading...</div>

                <!-- Error -->
                <div v-else-if="error">An error occured: {{error}}</div>

                <!-- Result -->
                <div v-else-if="data">
                    <ul>
                        <li 
                            v-for="msg of data.messages" 
                            :key="msg.id"
                        >
                            <div v-if="msg.author === $route.params.name">
                                <span class="has-text-black-bis is-size-5">
                                    {{msg.content}}
                                </span>
                                <span class="has-text-grey-darker is-size-5">
                                    « {{msg.author || 'Guest'}}
                                </span>
                            </div>

                            <div v-else>
                                <span class="has-text-grey-darker is-size-5">
                                    {{msg.author || 'Guest'}} » 
                                </span>
                                <span class="has-text-black-bis has-text-weight-bold is-size-5">
                                    {{msg.content}}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- No result -->
                <div v-else>No result</div>
            </template>

            <ApolloSubscribeToMore
                :document="newMessage"
                :updateQuery="onMessageAdded"
            />
        </ApolloQuery>

        <ApolloMutation
            :mutation="clearMessages"
        >
        <template slot-scope="{ mutate, loading, error }">
                <button 
                    :disabled="loading" 
                    @click="mutate()"

                    class="button is-fullwidth has-text-centered
                    has-text-black-bis is-size-5"
                >
                    Clear messages
                </button>

                <p v-if="error">An error occured: {{ error }}</p>
        </template>
        </ApolloMutation>
    <div>
</template>

<style scoped>
ul {
    list-style-type: none;
    width: 50%;
    margin: auto;
}

li {
    margin: 2%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import 'vue-router';
import 'vue-apollo';

declare const window: any;

export default Vue.extend({

    name: 'MessageView',
    
    data() {
        return {
            messages: gql`
                query($skip: Int!, $take: Int!) {
                    messages(skip: $skip, take: $take) {
                        id
                        content
                        author
                    }
                }
            `,

            newMessage: gql`
                subscription {
                    newMessage {
                        id
                        content
                        author
                    }
                }
            `,

            clearMessages: gql`
                mutation {
                    clearMessages
                }
            `,
        };
    },

    methods: {

        onMessageAdded(previousResult: any, { subscriptionData }: any) {

            // The previous result is immutable
            const newResult = {
                messages: [...previousResult.messages],
            };

            // Add the question to the list
            newResult.messages.unshift(subscriptionData.data.newMessage);

            return newResult;
        },
    },
    apollo: {
        $subscribe: {
            messagesCleared: {

                query: gql`
                    subscription {
                        messagesCleared
                    }
                `,

                result() {
                    window.location.reload(false);
                },
            },
        },
    },
});
</script>
