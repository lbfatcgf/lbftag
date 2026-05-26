<template>
  <div class="glass searchBox">
    <n-dropdown :options="SearchEnginsStore.enginesOptions()" @select="updateEngine">
      <n-button quaternary size="large" style="width: 80px;">{{ SearchEnginsStore.currentEngine }}</n-button>
    </n-dropdown>
    <n-input style="border-radius: 12px;" v-model:value="searchContext" type="text" @keydown="finish" placeholder="">
      <template #suffix>

        <n-button quaternary @click="search">
          <n-icon size="24">
            <Search></Search>
          </n-icon>
        </n-button>
      </template>
    </n-input>



  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NInput, NIcon, NButton, NDropdown, type DropdownOption } from 'naive-ui'
import { Search } from '@vicons/fa'
import { SearchEnginsStore } from '../store/search_engins_stroe';
const searchContext = ref<string>('');

const enginesOptions = ref<Array<DropdownOption>>(new Array())

function finish(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    search()
  }
}
function search() {
  window.open(SearchEnginsStore.getEnginesLink(SearchEnginsStore.currentEngine) + searchContext.value, '_blank');
}
function updateEngine(_: string | number, option: DropdownOption) {
  SearchEnginsStore.changeCurrentEngines(option.label as string ?? "bing")
}
onMounted(() => {
  SearchEnginsStore.loadEngines()
  enginesOptions.value = SearchEnginsStore.enginesOptions()
  // console.log(SearchEnginsStore.enginesOptions());
  
});
</script>

<style scoped>
.searchBox {
  /* padding: 6px 6px 6px 6px; */
  display: flex;

  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  gap: 10px;
}



/* 超小设备 (手机, 600px 以下屏幕设备) */
@media only screen and (max-width: 600px) {
  .searchBox {
    width: 90%;
    gap: 5px;
  }


}

/* 小设备 (平板电脑和大型手机，600 像素及以上) */
@media only screen and (min-width: 600px) {
  .searchBox {
    width: 600px;
  }
}


/* 中型设备（平板电脑，768 像素及以上） */
@media only screen and (min-width: 768px) {
  .searchBox {
    width: 600px;
  }
}


/* 大型设备（笔记本电脑/台式机，992 像素及以上） */
@media only screen and (min-width: 992px) {
  .searchBox {
    width: 800px;
  }

}
</style>