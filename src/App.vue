<script setup lang="ts">
import AppContent from './components/AppContent.vue'
import SearchBox from './components/SearchBox.vue';
import BookMarker from './components/BookMarker.vue';
import TimeBox from './components/TimeBox.vue';
</script>

<template>
  <AppContent class="column">
    <TimeBox style="margin-top: 50px;"/>
    <SearchBox />
    <BookMarker style="flex: 1;"/>
    <div></div>
  </AppContent>
</template>


<style scoped>
.column {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100dvh;
    overflow: scroll;
    gap: 20px;
}
</style>