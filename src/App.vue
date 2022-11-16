<script setup>
import { onMounted, ref, watch } from "vue"
import Todo from "./components/Todo.vue"

const todo = {
    title: ref(""),
    description: ref(""),
}
const todos = ref([])

function resetInput() {
    todo.title.value = ""
    todo.description.value = ""
}

function addToDo() {
    todos.value.push({
        title: todo.title.value,
        description: todo.description.value
    })
    resetInput()
}

function removeToDo(id) {
    todos.value.splice(id, 1)
}

onMounted(() => {
    if (localStorage.getItem("todos")) {
        todos.value = JSON.parse(localStorage.getItem("todos"))
    }
})

watch(
    todos,
    (newVal) => {
        console.log("Watch executed")
        localStorage.setItem("todos", JSON.stringify(newVal))
    },
    {
        deep: true,
    }
)
</script>

<template>
    <form @submit.prevent="addToDo" class="add-section">
        <input
            type="text"
            name="title"
            v-model="todo.title.value"
            placeholder="Title"
            class="add-section__input"
            required
        />
        <input
            type="text"
            name="description"
            v-model="todo.description.value"
            placeholder="Description"
            class="add-section__input"
        />
        <button class="add-section__button">+</button>
    </form>

    <div class="task-section">
        <div v-for="task in todos" class="task-section__task">
            <Todo :title="task.title" :description="task.description" :id="todos.indexOf(task)" @handleClick="removeToDo"/>
        </div>
    </div>
    
</template>
