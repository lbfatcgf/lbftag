<script setup lang="ts">
import AppContent from './components/AppContent.vue'
import SearchBox from './components/SearchBox.vue';
import BookMarker from './components/BookMarker.vue';
import TimeBox from './components/TimeBox.vue';
import {
  NDialogProvider, NConfigProvider, zhCN, dateZhCN,
  NNotificationProvider,
  NFlex
} from 'naive-ui'

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
      <n-dialog-provider>
        <AppContent class="column">
          <n-flex style="width: 100%;" justify="end">
            <TimeBox style="margin-right: 20px;margin-top: 20px;" />
          </n-flex>
          <SearchBox />
          <BookMarker />
          <div />
        </AppContent>
      </n-dialog-provider>
    </n-notification-provider>
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