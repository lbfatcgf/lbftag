package curd

import (
	"context"

	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/models"
)

func ImportMarks(datas []models.MarkNode) error {
	return dbsource.Db().CreateInBatches(datas, 100).Error
}

func AddMark(data *models.MarkNode) error {
	return dbsource.Db().Create(data).Error
}

func QueryMarks(pCode string) (list []models.MarkNode, err error) {
	err = dbsource.Db().Where("parent = ?", pCode).Find(&list).Error
	return
}
func QueryMark(code string) (res models.MarkNode, err error) {
	err = dbsource.Db().Where("parent = ?", code).First(&res).Error
	return
}
func UpdateMark(data models.MarkNode) error {
	return dbsource.Db().Save(&data).Error
}

func DeleteMark(code string) error {
	ctx := context.Background()
	return dbsource.Db().Where("code = ?", code).Delete(ctx).Error
}
