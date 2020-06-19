<template>

    <div class="v-main-wrapper">
        <v-header />
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
    import vHeader from './layouts/v-header'
    //import vCatalog from './v-catalog'
    //import vCart from './v-cart'
    //import { mapGetters } from  'vuex'


    export default {
    name: 'v-main-wrapper',
    components: {
        vHeader,
        //vCatalog,
        //vCart,
    },
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
        margin: 0 auto;
    }
</style>