

export type BookMarkerNode = {
    tagName: string;
    type: 'link' | 'dir';
    href: string | null | undefined;
    icon: string | null | undefined;
    children: BookMarkerNode[] | null | undefined;

}

export function creareBookMarkerDir(tagName: string, icon: string | null | undefined): BookMarkerNode {
    return {
        tagName: tagName,
        icon: icon,
        type: 'dir',
        children: [],
        href: null,
    } as BookMarkerNode;
}

export function createBookMarkerLink(tagName: string, href: string | null | undefined, icon: string | null | undefined): BookMarkerNode {
    return {
        tagName: tagName,
        icon: icon,
        type: 'link',
        href: href,
        children: null,
    } as BookMarkerNode;
}

export function bookMarkerNodeToJson(node: BookMarkerNode): string {
    return JSON.stringify(node);
}

export function bookMarkerNodeArrayToJson(nodes: Array<BookMarkerNode> | BookMarkerNode[]): string {
    return JSON.stringify(nodes);
}

export function jsonToBookMarkerNode(json: string): BookMarkerNode {
    return JSON.parse(json) as BookMarkerNode;
}

export function jsonToBookMarkerNodeArray(json: string): Array<BookMarkerNode> {
    return JSON.parse(json) as Array<BookMarkerNode>;
}

