<template>
    <router-view></router-view>
</template>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

html, body {
    margin: 0;
    width: 100%;
    height: 100%;

    background-color: hsl(0, 0%, 86%);   
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
});
</script>
