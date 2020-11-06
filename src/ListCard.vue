<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ day.name }}
                <small v-if="day.isToday">(today)</small>
            </h5>
            {{ day.date }}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="grab"></div>
                Hate the day
            </li>
            <li class="list-group-item">
                <div class="grab"></div>
                Nap
            </li>
            <li class="list-group-item">Bake Lasagna</li>
            <li class="list-group-item">Eat lasagna before Jon gets home!</li>
        </ul>
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
