package internal

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/models"
	"github.com/lbfatcgf/lbftag/internal/server"
	logtool "github.com/lbfatcgf/lbftag/tool/logtool"
)

func Start() {
	createConfigDir()
	createDbFile()
	dbsource.InitDB()
	models.ReadConfig()
	go server.StratHttp()
	StartTuoPan()

	// 监听系统信号，优雅关闭
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	<-sigCh

	fmt.Println("正在关闭服务...")
	ctx := context.Background()
	server.Stop(ctx)
	logtool.CloseAllLog()
}

func createConfigDir() {
	fp, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}
	dir, err := os.Open(fp + "/lbftag")
	if err != nil {
		if os.IsNotExist(err) {
			err = os.MkdirAll(fp+"/lbftag", 0755)
			if err != nil {
				panic(err)
			}
			dir.Close()
			return
		} else {
			panic(err)
		}
	}
	dir.Close()
}

func createDbFile() {
	confDir, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}
	dbFile := confDir + "/lbftag/lbftag.db"
	cf, err := os.Open(dbFile)
	if err != nil {
		if os.IsNotExist(err) {
			cf, err = os.Create(dbFile)
			if err != nil {
				// 创建文件失败
				panic(err)
			}
		} else {
			panic(err)
		}
	}

	defer cf.Close()
	fmt.Println("数据库文件已存在")
}
