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
        <n-input v-if="f.type === 'link'" v-model:value="f.href">
            <template #prefix>
                <div style="width: 70px;">
                    链接
                </div>
            </template>
        </n-input>
        <n-input v-model:value="f.iconHref">
            <template #prefix>
                <div style="width: 70px;">
                    图标链接
                </div>
            </template>
        </n-input>
        <n-button type="primary" @click="add">添加</n-button>
    </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    NFlex, NInput, NRadioGroup, NSpace, NRadio,
    NButton, useDialog
} from 'naive-ui';
import { BookMarkerStore } from '../store/book_marker_stroe';
const f = ref<import('../models/book_marker_add').BookMarkerAdd>(
    {
        tagName: '',
        href: '',
        iconHref: '',
        type: 'link'
    }
)
const dialog = useDialog()
function add() {
    BookMarkerStore.addMarker(f.value)
    dialog.destroyAll()
}
</script>