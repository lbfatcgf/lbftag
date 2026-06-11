export type BookMarkerAdd = {
    tagName: string,
    url: string,
    icon: string,
    type: 'dir' | 'link',
    parent: string
}