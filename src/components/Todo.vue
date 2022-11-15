<script setup>
defineProps(["title", "description", "id"]);
</script>

<template>
    <div>
        <div @click="changeStatus" class="task-section__text">
            <div class="task-section__title">{{ title }}</div>
            <div v-if="description" class="task-section__desc">
                {{ description }}
            </div>
        </div>
        <button @click="$emit('handleClick', id)" class="task-section__button">
            Remove
        </button>
    </div>
</template>
