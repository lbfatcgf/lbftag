package server

import (
	"net/http"

	configserver "github.com/lbfatcgf/lbftag/internal/server/config_server"
	enginserver "github.com/lbfatcgf/lbftag/internal/server/engin_server"
	markserver "github.com/lbfatcgf/lbftag/internal/server/mark_server"
)

func InitApi(route *http.ServeMux) {

	route.HandleFunc("/index", index)
	route.HandleFunc("/favicon.svg", favicon)
	{
		markserver.InitApi(route)
	}
	{
		enginserver.InitApi(route)
	}
	{
		configserver.InitApi(route)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	data := Index()
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write(data)

}

func favicon(w http.ResponseWriter, r *http.Request) {
	data := Icon()
	w.Header().Set("Content-Type", "image/svg+xml")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
