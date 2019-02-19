<template>
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
                        v-for="msg of data.messages.slice().reverse()" 
                        :key="msg.id"
                    >
                        {{msg.content}}
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
</template>

<style scoped>
ul {
    list-style-type: none;
    width: 50%;
    margin: auto;
}
</style>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';

export default Vue.extend({

    name: 'View',
    
    data() {
        return {
            messages: gql`
                query($skip: Int!, $take: Int!) {
                    messages(skip: $skip, take: $take) {
                        id
                        content
                    }
                }
            `,

            newMessage: gql`
                subscription {
                    newMessage {
                        id
                        content
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
            newResult.messages.push(subscriptionData.data.newMessage);

            return newResult;
        },
    },
});
</script>
