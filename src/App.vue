<script setup>
import { onMounted, ref, watch } from "vue";

const todo = {
    title: ref(""),
    description: ref(""),
};
const todos = ref([]);

function resetInput() {
    todo.title.value = "";
    todo.description.value = "";
}

function addToDo() {
    todos.value.push({
        title: todo.title.value,
        description: todo.description.value,
    });
    resetInput();
}

function removeToDo(e) {
    const id = e.target.getAttribute("id")
    todos.value.splice(id, 1)
}

onMounted(() => {
    if (localStorage.getItem("todos")) {
        todos.value = JSON.parse(localStorage.getItem("todos"))
    }
})

watch(todos, (newVal) => {
    console.log("Watch executed")
    localStorage.setItem("todos", JSON.stringify(newVal))
}, {
    deep: true
})

</script>

<template>
    <form @submit.prevent="addToDo">
        <input
            type="text"
            name="title"
            v-model="todo.title.value"
            placeholder="Title"
        />
        <input
            type="text"
            name="description"
            v-model="todo.description.value"
            placeholder="Description"
        />
        <button>+</button>
    </form>

    <div v-for="task in todos">
        <div>
            <div>Title: {{ task.title }}</div>
            <div v-if="task.description">
                Description: {{ task.description }}
            </div>
            <button @click="removeToDo" :id="todos.indexOf(task)">-</button>
        </div>
    </div>
</template>
