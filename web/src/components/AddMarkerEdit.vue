<template>
    <n-flex>

        <n-input v-model:value="f.tagName">
            <template #prefix>
                <div style="width: 70px;">
                    标签名
                </div>
            </template>
        </n-input>
        <n-radio-group v-model:value="f.type">
            <n-space>
                <n-radio key="link" value="link">链接</n-radio>
                <n-radio key="dir" value="dir">目录</n-radio>
            </n-space>
        </n-radio-group>
        <n-input v-if="f.type === 'link'" v-model:value="f.url">
            <template #prefix>
                <div style="width: 70px;">
                    链接
                </div>
            </template>
        </n-input>
        <n-input v-model:value="f.icon">
            <template #prefix>
                <div style="width: 70px;">
                    图标链接
                </div>
            </template>
        </n-input>
        <n-button type="primary" @click="add" :loading="isAdding">添加</n-button>
    </n-flex>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
    NFlex, NInput, NRadioGroup, NSpace, NRadio,
    NButton, useDialog,
    useNotification
} from 'naive-ui';
import { useBookMarkStore } from '../store/book_marker_stroe';

import { BookMarkerNode } from '../models/book_marker';
import { MarkApi } from '../api/marks';
const mApi = new MarkApi()
const markStore = useBookMarkStore()
const f = ref<BookMarkerNode>(
    {
        tagName: '',
        url: '',
        icon: '',
        type: 'link',
        code: '',
        hasChildren: false,
        deep: 0
    }
)
const notification = useNotification()
const dialog = useDialog()
const isAdding = ref(false)
function add() {
    isAdding.value = true
    mApi.addMark(f.value)
        .then(res => {
            isAdding.value = false
            if (res.code === '200') {
                markStore.loadMarker()
                dialog.destroyAll()
                return
            }
            notification.error({
                content: JSON.stringify(res)
            })
        })
        .catch(e => {
            isAdding.value = false
            notification.error({
                content: JSON.stringify(e)
            })
        })
}

function init() {
    f.value.parent = markStore.markerPath[markStore.markerPath.length - 1].code
    f.value.deep = markStore.markerPath[markStore.markerPath.length - 1].deep + 1

}
onMounted(() => {
    init()
});
</script>