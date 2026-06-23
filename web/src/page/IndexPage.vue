<script setup lang="ts">

import SearchBox from '@/components/SearchBox.vue';
import BookMarker from '@/components/BookMarker.vue';
import TimeBox from '@/components/TimeBox.vue';
import { NFlex } from 'naive-ui'

</script>

<template>


  <div class="column">
    <div class="tb">
      <n-flex style="width: 100%;" justify="end">
        <TimeBox style="margin-right: 20px;margin-top: 20px;" />
      </n-flex>
    </div>
    <SearchBox />
    <BookMarker />
    <div />
  </div>


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

.tb {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .tb {
    display: none;
  }


}
</style>