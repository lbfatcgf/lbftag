package engincurd

import (
	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/models"
)

func List() (list []models.SearchEngin, err error) {
	err = dbsource.Db().Find(&list).Error
	return
}

func Add(e *models.SearchEngin) error {
	return dbsource.Db().Create(e).Error
}

func Delete(id uint) error {
	e := models.SearchEngin{}
	e.ID = id
	return dbsource.Db().Delete(&e).Error
}
