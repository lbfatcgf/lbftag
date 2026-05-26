import { reactive } from "vue";
import { bookMarkerNodeToJson, creareBookMarkerDir, createBookMarkerLink, jsonToBookMarkerNode, type BookMarkerNode } from "../models/book_marker";
import type { BookMarkerPath } from "../models/book_marker_path";


export const BookMarkerStore = reactive<{
    bookMarker: BookMarkerNode,
    currentMarker: BookMarkerNode,
    markerPath: BookMarkerPath[],
    editMarkerIndex: number | null,
    loadMarker: () => void,
    saveMarker: () => void,
    clickMarker: (node: BookMarkerNode, index: number) => void,
    backMarkerPath: (latest: number) => void,
    importFormHtml: (file: File) => void,
    importFormJson: (file: File) => void,
    _bookMarkerParser: (content: string) => void,
    _newDir: (e: Element) => BookMarkerNode,
    _newLink: (e: Element) => BookMarkerNode,
    _createChildTree: (dom: Element) => BookMarkerNode[],
    clearAll: () => void,
    exportFile: () => void
}>({
    bookMarker: { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' },
    currentMarker: { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' },
    markerPath: [{ index: 0, tagName: "/" }],
    editMarkerIndex: null,
    loadMarker() {
        let cache = localStorage.getItem('bookMarker');
        if (cache) {
            // debugger
            this.bookMarker = jsonToBookMarkerNode(cache);
            this.currentMarker = this.bookMarker
        }
    },
    saveMarker() {
        localStorage.setItem('bookMarker', bookMarkerNodeToJson(this.bookMarker))
    },
    clickMarker(node: BookMarkerNode, index: number) {
        this.markerPath.push({ index: index, tagName: node.tagName })
        this.currentMarker = node
        this.currentMarker.children.sort(sortBookMarker)
    },
    backMarkerPath(latest: number) {
        if (latest === 0) {
            this.markerPath = this.markerPath.slice(0, 1)
            this.currentMarker = this.bookMarker
            return
        }
        this.markerPath = this.markerPath.splice(0, latest + 1)
        let bml: BookMarkerNode = this.bookMarker
        if (this.markerPath.length === 1) {
            this.currentMarker = bml
            return
        }
        for (let i = 1; i < this.markerPath.length; i++) {
            bml = bml.children[this.markerPath[i].index]
        }
        this.currentMarker = bml
        this.currentMarker.children.sort(sortBookMarker)
    },
    importFormHtml(file: File) {
        var reader = new FileReader();
        reader.readAsText(file);
        const selt = this
        reader.onload = function (e: ProgressEvent<FileReader>) {
            var content = e.target?.result ?? '';
            // console.log(content);
            selt._bookMarkerParser(content.toString());
            // console.log(bookMarkerNodeToJson(bm.value));
            // currenBm.value = bm.value
            selt.currentMarker = selt.bookMarker

        }
    },
    importFormJson(file: File) {
        var reader = new FileReader();
        reader.readAsText(file);
        const selt = this
        reader.onload = (e: ProgressEvent<FileReader>) => {
            var content = e.target?.result as string ?? '';
            if (content.length > 0) {
                selt.bookMarker = jsonToBookMarkerNode(content)
                selt.saveMarker()
                selt.currentMarker = selt.bookMarker
            }
        }
    },
    _bookMarkerParser(content: string) {
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
                        let n = this._newDir(celement)


                        this.bookMarker.children.push(n);
                    } else if (celement.tagName === "A") {


                        this.bookMarker.children.push(this._newLink(celement));
                        continue;
                    }
                    if (celement.tagName === "DL") {

                        let cl = this._createChildTree(celement);
                        this.bookMarker.children[this.bookMarker.children.length - 1].children.push(...cl)

                    }
                }

            }

        }

        this.saveMarker()
    },
    _newDir(e: Element): BookMarkerNode {
        let title = (e as HTMLElement).innerText;
        return creareBookMarkerDir(title, null)
    },
    _newLink(e: Element): BookMarkerNode {
        let title = (e as HTMLElement).innerText;
        let href = e.getAttribute("href") ?? '';
        let url = new URL(href);
        return createBookMarkerLink(title, href, url.host + '/favicon.ico')
    },
    _createChildTree(dom: Element): BookMarkerNode[] {
        let l = dom.children;
        let treel: BookMarkerNode[] = new Array<BookMarkerNode>;

        for (let i = 0; i < dom.childElementCount; i++) {
            let celement = l[i] as Element;
            if (celement.childElementCount === 1) {
                treel.push(this._newLink(celement.children[0]));
            } else if (celement.childElementCount === 3) {
                let dir: BookMarkerNode = this._newDir(celement.children[0]);
                let dt = this._createChildTree(celement.children[1])
                if (dt instanceof Array) {

                    dir.children.push(...dt);
                } else {

                }

                treel.push(dir);
            }
        }
        return treel;
    },
    clearAll() {
        this.bookMarker = { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' }
        this.currentMarker = { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' }
        this.markerPath = [{ index: 0, tagName: "/" }]
        localStorage.removeItem('bookMarker')
    },
    exportFile() {
        const data = bookMarkerNodeToJson(this.bookMarker)
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url;
        a.download = 'bookmarks.lbftag.json';
        a.click()

    },
})

function sortBookMarker(a: BookMarkerNode, b: BookMarkerNode): number {
    let al = a.type === 'dir' ? 1 : 0
    let bl = b.type === 'dir' ? 1 : 0
    return bl - al
}