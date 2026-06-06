package internal

import "github.com/gen2brain/beeep"

func Start() {
	err := beeep.Alert("lbf tag", "服务已启动完成，", "assets/information.png")
	if err != nil {
		panic(err)
	}

}
