<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase/compat";
import { getDatabase, set, onValue} from "firebase/database";
import { ref as dbRef } from "firebase/database";
import Todo from "../components/Todo.vue";

const router = useRouter();

const authListener = firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        alert("You must be logged in to access this.");
        router.push("/");
    }
});

onBeforeUnmount(() => {
    authListener();
});

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

function removeToDo(id) {
    todos.value.splice(id, 1);
}

const firebaseUser = firebase.auth().currentUser.email.split("@", 1);
const db = getDatabase();
function writeUserData(userId, tasks) {
    set(dbRef(db, "users/" + userId), {
        tasks: tasks,
    });
}

onMounted(() => {
    const userTasks = dbRef(db, "users/" + firebaseUser + "/tasks");
    onValue(userTasks, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data != null) {
            todos.value = JSON.parse(data);
        } else {
            todos.value = [];
        }
        
    }, {
        onlyOnce: true
    })
});

watch(
    todos,
    (newVal) => {
        console.log("Watch executed");
        const data = JSON.stringify(newVal);
        writeUserData(firebaseUser, data);
    },
    {
        deep: true,
    }
);
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
            <Todo
                :title="task.title"
                :description="task.description"
                :id="todos.indexOf(task)"
                @handleClick="removeToDo"
            />
        </div>
    </div>
</template>
