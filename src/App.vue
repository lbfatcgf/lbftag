<script setup lang="ts">
import AppContent from './components/AppContent.vue'
import SearchBox from './components/SearchBox.vue';
import BookMarker from './components/BookMarker.vue';
import TimeBox from './components/TimeBox.vue';
import { NDialogProvider,NConfigProvider,zhCN, dateZhCN } from 'naive-ui'

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <AppContent class="column">
        <TimeBox style="margin-top: 50px;" />
        <SearchBox />
        <BookMarker />
        <div/>
      </AppContent>
    </n-dialog-provider>
  </n-config-provider>
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