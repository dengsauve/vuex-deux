<template>
    <div class="card">

        <div class="card-body">

            <h5 class="card-title">{{ day.name }}
                <small v-if="day.isToday">(today)</small>
            </h5>
            {{ day.id }}

            <draggable :list="list"
                       group="tasks"
                       tag="ul"
                       class="list-group list-group-flush"
            >
                <li class="list-group-item"
                    v-for="task in list"
                    :key="task.name"
                >
                    <div class="grab"></div>
                    <del v-if="task.completed">{{ task.name }}</del>
                    <span v-else>{{ task.name }}</span>
                </li>
            </draggable>

        </div>

        <div class="input-group card-footer">
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" @click="add">
                    Add
                </button>
            </div>
            <input type="text" class="form-control" v-model="newTask">
        </div>

    </div>
</template>
<script>
    import draggable from 'vuedraggable';

    export default {
        components: {draggable},
        computed: {
            list: {
                get: function () {
                    return this.day.tasks
                },
                set: function (value) {
                    // Add any change logic (maybe vuex action) here
                    this.day.tasks = value;
                }
            }
        },
        name: 'ListCard',
        props: [
            'day',
        ],
        data: function () {
            return {
                newTask: '',
            }
        },
        methods: {
            add: function () {
                this.list.push({
                    date: this.day.id,
                    name: this.newTask,
                    completed: false,
                });
                this.newTask = '';
            }
        }
    }
</script>
