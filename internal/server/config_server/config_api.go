package configserver

import (
	"fmt"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/dbsource/configcurd"
	"github.com/lbfatcgf/lbftag/internal/models"
	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
	"github.com/lbfatcgf/lbftag/tool"
	HttpTool "github.com/lbfatcgf/lbftag/tool/httptool"
)

const base_route = "/api/setting"

func InitApi(route *http.ServeMux, reStartCh chan bool) {
	r := map[string]func(w http.ResponseWriter, r *http.Request){
		fmt.Sprintf("GET %v", base_route):         getConfig,
		fmt.Sprintf("PUT %v", base_route):         updateConfig,
		fmt.Sprintf("PUT %v/restart", base_route): restart(reStartCh),
	}

	for r, v := range r {
		if models.GetConfig().LogOpen != nil && *models.GetConfig().LogOpen {
			tool.PrintRoute(r)
		}
		route.HandleFunc(r, v)
	}
}

func getConfig(w http.ResponseWriter, r *http.Request) {

	HttpTool.ResponseJson(w, AjaxRes.Success(models.GetConfig().CanChangConfig()))
}

func updateConfig(w http.ResponseWriter, r *http.Request) {
	hconfig, err := HttpTool.DecodeJSONBody[models.Config](r)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	models.GetConfig().UpdateByConfig(hconfig)
	err = configcurd.SaveConfig()
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}

func restart(reStartCh chan bool) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		HttpTool.ResponseJson(w, AjaxRes.ResponseData{
			Code: "200",
			Data: "reload",
			Msg:  "5000ms后尝试链接",
		})
		reStartCh <- true
	}
}
