<template>
	<n-flex v-if="BookMarkerStore.currentMarker.children.length > 0" style="width: 100%;">

		<BookMarkerItem 
		style="width: 100%;" 
		:bm-index="index" :bm="value" 
		v-for="(value, index) in BookMarkerStore.currentMarker.children" 
		:key="value.tagName + index">
			
		</BookMarkerItem>
	</n-flex>
	<div v-else style="width: 100%;">
		<div style="height: 100px; ">
			<div style="margin: auto;width: fit-content;color: rgba(255, 255, 255, 0.8);">空的</div>

		</div>
	</div>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui';
import BookMarkerItem from './BookMarkerItem.vue';
import { onMounted } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe';
const emit = defineEmits<{
	(e: "clickDir", coordinates: Array<number>, tagName: string): void
}>()


onMounted(() => {
	BookMarkerStore.loadMarker()
})





// function clickDir(node: BookMarkerNode, index: number) {
// 	coordinates.push(index)
// 	currenBm.value = jsonToBookMarkerNode(bookMarkerNodeToJson(node))
// 	emit('clickDir', coordinates, node.tagName)

// }

</script>