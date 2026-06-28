package internal

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/dbsource/configcurd"
	"github.com/lbfatcgf/lbftag/internal/server"
	logtool "github.com/lbfatcgf/lbftag/tool/logtool"
)

func Start() {
	createConfigDir()
	createDbFile()
	dbsource.InitDB()
	err := configcurd.ReadConfig()
	if err != nil {
		panic(err)
	}
	reStartCh := make(chan bool)
	go server.StratHttp(reStartCh)
	StartTuoPan()

	// 监听系统信号，优雅关闭
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	breakLoop := false
	for {
		if breakLoop {
			break
		}
		select {
		case <-sigCh:
			fmt.Println("正在关闭服务...")
			ctx := context.Background()
			server.Stop(ctx)
			logtool.CloseAllLog()
			breakLoop = true
		case needReload := <-reStartCh:
			if needReload {
				fmt.Println("正在重启服务...")
				err := configcurd.ReadConfig()
				if err != nil {
					panic(err)
				}
				ctx := context.Background()
				server.Stop(ctx)
				go server.StratHttp(reStartCh)
			}

		}
	}

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
