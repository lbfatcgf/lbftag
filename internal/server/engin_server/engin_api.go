package enginserver

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/lbfatcgf/lbftag/internal/dbsource/engincurd"
	"github.com/lbfatcgf/lbftag/internal/models"
	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
	"github.com/lbfatcgf/lbftag/tool"
	HttpTool "github.com/lbfatcgf/lbftag/tool/httptool"
)

const base_route = "/api/searchEngin"

func InitApi(route *http.ServeMux) {
	r := map[string]func(w http.ResponseWriter, r *http.Request){
		fmt.Sprintf("GET %v", base_route):                       list,
		fmt.Sprintf("POST %v", base_route):                      add,
		fmt.Sprintf("DELETE %v/{id}", base_route):               delete,
		fmt.Sprintf("PUT %v/changeDefault/{engin}", base_route): changeDefault,
		fmt.Sprintf("GET %v/default", base_route):               defaultEngin,
	}

	for r, v := range r {
		if models.GetConfig().Hot.LogOpen {

			tool.PrintRoute(r)
		}
		route.HandleFunc(r, v)
	}
}

func list(w http.ResponseWriter, r *http.Request) {
	list, err := engincurd.List()
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success(list))
}

func add(w http.ResponseWriter, r *http.Request) {
	engin, err := HttpTool.DecodeJSONBody[models.SearchEngin](r)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	err = engincurd.Add(&engin)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}
func delete(w http.ResponseWriter, r *http.Request) {
	ids := r.PathValue("id")
	if ids == "" {

		HttpTool.ErrRequset(w, "400", errors.New("参数错误"))
		return

	}
	// var id uint
	id, err := strconv.Atoi(ids)

	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	err = engincurd.Delete(uint(id))
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}
func changeDefault(w http.ResponseWriter, r *http.Request) {
	engin := r.PathValue("engin")
	if engin == "" {
		HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
		return
	}
	models.GetConfig().DefaultEngin = engin
	err := models.SaveConfig()
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}
func defaultEngin(w http.ResponseWriter, r *http.Request) {
	HttpTool.ResponseJson(w, AjaxRes.Success(models.GetConfig().DefaultEngin))
}
