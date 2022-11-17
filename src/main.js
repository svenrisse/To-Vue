import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import firebase from "firebase/compat/app"

const firebaseConfig = {
    apiKey: "AIzaSyCW2pImbEEBPb5h8IbHF-xq5l9pxcqY3mw",
    authDomain: "vue-to-do-81c7d.firebaseapp.com",
    databaseURL: "https://vue-to-do-81c7d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-to-do-81c7d",
    storageBucket: "vue-to-do-81c7d.appspot.com",
    messagingSenderId: "565574310353",
    appId: "1:565574310353:web:57cf83afb8cec29b3268f0",
    measurementId: "G-F9XS93SV16",
}

firebase.initializeApp(firebaseConfig)

createApp(App).use(router).mount("#app")
