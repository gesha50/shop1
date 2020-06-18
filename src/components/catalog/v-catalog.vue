<template>
    <div class="v-catalog">
        <p>Selected option:{{selected}}</p>
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart">CART: {{CART.length}}</div>
        </router-link>
        <h1>Catalog</h1>
        <div class="filters">
            <v-select
                    :options="categories"
                    @select="sortByCategories"
                    :selected="selected"
                    :is-expended="IS_DESKTOP"
            />
            <div class="range-slider">
                <input type="range" min="0" max="50000" step="100" v-model.number="minPrice" @change="setRangeSlider">
                <input type="range" min="0" max="50000" step="100" v-model.number="maxPrice" @change="setRangeSlider">
            </div>
            <div class="range-value">
                <p>Min:{{minPrice}}</p>
                <p>Max:{{maxPrice}}</p>

            </div>
        </div>
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
                minPrice: 0,
                maxPrice: 50000,
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
                let vm = this
                this.sortedProducts = [...this.PRODUCTS]
                this.sortedProducts = this.sortedProducts.filter(function (item) {
                    return item.price >= vm.minPrice && item.price <= vm.maxPrice
                })
                if (category) {
                    this.sortedProducts = this.sortedProducts.filter(function (e) {
                        vm.selected === category.name
                        return e.category === category.name
                    })
                }
                this.selected = category.name

                /*this.sortedProducts = []
                let vm = this
                this.PRODUCTS.map(function (item) {
                    if (item.category === category.name){
                        vm.sortedProducts.push(item)
                    }
                })
                this.selected = category.name*/
            },
            setRangeSlider(){
              if(this.minPrice > this.maxPrice){
                  let tmp = this.maxPrice
                  this.maxPrice = tmp.minPrice
                  this.minPrice = tmp
              }
                this.sortByCategories()
            },
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then((res) => {
                if(res.data) {
                    console.log('Data arrived')
                    this.sortByCategories()
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
            background-color: #fff;
        }
    }
    .filters{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .range-slider{
        width: 200px;
        margin: auto 16px;
        text-align: center;
        position: relative;
    }
    .range-slider svg, .range-slider input[type=range]{
        position: absolute;
        left: 0;
        bottom: 0;
    }
    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }
</style>