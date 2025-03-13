<script setup>
import BackgroundBox from './components/controls/BackgroundBox.vue';
import MenuIcon from './components/controls/MenuIcon.vue';
import SearchBox from './components/controls/SearchBox.vue';
import SettingUI from './components/controls/SettingUI.vue';
// import RiverBar from './components/controls/RiverBar.vue';
import { ref } from 'vue';
const SearchInput = ref(false);
const onSearchFocus = () => {SearchInput.value = true;};
const onSearchBlur = () => {SearchInput.value = false;};
const startUI = (ui_name) => {
  Windows_UI.value[ui_name] = !Windows_UI.value[ui_name];
  SearchInput.value = true;
}
const closeUI = (ui_name) => {
  Windows_UI.value[ui_name] = !Windows_UI.value[ui_name];
  SearchInput.value = false;
}
const Windows_UI = ref({
  'setting': false,
});
</script>

<template>
  <SearchBox @focused="onSearchFocus" @blurred="onSearchBlur"></SearchBox>
  <BackgroundBox :focus="SearchInput"></BackgroundBox>
  <MenuIcon @open="startUI"></MenuIcon>
  <SettingUI v-if="Windows_UI.setting" @close="closeUI"></SettingUI>
  <!-- <RiverBar></RiverBar> -->
  <router-view></router-view>
</template>