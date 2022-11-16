<script setup>
import { ref } from 'vue';

defineProps(["title", "description", "id"])

const status = ref(false)

function changeStatus() {
    status.value = !status.value
}

</script>

<template>
    <div @click="changeStatus" :class="{ 'task-section__item-done': status  } ">
        <div class="task-section__text">
            <div class="task-section__title">{{ title }}</div>
            <div v-if="description" class="task-section__desc">
                {{ description }}
            </div>
        </div>
        <button @click="$emit('handleClick', id)" class="task-section__button">
            -
        </button>
    </div>
</template>

<style>

.task-section__item-done {
    text-decoration: line-through;
    text-decoration-color: #42b883;
    text-decoration-thickness: 0.2rem;
}   

</style>
