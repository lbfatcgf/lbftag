package internal

import (
	"fmt"
	"os"
	"runtime"

	"github.com/gen2brain/beeep"
	"github.com/lbfatcgf/lbftag/internal/models"
	"github.com/lbfatcgf/lbftag/internal/server"
)

func StartTuoPan() {
	fmt.Println("v0.0.3")
	//为linux系统时判断是否正在运行桌面环境
	if isGUI() {
		beeep.AppName = "LbfTag"
		err := beeep.Notify("lbf tag", "服务已启动完成，"+models.GetConfig().Hosts(), server.IconPNG())
		if err != nil {
			panic(err)
		}
	} else {
		fmt.Println("服务已启动完成，" + models.GetConfig().Hosts())
	}

}

// IsGUI 返回当前是否运行在图形界面环境（X11 或 Wayland）下
func isGUI() bool {
	if runtime.GOOS == "linux" {
		return os.Getenv("DISPLAY") != "" || os.Getenv("WAYLAND_DISPLAY") != ""
	}
	if runtime.GOOS == "darwin" || runtime.GOOS == "windows" {
		return true
	}
	return false
}
