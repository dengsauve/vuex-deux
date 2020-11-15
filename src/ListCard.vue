<template>
  <div class="card">

    <div class="card-body">

      <h5 class="card-title" v-if="!editing" @click="custom ? setupEdit(day.name) : null">
        {{ day.name }}
        <small v-if="day.isToday">(today)</small>
      </h5>

      <input class="h5"
             v-if="editing"
             v-model="titleString"
             @keyup.enter="saveName"
             @focusout="cancelEdit"
             ref="title"
      />

      <span v-if="showdate && !editing">{{ day.id }}</span>

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

          <span @click="remove(task)" v-if="task.completed">
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
      <input type="text" class="form-control" v-model="newTask" @keyup.enter="add">
    </div>

  </div>
</template>
<script>
import draggable from 'vuedraggable';
import TrashCan from "./components/TrashCan";

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
    'showdate',
    'custom',
  ],
  data: function () {
    return {
      newTask: '',
      editing: false,
      titleString: '',
    }
  },
  methods: {
    add: function () {
      if (this.newTask.length > 0) {
        this.$store.dispatch('addNewTask', {
          date: this.day.id,
          name: this.newTask,
          completed: false,
        });
        this.newTask = '';
      }
    },
    remove: function (task) {
      const taskIndex = this.list.findIndex(t => t.name === task.name);
      this.list.splice(taskIndex, 1);
    },
    setupEdit: function (currentTitle) {
      this.editing = true;
      this.titleString = currentTitle;
      this.$nextTick(() => {
        this.$refs.title.focus();
        this.$refs.title.select();
      });
    },
    cancelEdit: function () {
      this.finishEditing();
    },
    finishEditing: function () {
      this.editing = false;
      this.titleString = '';
    },
    saveName: function () {
      this.day.name = this.titleString;
      this.finishEditing();
    },
  }
}
</script>
