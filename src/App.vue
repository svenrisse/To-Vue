<script>
    export default {
        data() {
            return {
                todo: {title: "", description: ""},
                todos: []
            }
        },

        methods: {
            addToDo() {
                this.todos.push(this.todo)
                this.todo = {title: "", description: ""}
            },
            removeToDo(e) {
              const id = e.target.getAttribute("id");
              this.todos.splice(id, 1)
            }
        }
    }
</script>

<template>
    <form @submit.prevent="addToDo">
        <input type="text" name="title" v-model="todo.title" placeholder="Title">
        <input type="text" name="description" v-model="todo.description" placeholder="Description">
        <button> + </button>
    </form>

    <div v-for="todo in todos">
      <div>
        <div>Title: {{todo.title }}</div>
        <div v-if="todo.description">Description: {{todo.description}}</div>
        <button @click="removeToDo" :id="todos.indexOf(todo)"> - </button>
      </div>
    </div>
</template>