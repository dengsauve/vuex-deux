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
        calendar: [],
        tasks: [
            // {
            //     date: '2020-10-5',
            //     name: 'Frosty Beverage Thursday',
            //     completed: true,
            // },
        ],
        lists: [
            // {
            //     id: 1,
            //     name: 'Custom List',
            //     tasks: [
            //         {
            //             name: 'Custom Item #1',
            //             completed: false,
            //         },
            //         {
            //             name: 'Custom Item #2',
            //             completed: false,
            //         },
            //     ]
            // },
        ]
    },
    mutations: {
        storeNewTask(state, payload) {
            state.tasks.push(payload);
            let day = state.calendar.find(d => d.id === payload.date);
            if (day)
                day.tasks.push(payload);
            const parsed = JSON.stringify(state.tasks);
            localStorage.setItem('tasks', parsed);
        }
    },
    getters: {
        //
    },
    actions: {
        addNewTask: function ({commit}, payload) {
            commit('storeNewTask', payload);
        },
        loadTasks: function (context) {
            if (localStorage.tasks)
                context.state.tasks = JSON.parse(localStorage.tasks);
        },
        loadLists: function (context) {
            if (localStorage.lists)
                context.state.lists = JSON.parse(localStorage.lists);
        }
    }
});

new Vue({
    render: h => h(App),
    store: store,
    el: '#app',
});
