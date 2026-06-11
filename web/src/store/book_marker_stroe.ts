import { reactive } from "vue";
import { type BookMarkerNode } from "../models/book_marker";
import type { BookMarkerPath } from "../models/book_marker_path";
import type { BookMarkerFrom } from "../models/book_marker_from";
import type { BookMarkerAdd } from "../models/book_marker_add";
import { MarkApi } from "../apt/marks";
import { useNotification } from "naive-ui";
import { defineStore } from "pinia";
const markApi = new MarkApi();
const notifi = useNotification();


function sortBookMarker(a: BookMarkerNode, b: BookMarkerNode): number {
    let al = a.type === 'dir' ? 1 : 0
    let bl = b.type === 'dir' ? 1 : 0
    return bl - al
}
export const useBookMarkStore = defineStore('bookMark', {
    state: () => {
        return {
            bookMarker: [] as BookMarkerNode[],

            markerPath: [{ code: '', tagName: "/" }] as BookMarkerPath[],
            editMarkerIndex: null as number | null,
            loadingMark: false,
        }
    },
    actions: {
        async loadMarker() {

            const code = this.markerPath[this.markerPath.length - 1].code ?? ''
            const res = await markApi.list(code)
            if (res.code === "200") {
                this.bookMarker = res.data ?? [];
                return
            }
            notifi.error({
                title: JSON.stringify(res),
            })
        },
        saveMarker() {

        },
        removeMarker() {

        },
        updateMarker(mf: BookMarkerFrom) {


        },
        addMarker(add: BookMarkerAdd) {

        },
        async clickMarker(node: BookMarkerNode) {
            try {
                const res = await markApi.list(node.code)

                if (res.code === "200") {
                    this.bookMarker = res.data ?? []
                    this.markerPath.push({
                        code: node.code,
                        tagName: node.tagName
                    })
                    return
                }
                notifi.error({
                    title: JSON.stringify(res),
                })
            } catch (error) {
                notifi.error({
                    title: (error as Error).message,
                })
            }

        },
        async backMarkerPath(latest: number) {
            // debugger
            if (latest < 1) {
                this.markerPath = this.markerPath.slice(0, 1)
            } else {

                this.markerPath = this.markerPath.slice(0, latest + 1)
            }
            this.loadingMark = true
            try {

                await this.loadMarker()
                this.loadingMark = false
            } catch (e) {
                this.loadingMark = false

            }
        },
        importFormHtml(file: File) {

        },
        importFormJson(file: File) {

        },




        clearAll() {

        },
        exportFile() {
            // const data = bookMarkerNodeToJson(this.bookMarker)
            // const blob = new Blob([data], { type: 'application/json' })
            // const url = URL.createObjectURL(blob)
            // const a = document.createElement('a')
            // a.href = url;
            // a.download = 'bookmarks.lbftag.json';
            // a.click()

        },
    }

})