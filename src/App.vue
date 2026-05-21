<script setup lang="ts">
import AppContent from './components/AppContent.vue'
import SearchBox from './components/SearchBox.vue';
import BookMarker from './components/BookMarker.vue';
import TimeBox from './components/TimeBox.vue';
import {NDialogProvider} from 'naive-ui'
</script>

<template>
  <n-modal-provider>
    <n-dialog-provider>
      <AppContent class="column">
        <TimeBox style="margin-top: 50px;"/>
        <SearchBox />
        <BookMarker style="flex: 1;"/>
        <div></div>
      </AppContent>
    </n-dialog-provider>
  </n-modal-provider>
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