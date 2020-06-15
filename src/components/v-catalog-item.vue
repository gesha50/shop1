<template>
    <div class="v-catalog-item">
        <img class="v-catalog-item__img" :src=" require('../img/' + product_data.image ) " alt="img">
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">price: {{product_data.price}} p</p>
        <button class="btn v-catalog-item__button" @click="sendDataToParent">add to cart</button>
    </div>
</template>

<script>

    export default {
        name: "v-catalog-item",
        props: {
            product_data:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            sendDataToParent(){
                this.$emit('sendArticle', this.product_data.article)
            },
        }
    }
</script>

<style lang="scss">
    .v-catalog-item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding*2;
        margin-bottom: $margin*2;
        .v-catalog-item__img {
            width: 150px;
        }
    }
</style>