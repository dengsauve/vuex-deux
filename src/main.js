import Vue from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

require('./assets/styles/main.css');

Vue.config.productionTip = false;

import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        days: {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
        },
        tasks: [
            {
                date: '2020-10-5',
                name: 'Frost Beverage Thursday',
                completed: true,
            },
            {
                date: '2020-10-5',
                name: 'Thirsty Thursday',
                completed: true,
            },
            {
                date: '2020-10-6',
                name: 'Frost Beverage Friday',
                completed: true,
            },
            {
                date: '2020-10-6',
                name: 'French Fry Friday',
                completed: true,
            },
            {
                date: '2020-10-7',
                name: 'Frost Beverage Saturday',
                completed: false,
            },
            {
                date: '2020-10-7',
                name: 'Solid Saturday',
                completed: false,
            },
            {
                date: '2020-10-8',
                name: 'Frost Beverage Sunday',
                completed: false,
            },
            {
                date: '2020-10-9',
                name: 'Frost Beverage Monday',
                completed: false,
            },
        ]
    },
    mutations: {
        //
    },
    getters: {
        //
    },
    actions: {
        //
    }
});

new Vue({
    render: h => h(App),
    store: store,
    el: '#app',
});
