<template>
	<n-flex v-if="currenBm.children.length > 0" style="width: 100%;">

		<div v-for="(value, index) in currenBm.children" @click="clickDir(value, index)" :key="value.tagName+index">
			{{ value.tagName }}
		</div>
	</n-flex>
	<div v-else style="width: 100%;">
		<div style="height: 100px; ">
			<div style="margin: auto;width: fit-content;color: rgba(255, 255, 255, 0.8);">空的</div>

		</div>
	</div>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { jsonToBookMarkerNode, type BookMarkerNode, creareBookMarkerDir, createBookMarkerLink, bookMarkerNodeToJson } from '../models/book_marker';

const emit = defineEmits<{
	(e: "clickDir", coordinates: Array<number>, tagName: string): void
}>()
const coordinates = new Array<number>()
let bm = ref<BookMarkerNode>({ children: new Array(), tagName: '/', icon: null, href: '' } as BookMarkerNode)
const currenBm = ref<BookMarkerNode>({ children: new Array(), tagName: '/', icon: null, href: '' } as BookMarkerNode)
const loadBookMarkerFormCache = () => {
	const cache = localStorage.getItem('bm')
	if (!cache) {
		return
	}
	bm.value = jsonToBookMarkerNode(cache)
	currenBm.value = bm.value
}

onMounted(() => {
	loadBookMarkerFormCache()
})
function inputFile(file: File) {
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function (e: ProgressEvent<FileReader>) {
		var content = e.target?.result ?? '';
		// console.log(content);
		bookMarkParser(content.toString());
		console.log(bookMarkerNodeToJson(bm.value));
		currenBm.value = bm.value
	

	}

}
defineExpose({
	inputFile
})
const bookMarkParser = (content: string) => {
	if (content.length === 0) {
		return
	}
	let parser = new DOMParser();
	let xmlDoc = parser.parseFromString(content, "text/html");
	let re = xmlDoc.querySelector("DL")?.children;
	if (re === null) {
		return
	}
	// debugger
	for (let i = 0; i < re!.length; i++) {
		const element = re![i];
		if (element.tagName == "DT") {

			let clist = element.childNodes;
			for (let index = 0; index < clist.length; index++) {
				const celement = clist[index] as Element;
				if (celement.tagName === "H3") {
					let n = newDir(celement)


					bm.value.children.push(n);
				} else if (celement.tagName === "A") {


					bm.value.children.push(newLink(celement));
					continue;
				}
				if (celement.tagName === "DL") {

					let cl = createChildTree(celement);
					bm.value.children[bm.value.children.length-1].children.push(cl)
				}
			}

		}

	}


}
function createChildTree(dom: ChildNode): BookMarkerNode {
	let l = dom.childNodes;
	let treel: BookMarkerNode = {} as BookMarkerNode;
	treel.children = []
	for (let i = 0; i < l.length; i++) {
		let celement = l[i] as Element;
		if (celement.children.length === 1) {
			treel.children.push(newLink(celement.childNodes[0] as Element));
		} else {
			let dir: BookMarkerNode = {} as BookMarkerNode
			for (let j = 0; j < celement.children.length; j++) {
				if (celement.children[j].tagName === "H3") {
					dir = newDir(celement.children[j]);
				}
				if (celement.children[j].tagName === "DL") {
					dir.children.push(createChildTree(celement.children[j]));
					treel.children.push(dir);
				}
			}
		}
	}
	return treel;
}
function newDir(e: Element): BookMarkerNode {
	let title = (e as HTMLElement).innerText;
	return creareBookMarkerDir(title, null)
}
function newLink(e: Element): BookMarkerNode {
	let title = (e as HTMLElement).innerText;
	let href = e.getAttribute("href") ?? '';
	let url = new URL(href);
	return createBookMarkerLink(title, href, url.host + '/favicon.ico')
}

function clickDir(node: BookMarkerNode, index: number) {

	coordinates.push(index)
	currenBm.value = jsonToBookMarkerNode(bookMarkerNodeToJson(node))
	emit('clickDir', coordinates, node.tagName)

}
// function findBm(coor: number[], node: BookMarkerNode): BookMarkerNode {
// 	if(coor.length===0){
// 		return node
// 	}
// 	if (coor.length === 1) {
// 		return node.children[coor[0]]
// 	}

// 	return findBm(coor.slice(1, coor.length - 1), node.children[coor[0]])
// }
</script>