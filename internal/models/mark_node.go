package models

import "gorm.io/gorm"

const (
	MARK_DIR  = "dir"
	MARK_LINK = "link"
)

type MarkNode struct {
	gorm.Model
	Type        string `json:"type" grom:"not null; default:'link'"`
	Icon        string `json:"icon" grom:"not null; default:''"`
	Url         string `json:"url" grom:"not null; default:''"`
	TagName     string `json:"tagName" grom:"not null; default:''"`
	Code        string `json:"code" grom:"index:idx_mark_node_code,unique;not null"`
	Parent      string `json:"parent" grom:"not null; default:''"`
	HasChildren bool   `json:"hasChildren" grom:"not null; default:false"`
	Deep        int    `json:"deep" grom:"not null; default:1"`
}

func (MarkNode) TableName() string {
	return "mark_node"
}
