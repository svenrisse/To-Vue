<script setup>
import { ref } from "vue"
import firebase from "firebase/compat"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errMsg = ref()
const router = useRouter()

function login() {
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => {
            console.log("Successfully registered!")
            router.push("/todos")
        })
        .catch(error => {
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email"
                    break
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found"
                    break
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password"
                default:
                    errMsg.value = "Email or password was incorrect"
                    break
            }
        })
}
</script>

<template>
    <h1>Login to Your Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="login">Login</button></p>
</template>