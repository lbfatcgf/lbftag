

export type BookMarkerNode = {
    ID?:          number;
    CreatedAt?:   string;
    UpdatedAt?:   string;
    DeletedAt?:   string;
    type:        string;
    icon:        string;
    url:         string;
    tagName:     string;
    code:        string;
    paren?:      string;
    hasChildren: boolean;
    deep:        number;
}

