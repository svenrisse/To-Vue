<script setup>
import { ref} from "vue";
import firebase from "firebase/compat";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        isLoggedIn.value = true;
    } else {
        isLoggedIn.value = false;
    }
});

function signOut() {
    router.push("/");
    firebase.auth().signOut(); 
}
</script>

<template>
    <div>
        <nav>
            <span v-if="isLoggedIn">
                <button @click="signOut" class="logout-button">Logout</button>
            </span>
            <span v-if="!isLoggedIn">
                <router-link to="/register"> Register </router-link>
                <router-link to="/sign-in"> Login </router-link>
                <p>Welcome to To-Vue. Please register or sign in to create some To-Do's!</p>
            </span>
        </nav>
        <router-view />
    </div>
</template>

<style>
    .logout-button {
        margin-bottom: 10vh;
    }
</style>
