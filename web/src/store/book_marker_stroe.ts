import { type BookMarkerNode } from "../models/book_marker";
import type { BookMarkerPath } from "../models/book_marker_path";
import { MarkApi } from "../api/marks";
import { createDiscreteApi, type NotificationApi } from "naive-ui";
import { defineStore } from "pinia";
const markApi = new MarkApi();

const { notifi } = createDiscreteApi(
    ['notification'],

)

function sortBookMarker(a: BookMarkerNode, b: BookMarkerNode): number {
    let al = a.type === 'dir' ? 1 : 0
    let bl = b.type === 'dir' ? 1 : 0
    return bl - al
}
export const useBookMarkStore = defineStore('bookMark', {
    state: () => {
        return {
            bookMarker: [] as BookMarkerNode[],

            markerPath: [{ code: '', tagName: "/", deep: 0 }] as BookMarkerPath[],
            editMarkerCode: '',
            loadingMark: false,
        }
    },
    actions: {
        async loadMarker() {

            const code = this.markerPath[this.markerPath.length - 1].code ?? ''
            const res = await markApi.list(code)
            if (res.code === "200") {
                this.bookMarker = res.data ?? [];
                this.bookMarker.sort(sortBookMarker)
                return
            }

            (notifi as NotificationApi).error({
                title: JSON.stringify(res),
            })
        },
        async clickMarker(node: BookMarkerNode) {

            try {
                const res = await markApi.list(node.code)

                if (res.code === "200") {
                    this.bookMarker = res.data ?? []
                    this.markerPath.push({
                        code: node.code,
                        tagName: node.tagName,
                        deep: node.deep
                    })
                    return
                }
                (notifi as NotificationApi).error({
                    title: JSON.stringify(res),
                })
            } catch (error) {
                (notifi as NotificationApi).error({
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
        async importFormHtml(file: File) {
            try {

                await markApi.importMarks(file)

                this.loadMarker()
            } catch (err) {
                console.log(err);

            }


        },
        importFormJson(file: File) {
            console.log(file.name);
        },




        async clearAll() {
            try {

                await markApi.clearAll()
            } catch {

            }
            this.loadMarker()
        },

    }

})