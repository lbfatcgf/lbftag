<template>
	<n-flex v-if="currenBm.children.length > 0" style="width: 100%;">

		<BookMarkerItem 
		style="width: 100%;" 
		:bm-index="index" :bm="value" 
		v-for="(value, index) in currenBm.children" 
		@click-item="clickDir(value, index)" 
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
import { onMounted, ref } from 'vue';
import { jsonToBookMarkerNode, type BookMarkerNode, creareBookMarkerDir, createBookMarkerLink, bookMarkerNodeToJson } from '../models/book_marker';

const emit = defineEmits<{
	(e: "clickDir", coordinates: Array<number>, tagName: string): void
}>()
let coordinates = new Array<number>()
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
		// console.log(bookMarkerNodeToJson(bm.value));
		currenBm.value = bm.value
		

	}

}
function changeBMDir(len:number){
	if(len===0){
		coordinates=[]
		currenBm.value=bm.value
		return
	}
	coordinates=coordinates.splice(0,len)
	currenBm.value=findBm()
}
defineExpose({
	inputFile,
	changeBMDir
})

function findBm() :BookMarkerNode{
	let bml:BookMarkerNode=bm.value
	if(coordinates.length===0) return bml
	for(let i=0;i<coordinates.length;i++){
		bml = bml.children[coordinates[i]]
	}
	return bml
}
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
					bm.value.children[bm.value.children.length - 1].children.push(...cl)

				}
			}

		}

	}


}
function createChildTree(dom: Element): BookMarkerNode[] {
	// debugger
	let l = dom.children;
	let treel: BookMarkerNode[] = new Array<BookMarkerNode>;

	for (let i = 0; i < dom.childElementCount; i++) {
		let celement = l[i] as Element;
		if (celement.childElementCount === 1) {
			treel.push(newLink(celement.children[0]));
		} else if (celement.childElementCount === 3) {
			let dir: BookMarkerNode = newDir(celement.children[0]);
			let dt = createChildTree(celement.children[1])
			if (dt instanceof Array) {

				dir.children.push(...dt);
			} else {

			}

			treel.push(dir);
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