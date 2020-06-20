<template>
    <div class="v-catalog">
        <v-notification
                :messages="messages"
        />
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart">CART: {{CART.length}}</div>
        </router-link>
        <h1>Catalog</h1>
        <div class="filters">
            <v-select
                    :options="categories"
                    @select="sortByCategories"
                    :selected="selected"
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
            @productClick="productClick"
            />

        </div>
    </div>
</template>

<script>
    import vCatalogItem from './v-catalog-item'
    import vSelect from './v-select'
    import { mapActions,mapGetters } from 'vuex'
    import vNotification from '../notifications/v-notification'


    export default {
        name: "v-catalog",
        components:{
            vCatalogItem,
            vSelect,
            vNotification,
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
                messages: [],
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                "CART",
                'IS_MOBILE',
                'IS_DESKTOP',
                'SEARCH_VALUE',
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
            productClick(article) {
                console.log(article)
                this.$router.push( {name: 'product', query: { 'product': article }})
            },
            addToCart(data){
                this.ADD_TO_CART(data)
                .then(()=>{
                    let timeStamp = Date.now().toLocaleString()
                    this.messages.unshift(
                        { name: 'Товар добавлен в Корзину!', icon: 'check_circle', id: timeStamp}
                    )
                })
            },
            sortProductsBySearchValue(value) {
                this.sortedProducts = [...this.PRODUCTS]
                if (value) {
                    this.sortedProducts = this.sortedProducts.filter(function (item) {
                        return item.name.toLowerCase().includes(value.toLowerCase())
                    })
                } else {
                    this.sortedProducts = this.PRODUCTS;
                }
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
                    this.selected = category.name
                }
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
        watch:{
          SEARCH_VALUE() {
              this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then((res) => {
                if(res.data) {
                    this.sortByCategories()
                    this.sortProductsBySearchValue(this.SEARCH_VALUE)
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
            top: 90px;
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