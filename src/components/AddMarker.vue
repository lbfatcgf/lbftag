<template>
    <n-popover trigger="hover">
        <template #trigger>
            <div class="marke_item no_glass_box" @click="add">
                <div class="icon_box">
                    <n-icon size="32" color="#0000007c">
                        <Plus></Plus>
                    </n-icon>
                </div>
            </div>
        </template>
        <span>添加</span>
    </n-popover>
</template>

<script setup lang="ts">
import { NIcon, NPopover, useDialog } from 'naive-ui';
import { Plus } from '@vicons/fa'
import { BookMarkerStore } from '../store/book_marker_stroe';
import { h } from 'vue';
import AddMarkerEdit from './AddMarkerEdit.vue';
const dialog = useDialog()
function add() {
    let p = BookMarkerStore.markerPath.map((item) => (item.tagName === '/' ? '..' : item.tagName)).join('/')


    dialog.create(
        {
            title: `路径:${p} 下新建书签`,
            content() {
                return h(
                    AddMarkerEdit
                )
            },
        }
    )
}
</script>

<style scoped>
.marke_item {
    border-radius: 12px;
    padding: 12px 12px 12px 12px;

}

.marke_item:hover {
    cursor: pointer;
}

.icon_box {
    padding: 12px 12px 12px 12px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    /* background: linear-gradient(315deg, #7bff89, #68de73); */
    box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;

}
</style>