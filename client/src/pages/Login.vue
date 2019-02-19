<template>
    <div class="all">
        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input 
                    class="input" 
                    type="text" 
                    placeholder="Enter your name..."
                    v-model="username"
                />
            </div>
        </div>

        <div class="field">
            <label class="label">Channel Code</label>
            <div class="control">
                <input 
                    class="input" 
                    type="text" 
                    disabled 
                    value="Not implemented yet" 
                    v-model="code"
                />
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button 
                    class="button is-link"
                    @click="connect"
                >
                    Connect
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.all {
height: 100vh;
padding: 0;
display: flex;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
}
</style>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Login',

    data() {
        return {
            username: '',
            code: '',
        };
    },

    methods: {

        connect() {

            const name = encodeURIComponent(this.username);

            this.$router.push(`/${name}/view`);
        },
    },
});
</script>
