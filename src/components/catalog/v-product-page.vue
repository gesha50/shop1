<template>
    <div class="v-product-page">
        <img v-if="product.image" class="v-catalog-item__img" :src=" require('../../img/' + product.image ) " alt="img">
        <p>Product name: {{product.name}}</p>
        <p>Article: {{product.article}}</p>
        <p>Price: {{product.price | toFix | formattedPrice}}</p>
        <button class="btn v-catalog-item__button" @click="addToCart">add to cart</button>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import toFix from "@/filters/toFix";
    import formattedPrice from "@/filters/price-format";

    export default {
        name: "v-product-page",
        props:{

        },
        data(){
            return{}
        },
        filters:{
            formattedPrice,
            toFix,
        },
        methods:{
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(){
                this.ADD_TO_CART(this.product)
                   /* .then(()=>{
                        let timeStamp = Date.now().toLocaleString()
                        this.messages.unshift(
                            { name: 'Товар добавлен в Корзину!', icon: 'check_circle', id: timeStamp}
                        )
                    })*/
            },
        },
        computed:{
            ...mapGetters([
                'PRODUCTS'
            ]),
            product(){
                let result = {}
                let vm = this
                this.PRODUCTS.map(function (item) {
                    if (item.article === vm.$route.query.product){
                        result = item
                    }
                })
                return result
            }
        },
        mounted(){
            this.GET_PRODUCTS_FROM_API()
        }
    }
</script>

<style scoped>

</style>