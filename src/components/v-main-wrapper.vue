<template>

    <div class="v-main-wrapper">
        <vCatalog></vCatalog>
        <vCart></vCart>
    </div>

</template>

<script>

    import vCatalog from './v-catalog'
    import vCart from './v-cart'

    export default {
    name: 'v-main-wrapper',
    components: {
        vCatalog,
        vCart,
    },
    props:{},
    data() {
        return{
            title: 'Main wr'
        }
    },
    computed: {},
    methods: {},
    watch: {},
    mounted() {
        console.log('hellow i done')
    },

    }
</script>

<style scoped>
    .v-main-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>