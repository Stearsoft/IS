<script setup>
import BackgroundBox from './components/controls/BackgroundBox.vue';
import BarCopyright from './components/controls/BarCopyright.vue';
import MenuIcon from './components/controls/MenuIcon.vue';
import SearchBox from './components/controls/SearchBox.vue';
import { ref } from 'vue';
const SearchInput = ref(false);
const onSearchFocus = () => {
  SearchInput.value = true;
};
const onSearchBlur = () => {
  SearchInput.value = false;
};
</script>

<template>
  <SearchBox @focused="onSearchFocus" @blurred="onSearchBlur"></SearchBox>
  <BackgroundBox :focus="SearchInput"></BackgroundBox>
  <MenuIcon></MenuIcon>
  <BarCopyright></BarCopyright>
</template>
