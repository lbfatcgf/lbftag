import { reactive } from "vue";
import { bookMarkerNodeToJson, creareBookMarkerDir, createBookMarkerLink, jsonToBookMarkerNode } from "../models/book_marker";
export const BookMarkerStore = reactive({
    bookMarker: { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' },
    currentMarker: { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' },
    markerPath: [{ index: 0, tagName: "/" }],
    editMarkerIndex: null,
    loadMarker() {
        let cache = localStorage.getItem('bookMarker');
        if (cache) {
            // debugger
            this.bookMarker = jsonToBookMarkerNode(cache);
            this.currentMarker = this.bookMarker;
        }
    },
    saveMarker() {
        localStorage.setItem('bookMarker', bookMarkerNodeToJson(this.bookMarker));
    },
    removeMarker() {
        if (this.editMarkerIndex !== null) {
            this.currentMarker.children.splice(this.editMarkerIndex, 1);
            this.saveMarker();
        }
    },
    updateMarker(mf) {
        if (this.editMarkerIndex === null)
            return;
        this.currentMarker.children[this.editMarkerIndex].tagName = mf.tagName;
        this.currentMarker.children[this.editMarkerIndex].icon = mf.iconHref;
        this.currentMarker.children[this.editMarkerIndex].href = mf.href;
        this.saveMarker();
    },
    addMarker(add) {
        const newNode = {
            tagName: add.tagName,
            type: add.type,
            href: add.href,
            icon: add.iconHref,
            children: []
        };
        this.currentMarker.children.push(newNode);
        this.saveMarker();
    },
    clickMarker(node, index) {
        this.markerPath.push({ index: index, tagName: node.tagName });
        this.currentMarker = node;
        this.currentMarker.children.sort(sortBookMarker);
    },
    backMarkerPath(latest) {
        if (latest === 0) {
            this.markerPath = this.markerPath.slice(0, 1);
            this.currentMarker = this.bookMarker;
            return;
        }
        this.markerPath = this.markerPath.splice(0, latest + 1);
        let bml = this.bookMarker;
        if (this.markerPath.length === 1) {
            this.currentMarker = bml;
            return;
        }
        for (let i = 1; i < this.markerPath.length; i++) {
            bml = bml.children[this.markerPath[i].index];
        }
        this.currentMarker = bml;
        this.currentMarker.children.sort(sortBookMarker);
    },
    importFormHtml(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        const selt = this;
        reader.onload = function (e) {
            var content = e.target?.result ?? '';
            // console.log(content);
            selt._bookMarkerParser(content.toString());
            // console.log(bookMarkerNodeToJson(bm.value));
            // currenBm.value = bm.value
            selt.currentMarker = selt.bookMarker;
        };
    },
    importFormJson(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        const selt = this;
        reader.onload = (e) => {
            var content = e.target?.result ?? '';
            if (content.length > 0) {
                selt.bookMarker = jsonToBookMarkerNode(content);
                selt.saveMarker();
                selt.currentMarker = selt.bookMarker;
            }
        };
    },
    _bookMarkerParser(content) {
        if (content.length === 0) {
            return;
        }
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(content, "text/html");
        let re = xmlDoc.querySelector("DL")?.children;
        if (re === null) {
            return;
        }
        // debugger
        for (let i = 0; i < re.length; i++) {
            const element = re[i];
            if (element.tagName == "DT") {
                let clist = element.childNodes;
                for (let index = 0; index < clist.length; index++) {
                    const celement = clist[index];
                    if (celement.tagName === "H3") {
                        let n = this._newDir(celement);
                        this.bookMarker.children.push(n);
                    }
                    else if (celement.tagName === "A") {
                        this.bookMarker.children.push(this._newLink(celement));
                        continue;
                    }
                    if (celement.tagName === "DL") {
                        let cl = this._createChildTree(celement);
                        this.bookMarker.children[this.bookMarker.children.length - 1].children.push(...cl);
                    }
                }
            }
        }
        this.saveMarker();
    },
    _newDir(e) {
        let title = e.innerText;
        return creareBookMarkerDir(title, null);
    },
    _newLink(e) {
        let title = e.innerText;
        let href = e.getAttribute("href") ?? '';
        let url = new URL(href);
        return createBookMarkerLink(title, href, url.host + '/favicon.ico');
    },
    _createChildTree(dom) {
        let l = dom.children;
        let treel = new Array;
        for (let i = 0; i < dom.childElementCount; i++) {
            let celement = l[i];
            if (celement.childElementCount === 1) {
                treel.push(this._newLink(celement.children[0]));
            }
            else if (celement.childElementCount === 3) {
                let dir = this._newDir(celement.children[0]);
                let dt = this._createChildTree(celement.children[1]);
                if (dt instanceof Array) {
                    dir.children.push(...dt);
                }
                else {
                }
                treel.push(dir);
            }
        }
        return treel;
    },
    clearAll() {
        this.bookMarker = { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' };
        this.currentMarker = { children: new Array(), tagName: '/', icon: null, href: '', type: 'dir' };
        this.markerPath = [{ index: 0, tagName: "/" }];
        localStorage.removeItem('bookMarker');
    },
    exportFile() {
        const data = bookMarkerNodeToJson(this.bookMarker);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bookmarks.lbftag.json';
        a.click();
    },
});
function sortBookMarker(a, b) {
    let al = a.type === 'dir' ? 1 : 0;
    let bl = b.type === 'dir' ? 1 : 0;
    return bl - al;
}
