package dbsource

import (
	"fmt"
	"os"

	"github.com/lbfatcgf/lbftag/internal/models"
	"gorm.io/driver/sqlite" // Sqlite driver based on CGO

	// "github.com/glebarez/sqlite" // Pure-Go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	// "github.com/libtnb/sqlite" // Pure-Go SQLite driver, checkout https://github.com/libtnb/sqlite for details
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	cd, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}
	fmt.Println(cd + "/lbftag/lbftag.db")
	source, err := gorm.Open(sqlite.Open(cd+"/lbftag/lbftag.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	db = source
	db.AutoMigrate(&models.MarkNode{})
}

func Db() *gorm.DB {
	return db
}
