<template>
    <n-flex>
        <n-input v-model:value="markerFrom.tagName">
            <template #prefix>
                <div class="i_tag">标签名:</div>
            </template>
        </n-input>
        <n-input v-if="markerType() === 'link'" v-model:value="markerFrom.href">
            <template #prefix>
                <div class="i_tag">链接:</div>
            </template>
        </n-input>
        <n-input v-model:value="markerFrom.iconHref">
            <template #prefix>
                <div class="i_tag">图标链接:</div>
            </template>
        </n-input>
        <n-button @click="remove" type="warning"> 删除 </n-button>
        <n-button @click="save" type="primary">保存</n-button>
    </n-flex>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe';
import type { BookMarkerFrom } from '../models/book_marker_from'
import {
    NInput, NFlex,
    NButton, useNotification,
    useDialog
} from 'naive-ui';
const markerFrom = ref<BookMarkerFrom>({
    tagName: '',
    href: '',
    iconHref: ''
})
const dialog = useDialog()
const notification = useNotification()
onMounted(() => {
    markerFrom.value.tagName = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].tagName
    markerFrom.value.href = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].href ?? ''
    markerFrom.value.iconHref = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].icon ?? ''
})
function markerType(): 'link' | 'dir' {
    if (BookMarkerStore.editMarkerIndex === null) return 'link'
    return BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].type
}
function remove() {

    BookMarkerStore.removeMarker()
    BookMarkerStore.editMarkerIndex = null
    dialog.destroyAll()
    notification.success({
        content: '移除成功',
        duration: 2000
    })

}
function save() {


    BookMarkerStore.updateMarker(markerFrom.value)
    BookMarkerStore.editMarkerIndex = null
    dialog.destroyAll()
    notification.success({
        content: '修改成功',
        duration: 2000
    })


}
</script>

<style scoped>
.i_tag {
    width: 70px;
    font-weight: bold;
}
</style>