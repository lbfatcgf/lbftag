<template>
	<div style="width: 100%;">
		<n-flex v-if="markStore.bookMarker.length > 0" style="width: 100%; position: relative;">
			<BookMarkerItem :bm-index="index" :bm="value" v-for="(value, index) in markStore.bookMarker"
				:key="value.tagName + index">

			</BookMarkerItem>
			<AddMarker />
			<div :class="markStore.loadingMark? 'loading':'unloading'" >
				<n-spin size="large" style="margin: auto;" />
			</div>

		</n-flex>
		<n-flex v-else style="width: 100%;" justify="center" align="center">
			<div>
				<div style="margin: auto;width: fit-content;color: rgba(255, 255, 255, 0.8);">空的</div>

			</div>
			<AddMarker />
		</n-flex>
	</div>
</template>
<script setup lang="ts">
import { NFlex, NSpin } from 'naive-ui';
import BookMarkerItem from './BookMarkerItem.vue';
import AddMarker from './AddMarker.vue';
import { onMounted } from 'vue';
import { useBookMarkStore } from '../store/book_marker_stroe.js';
const markStore = useBookMarkStore()
const emit = defineEmits<{
	(e: "clickDir", coordinates: Array<number>, tagName: string): void
}>()


onMounted(() => {
	init()
})

async function init() {
	try {
		markStore.loadingMark = true
		await markStore.loadMarker()
		markStore.loadingMark = false

	} catch (e) {
		markStore.loadingMark = false
		console.log(e)
	}
}



// function clickDir(node: BookMarkerNode, index: number) {
// 	coordinates.push(index)
// 	currenBm.value = jsonToBookMarkerNode(bookMarkerNodeToJson(node))
// 	emit('clickDir', coordinates, node.tagName)

// }

</script>

<style scoped>
.loading {
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	left: 0px;
	backdrop-filter: blur(5px);
	background-color: rgba(0, 0, 0, 0.4);
}
.unloading{
	display: none;
}
</style>