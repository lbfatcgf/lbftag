<script setup lang="ts">
import AppContent from '@/components/AppContent.vue'
import {
  NDialogProvider, NConfigProvider, zhCN, dateZhCN,
  NNotificationProvider,
  NMessageProvider
} from 'naive-ui'

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <AppContent>
            <RouterView></RouterView>
          </AppContent>
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
