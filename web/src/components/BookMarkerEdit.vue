<template>
    <n-flex style="position: relative;">
        <div :class="isLoading ? 'loading' : 'unloading'">
            <n-spin size="large"></n-spin>
        </div>
        <n-input v-model:value="markerFrom.tagName">
            <template #prefix>
                <div class="i_tag">标签名:</div>
            </template>
        </n-input>
        <n-input v-if="markerType() === 'link'" v-model:value="markerFrom.url">
            <template #prefix>
                <div class="i_tag">链接:</div>
            </template>
        </n-input>
        <n-input v-model:value="markerFrom.icon">
            <template #prefix>
                <div class="i_tag">图标链接:</div>
            </template>
        </n-input>
        <n-button @click="remove" type="warning" :loading="isDeleteing"> 删除 </n-button>
        <n-button @click="save" type="primary" :loading="isDeleteing">保存</n-button>
    </n-flex>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBookMarkStore } from '../store/book_marker_stroe';
import {
    NInput, NFlex,
    NButton, useNotification,
    useDialog,
    NSpin
} from 'naive-ui';
import { BookMarkerNode } from '../models/book_marker';
import { MarkApi } from '../api/marks';
const mApi = new MarkApi()
const markStore = useBookMarkStore()
const markerFrom = ref<BookMarkerNode>({
    tagName: '',
    type: '',
    icon: '',
    url: '',
    code: '',
    hasChildren: false,
    deep: 0
})
const dialog = useDialog()
const notification = useNotification()
const isLoading = ref(false)
async function loadMarkInfo() {
    try {
        isLoading.value = true

        const res = await mApi.markInfo(markStore.editMarkerCode)
        if (res.code === "200") {
            markerFrom.value = res.data!
        }
        isLoading.value = false
    } catch (e) {
        isLoading.value = false
    }
}
onMounted(() => {
    loadMarkInfo()
})
function markerType(): 'link' | 'dir' {
    // if (markStore.editMarkerIndex === null) return 'link'
    // return markStore.currentMarker.children[markStore.editMarkerIndex!].type
    return 'link'
}

const isDeleteing = ref(false)
function remove() {
    isDeleteing.value = true
    mApi.deleteMark(markerFrom.value.code)
        .then(res => {
            isDeleteing.value = false
            if (res.code === '200') {
                markStore.editMarkerCode = ''
                markStore.loadMarker()
                dialog.destroyAll()
                notification.success({
                    content: '移除成功',
                    duration: 2000
                })
                return
            }
            notification.error({
                content: JSON.stringify(res)
            })
        })
        .catch(e => {
            isDeleteing.value = false
            notification.error({
                content: JSON.stringify(e)
            })
        })

}

const isSaving = ref(false)
async function save() {

    try {
        isSaving.value = true
        const res = await mApi.updateMark(markerFrom.value)
        isSaving.value = false
        if (res.code === "200") {

            markStore.loadMarker()
            markStore.editMarkerCode = ''
            dialog.destroyAll()
            notification.success({
                content: '修改成功',
                duration: 2000
            })
        } else {
            notification.error({
                content: JSON.stringify(res)
            })

        }
    } catch (e) {
        isSaving.value = false
        notification.error({
            content: JSON.stringify(e)
        })
    }



}
</script>

<style scoped>
.i_tag {
    width: 70px;
    font-weight: bold;
}
</style>