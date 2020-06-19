import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/vuex/getters/getters";
import commonActions from "@/vuex/actions/actions";
import apiRequests from "./actions/api-requests"
import mutations from "@/vuex/mutations/mutations";

const actions = {...commonActions, ...apiRequests}

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        searchValue: '',
        products: [],
        cart: [],
        isMobile: false,
        isDesktop: true
    },
    mutations,
    actions,
    getters,
});

export default store;




