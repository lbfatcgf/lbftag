

export type BookMarkerNode = {
    tagName: string;
    type: 'link' | 'dir';
    href: string | null | undefined;
    icon: string | null | undefined;
    children: Array<BookMarkerNode> | BookMarkerNode[];

}

