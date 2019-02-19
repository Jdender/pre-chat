<template>
    <div class="columns is-multiline">
        <button
            v-for="(pre, key) of premade"
            :key="key"
            @click="sendMessage(key)"

            class="button column has-text-centered
            has-text-black-bis is-size-5"
        >
            {{pre}}
        </button>

        <textarea
            v-model="workingMessage"
            @keyup.enter="sendMessage()"

            placeholder="Type a custom message..."
            class="textarea column"
        ></textarea>
    </div>
</template>

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

            const content = typeof index === 'number'
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
