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
        ],
        drawerOpen: false,
    },
    mutations: {
        storeNewTask(state, payload) {
            state.tasks.push(payload);
            this.commit('persistTasks');
        },
        updateTask(state, payload) {
            console.log(payload);
            state.tasks.splice(payload[0], 1, payload[1]);
            this.commit('persistTasks');
        },
        deleteTask(state, payload) {
            state.tasks.splice(payload, 1);
            this.commit('persistTasks');
        },

        createList(state, payload) {
            state.lists.push(payload);
            this.commit('persistLists');
        },
        updateList(state, payload) {
            const listIndex = state.lists.findIndex(l => l.id === payload.id);
            state.lists.splice(listIndex, 1, payload);
            this.commit('persistLists');
        },
        
        persistTasks(state) {
            const parsed = JSON.stringify(state.tasks);
            localStorage.setItem('tasks', parsed);
        },
        persistLists(state) {
            const parsed = JSON.stringify(state.lists);
            localStorage.setItem('lists', parsed);
        }
    },
    getters: {
        //
    },
    actions: {
        addNewTask: function ({commit}, payload) {
            commit('storeNewTask', payload);
        },
        removeTask: function (context, payload) {
            const taskIndex = context.state.tasks.findIndex(t => t.name === payload.name);
            context.commit('deleteTask', taskIndex);
        },
        toggleCompletion: function(context, payload) {
            payload.completed = !payload.completed;
            const taskIndex = context.state.tasks.findIndex(t => t.name === payload.name);
            context.commit('updateTask', [taskIndex, payload]);
        },
        updateTask: function(context, payload) {
            const taskIndex = context.state.tasks.findIndex(t => t.name === payload.name);
            context.commit('updateTask', [taskIndex, payload]);
        },

        addList: function (context, payload) {
            this.commit('createList', payload);
        },
        renameList: function(context, payload) {
            context.commit('updateList', payload);
        },
        updateList: function(context, payload) {
            context.commit('updateList', payload);
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
