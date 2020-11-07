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
                    {{ task.name }}
                </li>
            </draggable>

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
        ]
    }
</script>
