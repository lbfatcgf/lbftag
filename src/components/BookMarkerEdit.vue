<template>
    <div>{{ tagName }}</div>
    <div>{{ href }}</div>
    <div>{{ iconHref }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe';

const tagName = ref<string>('')
const href = ref<string>('')
const iconHref = ref<string>('')
onMounted(() => {
    tagName.value = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].tagName
    href.value = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].href ?? ''
    iconHref.value=BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex!].icon??''
})
</script>