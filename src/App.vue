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
            <router-link to="/"> Home </router-link>
            <span v-if="isLoggedIn">
                <router-link to="/todos"> Todos </router-link>
                <button @click="signOut">Logout</button>
            </span>
            <span v-if="!isLoggedIn">
                <router-link to="/register"> Register </router-link>
                <router-link to="/sign-in"> Login </router-link>
            </span>
        </nav>
        <router-view />
    </div>
</template>
