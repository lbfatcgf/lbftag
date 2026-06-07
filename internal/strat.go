package internal

import (
	"github.com/lbfatcgf/lbftag/internal/models"
	"github.com/lbfatcgf/lbftag/internal/server"
)

func Start() {
	models.ReadConfig()
	server.StratHttp()
	StartTuoPan()
}
