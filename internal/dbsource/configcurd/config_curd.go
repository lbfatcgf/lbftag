package configcurd

import (
	"sync"

	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/models"
)

func ReadConfig() (err error) {
	var conf models.Config
	var count int64
	err = dbsource.Db().Table(conf.TableName()).Count(&count).Error
	if err != nil {
		return
	}
	if count == 0 {
		err = dbsource.Db().Save(&conf).Error
		if err != nil {
			return
		}
	}
	err = dbsource.Db().First(&conf).Error
	if err != nil {
		return
	}
	models.InitConfig(&conf)
	return

}

var wlock = &sync.RWMutex{}

func SaveConfig() error {
	wlock.Lock()
	defer wlock.Unlock()
	err := dbsource.Db().Save(models.GetConfig()).Error
	return err
}
