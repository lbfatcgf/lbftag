<template>
    <div>
        <n-flex>
            <div v-for="item in seStore.engines" :key="item.title" style="width: 100%;" >
                <n-flex justify="space-between" style="width: 100%;" align="center">

                    <div>
                        {{ item.title }}
                    </div>
                    <div>
                        {{ item.link }}
                    </div>
                    <n-button type="warning" @click="deleteSe(item)">删除</n-button>
                </n-flex>
            </div>
            <n-divider></n-divider>
            <n-flex style="gap: 10px;">
                <n-input :placeholder="'引擎'" v-model:value="addEngin.title"></n-input>
                <n-input :placeholder="'链接'" v-model:value="addEngin.link"></n-input>
                <n-button type="primary" @click="add" :loading="isAdding">添加</n-button>
            </n-flex>
        </n-flex>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NFlex,NInput,NButton,NDivider, createDiscreteApi } from 'naive-ui';
import { useSerchEngineStore } from '../store/search_engins_stroe';
import { SearchEngine } from '../models/search_engin';

const seStore=useSerchEngineStore()

const addEngin=ref<SearchEngine>({
    title:'',link:''
})
const { message  } = createDiscreteApi(
  ['message', ],
)
const isAdding=ref(false)
function add() {
    isAdding.value=true
    seStore.addEngines(addEngin.value).then(res=>{
        seStore.loadEngines()
        isAdding.value=false
        addEngin.value= {title:'',link:''}
    }).catch(err=>{
        isAdding.value=false

    })
}

function deleteSe(se : SearchEngine) {
    if (se.ID===null){
        return
    }
    if (se.title===seStore.currentEngine){
        message.error('不能删除默认搜索引擎')
        return
    }
    seStore.deleteEnigne(se.ID!).then(()=>{
        seStore.loadEngines()
    })
}
</script>