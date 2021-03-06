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
          <del v-if="task.completed" @click="toggleCompletion(task)">
            {{ task.name }}
          </del>

          <span @click="remove(task)" v-if="task.completed">
            <TrashCan/>
          </span>

          <span v-else @click="toggleCompletion(task)">
            {{ task.name }}
          </span>
        </li>
      </draggable>

    </div>

    <div class="input-group card-footer">
      <div class="input-group-prepend">
        <button :disabled="locked" class="btn btn-outline-secondary" @click="add">
          Add
        </button>
      </div>
      <input :disabled="locked"
             type="text"
             class="form-control"
             v-model="newTask"
             @keyup.enter="add">
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
        if (this.custom)
          return this.day.tasks;

        return this.$store.state.tasks.filter(t => t.date === this.day.id)
            .sort((y, x) => (x.completed === y.completed) ? 0 : x.completed? -1 : 1);
      },
      set: function (value) {
        // Add any change logic (maybe vuex action) here
        // this.day.tasks = value;
        console.log(value);
        return;
      }
    }
  },
  name: 'ListCard',
  props: [
    'day',
    'showdate',
    'custom',
    'locked'
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
      if (this.newTask.length < 1)
        return;

      if (this.custom) {
        console.log('customadd reached');
        this.day.tasks.push({
          name: this.newTask,
          completed: false
        });
        this.$store.dispatch('updateList', this.day);
      } else {
        this.$store.dispatch('addNewTask', {
          date: this.day.id,
          name: this.newTask,
          completed: false,
        });
      }
      this.newTask = '';
    },
    toggleCompletion: function (task) {
      if (this.custom) {
        this.updateCustomCompletion(task);
      } else {
        this.$store.dispatch('toggleCompletion', task);
      }
    },
    updateCustomCompletion: function (task) {
      const taskIndex = this.day.tasks.findIndex(t => t === task);
      this.day.tasks[taskIndex].completed = !this.day.tasks[taskIndex].completed;
      this.$store.dispatch('updateList', this.day);
    },
    remove: function (task) {
      if (this.custom) {
        this.removeCustom(task);
      } else {
        this.$store.dispatch('removeTask', task);
      }
    },
    removeCustom: function (task) {
      const taskIndex = this.day.tasks.findIndex(t => t === task);
      this.day.tasks.splice(taskIndex, 1);
      this.$store.dispatch('updateList', this.day);
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
      this.$store.dispatch('renameList', this.day);
      this.finishEditing();
    },
  }
}
</script>
