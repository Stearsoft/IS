<template>
    <div>
        <input type="text" v-model="inputValue" @input="handleInput"
            class="xl-px-2 xl-py-2 xl-w-full xl-rounded xl-mb-1" style="background-color:var(--bg-5)" />
        <p class="xl-text-red-600 xl-mb-5 xl-text-sm xl-transition-opacity"
            :class="{ 'xl-opacity-0': valueIsConsistent }">
            {{ errorMsg }}
        </p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['value', 'match', 'errorMsg']);
const valueIsConsistent = ref(true);
const inputValue = ref(props.value);
const emit = defineEmits(['update:modelValue']);
// 监控输入值的变化
watch(inputValue, (newValue) => {
    if (newValue.match(props.match)) {
        valueIsConsistent.value = true;
        emit('update:modelValue', newValue);
    } else {
        valueIsConsistent.value = false;
    }
});

const handleInput = (e) => {
    inputValue.value = e.target.value;
}
</script>
