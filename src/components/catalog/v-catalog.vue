<template>
    <div class="v-catalog">
        <v-select
            :options="categories"
            @select="sortByCategories"
            :selected="selected"
            :is-expended="IS_DESKTOP"
        />
        <p>Selected option:{{selected}}</p>
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart">CART: {{CART.length}}</div>
        </router-link>
        <h1>Catalog</h1>
        <div class="v-catalog__list">
            <vCatalogItem
            v-for="product in filteredProducts"
            :key="product.article"
            :product_data="product"
            @addToCart="addToCart"
            />

        </div>
    </div>
</template>

<script>
    import vCatalogItem from './v-catalog-item'
    import vSelect from './v-select'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: "v-catalog",
        components:{
            vCatalogItem,
            vSelect,
        },
        data() {
            return {
                categories: [
                    {name: 'Все', value: 'ALL'},
                    {name: 'мужские', value: 'M'},
                    {name: 'женские', value: 'Ж'},
                ],
                selected: 'Все',
                sortedProducts: [],
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                "CART",
                'IS_MOBILE',
                'IS_DESKTOP',
            ]),
            filteredProducts(){
                if(this.sortedProducts.length){
                    return this.sortedProducts
                } else {
                    return this.PRODUCTS
                }
            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART',
            ]),
            addToCart(data){
                this.ADD_TO_CART(data)
            },
            sortByCategories(category){
                this.sortedProducts = []
                let vm = this
                this.PRODUCTS.map(function (item) {
                    if (item.category === category.name){
                        vm.sortedProducts.push(item)
                    }
                })
                this.selected = category.name
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then((res) => {
                if(res.data) {
                    console.log('Data arrived')
                }
            })
        }
    }
</script>

<style lang="scss">
    .v-catalog {
        &__list {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             align-items: center;
         }
        &__link_to_cart {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: $padding*2;
            border: 1px solid #aeaeae;
        }
    }
</style>