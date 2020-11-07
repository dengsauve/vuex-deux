<template>
    <div class="card">

        <div class="card-body">

            <h5 class="card-title">{{ day.name }}
                <small v-if="day.isToday">(today)</small>
            </h5>
            {{ day.id }}

            <ul class="list-group list-group-flush">
                <li class="list-group-item"
                    v-for="task in day.tasks"
                    :key="task.name"
                >
                    <div class="grab"></div>
                    {{ task.name }}
                </li>
            </ul>

        </div>

    </div>
</template>
<script>
    export default {
        name: 'ListCard',
        props: [
            'day',
        ]
    }
</script>
