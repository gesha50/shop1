<template>
    <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
        <div class="v-popup__header">
            <span>{{popupTitle}}</span>
            <span>
                <i class="material-icons" @click="closePopup">
                    close
                </i>
            </span>
        </div>
        <div class="v-popup__content">
            <slot></slot>
        </div>
        <div class="v-popup__footer">
            <button class="close_model" @click="closePopup">Закрыть</button>
            <button class="submit_btn" @click="rightBtnAction">{{rightBtnTitle}}</button>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        props: {
            popupTitle: {
                type: String,
                default: 'Popup name'
            },
            rightBtnTitle: {
                type: String,
                default: 'Ok'
            }
        },
        methods: {
            closePopup(){
                this.$emit('closePopup')
            },
            rightBtnAction(){
              this.$emit('rightBtnAction')
            },
        },
        mounted(){
            let  vm = this
          document.addEventListener('click', function (item) {
              if (item.target === vm.$refs['popup_wrapper']){
                  vm.closePopup()
              }
          })
        },
    }

</script>

<style lang="scss">
    .popup_wrapper {
        height: 200%;
        background: rgba(64,64,64,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
    }
    .v-popup{
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 400px;
        background-color: #fff;
        box-shadow: 0 0 17px 0 #e7e7e7;
        z-index: 10;
        &__header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__content, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .submit_btn {
            padding: 8px;
            color: white;
            background-color: #26ae68;
            border: none;
            border-radius: 5px;

        }
        .close_model {
            padding: 8px;
            color: white;
            background-color: red;
            border: none;
            border-radius: 5px;
        }
    }
</style>