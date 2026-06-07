package server

import (
	"context"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/models"
)

var mux *http.ServeMux
var server *http.Server

func StratHttp() {
	mux = http.NewServeMux()
	initApi(mux)
	server = &http.Server{
		Addr:    models.GetConfig().ServerHost(),
		Handler: mux,
	}
	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}

}

func Stop(ctx context.Context) {
	server.Shutdown(ctx)
	mux = nil
	server = nil
}
