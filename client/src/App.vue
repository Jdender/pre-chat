<template>
    <div>
        <input 
            type="text"
            @keyup.enter="sendWorkingMessage"
            v-model="workingMessage"
        />
        <ul>
            <li v-for="(msg, key) of messages" :key="key">{{msg}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

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
            messages: [
                'test',
                'one',
                'two',
                'three',
            ]
        };
    },

    methods: {

        sendWorkingMessage() {

            this.sendMessage(this.workingMessage);

            this.workingMessage = '';
        },

        sendPreMessage() {

        },

        sendMessage(content: string) {
            this.messages.push(content);
        }
    },
});
</script>
