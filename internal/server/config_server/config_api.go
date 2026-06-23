package configserver

import (
	"fmt"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/models"
	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
	"github.com/lbfatcgf/lbftag/tool"
	HttpTool "github.com/lbfatcgf/lbftag/tool/httptool"
)

const base_route = "/api/setting"

func InitApi(route *http.ServeMux) {
	r := map[string]func(w http.ResponseWriter, r *http.Request){
		fmt.Sprintf("GET %v", base_route): getConfig,
		fmt.Sprintf("PUT %v", base_route): updateConfig,
	}

	for r, v := range r {
		if models.GetConfig().Hot.LogOpen {

			tool.PrintRoute(r)
		}
		route.HandleFunc(r, v)
	}
}

func getConfig(w http.ResponseWriter, r *http.Request) {

	HttpTool.ResponseJson(w, AjaxRes.Success(models.GetConfig().Hot))
}

func updateConfig(w http.ResponseWriter, r *http.Request) {
	hconfig, err := HttpTool.DecodeJSONBody[models.HotConfig](r)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	models.GetConfig().Hot = &hconfig
	err = models.SaveConfig()
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}
