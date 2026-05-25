<template>
    <div>
        <div class="dir" v-if="bm.type === 'dir'" @click="handleClick">{{ 'dir' + bm.tagName }}</div>
        <a v-else :href="bm.href ?? ''" target="_blank">{{ bm.tagName }}</a>
    </div>
</template>

<script setup lang="ts">
import type { BookMarkerNode } from '../models/book_marker';
import { BookMarkerStore } from '../store/book_marker_stroe';
const props = defineProps<{
    bm: BookMarkerNode,
    bmIndex: number
}>()
// const emit = defineEmits<{
//     (e: 'click-item', bm: BookMarkerNode, index: number): void
// }>()
function handleClick() {
    BookMarkerStore.clickMarker(props.bm,props.bmIndex)
}
</script>

<style scoped>

.dir:hover{
    cursor: pointer;
}
</style>