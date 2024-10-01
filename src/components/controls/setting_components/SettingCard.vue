<template>
    <div v-if="card === 'Wallhaven'">
        Wallhaven
    </div>
    <div v-else-if="card === 'color'">
        color
    </div>
    
</template>
<script setup>
defineProps(['card'])
</script>