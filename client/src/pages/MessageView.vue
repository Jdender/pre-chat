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
                            <span class="has-text-grey-darker is-size-5">
                                {{msg.author || 'Guest'}} » 
                            </span>
                            <span class="has-text-black-bis has-text-weight-bold is-size-5">
                                {{msg.content}}
                            </span>
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
});
</script>
