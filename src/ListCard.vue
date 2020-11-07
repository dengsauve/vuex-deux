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
                <li class="list-group-item grabbable"
                    v-for="task in list"
                    :key="task.name"
                >
                    <del v-if="task.completed" @click="task.completed = !task.completed">
                        {{ task.name }}
                    </del>

                    <span @click="remove(task)"  v-if="task.completed">
                        <TrashCan/>
                    </span>

                    <span v-else @click="task.completed = !task.completed">
                        {{ task.name }}
                    </span>
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
    import TrashCan from "./TrashCan";

    export default {
        components: {TrashCan, draggable},
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
            },
            remove: function (task) {
                const taskIndex = this.list.findIndex(t => t.name === task.name);
                this.list.splice(taskIndex, 1);
            }
        }
    }
</script>
