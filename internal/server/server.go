package server

import (
	"context"
	"errors"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/middleware"
	"github.com/lbfatcgf/lbftag/internal/models"
)

var mux *http.ServeMux
var server *http.Server

func StratHttp() {
	mux = http.NewServeMux()
	InitApi(mux)
	server = &http.Server{
		Addr:    models.GetConfig().ServerHost(),
		Handler: middleware.LoggingMiddleware(mux),
	}
	err := server.ListenAndServe()
	if err != nil {
		if !errors.Is(err, http.ErrServerClosed) {

			panic(err)
		}
	}

}

func Stop(ctx context.Context) {
	server.Shutdown(ctx)
	mux = nil
	server = nil
}
