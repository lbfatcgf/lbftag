package models

import "gorm.io/gorm"

type SearchEngin struct {
	gorm.Model
	Titile string `json:"title" grom:"not null; default:''"`
	Link   string `json:"link" grom:"not null; default:''"`
}

func (SearchEngin) TableName() string {
	return "search_engin"
}
