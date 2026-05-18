<template>
  <div class="glass searchBox">
    <n-dropdown :options="enginesOptions" @select="updateEngine" >
      <n-button quaternary size="large" style="width: 80px;">{{ defaultEngine }}</n-button>
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
    <!-- <select class="engine" @change="updateEngine">
      <option v-for="item in engines" :value="item[0]" :selected="item[0] === defaultEngine">{{ item[0] }}</option>
    </select> -->


  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { NInput, NIcon, NButton, NDropdown, type DropdownOption } from 'naive-ui'
import { Search } from '@vicons/fa'
const searchContext = ref<string>('');
const defaultEngine = ref<string>('bing');
const enginesOptions : Array<DropdownOption>= [
  {
    label: 'bing',
    key: 'bing',
  },
  {
    label: 'google',
    key: 'google',
  }
]
const engines = reactive<Map<string, string>>(new Map<string, string>());
function finish(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    search()
  }
}
function search() {
  window.open(engines.get(defaultEngine.value) + searchContext.value, '_blank');
}
function updateEngine(_: string | number, option: DropdownOption) {
  defaultEngine.value = option.label as string ??'bing';
  
}
onMounted(() => {
  engines.set('bing', 'https://www.bing.com/search?q=');

  engines.set('google', 'https://www.google.com/search?q=');

  let storage = localStorage.getItem('engines');
  if (storage) {
    let data = JSON.parse(storage);
    for (let key in data) {
      engines.set(key, data[key]);
    }
  }
  let de = localStorage.getItem('defaultEngine');
  if (de) {
    defaultEngine.value = de;
  }
});
</script>

<style scoped>
.searchBox {
  padding: 6px 6px 6px 6px;
  display: flex;

  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  gap: 10px;
}

.engine {
  font-size: 24px;
  color: #0441f9;
  border: 0px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
}

.inputBox {
  border: 0px solid rgba(0, 0, 0, 0);
  font-size: 16px;
  flex: 1;
}

.inputBox:focus {
  outline: none;
}

.inputBtn {
  color: rgba(0, 0, 0, 0.5);
}

.inputBtn:hover {
  cursor: pointer;
  color: #000;
}

/* 超小设备 (手机, 600px 以下屏幕设备) */
@media only screen and (max-width: 600px) {
  .searchBox {
    width: 90%;
    gap: 5px;
  }

  .engine {
    width: 80px;
    appearance: none;
  }

  .engine::-ms-expand {
    display: none;
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