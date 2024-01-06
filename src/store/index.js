import { createStore } from 'vuex';
import axios from 'axios';

//action -> mutation -> state changes

export default createStore({
  state: {
    products: [],
    bag: [],
  },
  getters: {},
  mutations: {
    getProducts(state, products) {
      state.products = products;
    },
    addToBag(state, product) {
      state.bag.push(product);
      localStorage.setItem('local-bag', JSON.stringify(state.bag));
    },
    getBag(state, products) {
      state.bag = products;
    },
    removeFromBag(state, productId) {
      const inBag = state.bag.filter((item) => productId != item.id);
      state.bag = inBag;
      localStorage.setItem('local-bag', JSON.stringify(state.bag));
    },
  },
  actions: {
    getProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products').then((response) => {
        commit('getProducts', response.data);
      });
    },
    getBag({ commit }) {
      if (localStorage.getItem('local-bag')) {
        commit('getBag', JSON.parse(localStorage.getItem('local-bag')));
      }
    },
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    removeFromBag({ commit }, productId) {
      commit('removeFromBag', productId);
    },
  },
  modules: {},
});
