<script setup></script>

<template>
    <div>
        <nav>
            <router-link to="/"> Home </router-link> |
            <router-link to="/todos"> Todos </router-link> |
            <router-link to="/register"> Register </router-link> |
            <router-link to="/sign-in"> Login </router-link> |
        </nav>
        <router-view />
    </div>
</template>
