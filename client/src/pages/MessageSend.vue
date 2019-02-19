<template>
    <div>
        <input
            type="button"
            v-for="(pre, key) of premade"
            :value="pre"
            :key="key"
            @click="sendMessage(key)"
        >
        <input 
            type="text"
            v-model="workingMessage"
            @keyup.enter="sendMessage()"
        />
    </div>
</template>

<style scoped>
input {
    padding: 1%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import 'vue-apollo';
import 'vue-router';

export default Vue.extend({

    name: 'MessageSend',

    data() {
        return {
            workingMessage: '',
            premade: [
                'Can you turn down the Piano?',
                'Can you turn up the Piano?',
                'Can you turn down the Drums?',
                'Can you turn up the Drums?',
                'The Bass is too loud.',
                'The Bass is too quiet.',
                'The Vocals are too loud.',
                'The Vocals are too soft.',
            ],
        };
    },

    methods: {

        sendMessage(index?: number) {

            const content = index
            ? this.premade[index]
            : this.workingMessage;

            if (!content || content.length === 0) return;

            this.$apollo.mutate({
                mutation: gql`
                    mutation($data: MessageSendInput!) {
                        sendMessage(data: $data) {
                            id
                            content
                        }
                    }
                `,
                variables: {
                    data: {
                        content,
                    },
                },
            });

            this.workingMessage = '';

            this.$router.push('/view');
        },
    },
});
</script>
