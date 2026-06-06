export function creareBookMarkerDir(tagName, icon) {
    return {
        tagName: tagName,
        icon: icon,
        type: 'dir',
        children: [],
        href: null,
    };
}
export function createBookMarkerLink(tagName, href, icon) {
    return {
        tagName: tagName,
        icon: icon,
        type: 'link',
        href: href,
        children: [],
    };
}
export function bookMarkerNodeToJson(node) {
    return JSON.stringify(node);
}
export function bookMarkerNodeArrayToJson(nodes) {
    return JSON.stringify(nodes);
}
export function jsonToBookMarkerNode(json) {
    return JSON.parse(json);
}
export function jsonToBookMarkerNodeArray(json) {
    return JSON.parse(json);
}
