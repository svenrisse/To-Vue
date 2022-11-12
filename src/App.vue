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
        <label for="title">Title</label>
        <input type="text" name="title" v-model="todo.title">
        <label for="description">Description</label>
        <input type="text" name="description" v-model="todo.description">
        <button>Add To Do</button>
    </form>

    <div v-for="todo in todos">
      <div>
        <div>Title: {{todo.title }}</div>
        <div>Description: {{todo.description}}</div>
        <button @click="removeToDo" :id="todos.indexOf(todo)">Remove</button>
      </div>
    </div>
</template>