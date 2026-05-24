<template>
    <div>
        <div class="dir" v-if="bm.type === 'dir'" @click="emit('click-item',bm,bmIndex)">{{ 'dir' + bm.tagName }}</div>
        <a v-else :href="bm.href ?? ''" target="_blank">{{ bm.tagName }}</a>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BookMarkerNode } from '../models/book_marker';
const props = defineProps<{
    bm: BookMarkerNode,
    bmIndex: number
}>()
const emit = defineEmits<{
    (e: 'click-item', bm: BookMarkerNode, index: number): void
}>()

</script>

<style scoped>
.dir{

}
.dir:hover{
    cursor: pointer;
}
</style>