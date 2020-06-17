<template>

    <div class="v-main-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!--<vCatalog />
        <vCart
                v-if="CART.length"
                :cart_data="CART "
        />-->
    </div>

</template>

<script>

    //import vCatalog from './v-catalog'
    //import vCart from './v-cart'
    //import { mapGetters } from  'vuex'


    export default {
    name: 'v-main-wrapper',
    /*components: {
        vCatalog,
        vCart,
    },*/
    props:{},
    data() {
        return{
            title: 'Main wr'
        }
    },
    computed: {
        /*...mapGetters([
            'CART',
        ])*/
    },
    methods: {},
    watch: {},


    }
</script>

<style scoped>
    .v-main-wrapper   {
        max-width: 900px;
        margin: 0 auto;
    }
</style>