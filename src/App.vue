<script setup lang="ts">
import AppContent from './components/AppContent.vue'
import SearchBox from './components/SearchBox.vue';
import BookMarker from './components/BookMarker.vue';
import TimeBox from './components/TimeBox.vue';
</script>

<template>
  <AppContent>
    <SearchBox />
    <BookMarker/>
    <TimeBox/>
  </AppContent>
</template>
