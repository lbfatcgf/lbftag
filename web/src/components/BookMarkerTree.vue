<template>
	<n-flex v-if="BookMarkerStore.currentMarker.children.length > 0" style="width: 100%;">

		<BookMarkerItem 
		
		:bm-index="index" :bm="value" 
		v-for="(value, index) in BookMarkerStore.currentMarker.children" 
		:key="value.tagName + index">
			
		</BookMarkerItem>
		<AddMarker/>
		
	</n-flex>
	<n-flex v-else style="width: 100%;" justify="center" align="center">
		<div >
			<div style="margin: auto;width: fit-content;color: rgba(255, 255, 255, 0.8);">空的</div>
		
		</div>
		<AddMarker/>
	</n-flex>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui';
import BookMarkerItem from './BookMarkerItem.vue';
import AddMarker from './AddMarker.vue';
import { onMounted } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe.js';
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