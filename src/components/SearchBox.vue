<template>
  <div class="searchBox">
    <select class="engine"  @change="updateEngine">
      <option v-for="item in engines" :value="item[0]" :selected="item[0]===defaultEngine">{{ item[0] }}</option>
    </select>
    <input type="search" v-model="searchContext" @keydown="finish" class="inputBox">
    <svg class="inputBtn" @click="search" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 1664 1664" preserveAspectRatio="none">
      <path fill="currentColor"
        d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704m512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const searchContext = ref<string>('');
const defaultEngine = ref<string>('bing');
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
function updateEngine(event: Event) {
  const target = event.target as HTMLSelectElement;
  defaultEngine.value = target.value;
  localStorage.setItem('defaultEngine', defaultEngine.value);
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
  let de=localStorage.getItem('defaultEngine');
  if(de){
    defaultEngine.value=de;
  }
});
</script>

<style scoped>
.searchBox {
  padding: 10px;
  border-radius: 5px;
  border: 0px solid rgba(0, 0, 0, 0);

  background-color: rgba(255, 255, 255, 1);
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
.inputBtn{
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
  .engine{
    width: 80px;
    appearance: none;
  }
  .engine::-ms-expand{
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