<template>
    <div class="v-catalog-item">

        <v-popup
            v-if="isInfoPopupVisible"
            @closePopup="closeInfoPopup"
            rightBtnTitle="Add to cart"
            :popupTitle="product_data.name"
            @rightBtnAction="addToCart"
        >
            <img class="v-catalog-item__img" :src=" require('../../img/' + product_data.image ) " alt="img">
            <div>
                <p class="v-catalog-item__name">{{product_data.name}}</p>
                <p class="v-catalog-item__price">price: {{product_data.price}} p</p>
                <p class="v-catalog-item__price">price: {{product_data.category}}</p>
            </div>

        </v-popup>

        <img class="v-catalog-item__img" :src=" require('../../img/' + product_data.image ) " alt="img">
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">price: {{product_data.price}} p</p>
        <div class="v-catalog-item-for-btn">
            <button class="v-catalog-item__show-info" @click="showPopupInfo">show info</button>
            <button class="btn v-catalog-item__button" @click="addToCart">add to cart</button>
        </div>
    </div>
</template>

<script>

    import vPopup from '../popup/v-popup'

    export default {
        data(){
            return {
                isInfoPopupVisible: false,
            }
        },
        name: "v-catalog-item",
        components: {
            vPopup,
        },
        props: {
            product_data:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            showPopupInfo(){
                this.isInfoPopupVisible = true
            },
            closeInfoPopup(){
                this.isInfoPopupVisible = false
            },
            addToCart(){
                this.$emit('addToCart',this.product_data)
            }
        },
        mounted(){
            this.$set(this.product_data, 'quantity',1)
        },
    }
</script>

<style lang="scss">
    .v-catalog-item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding*2;
        margin-bottom: $margin*2;
        &__img {
            width: 150px;
        }
        .v-catalog-item-for-btn{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            .v-catalog-item__show-info, .v-catalog-item__button {
                cursor: pointer;
            }
        }
    }
</style>