package server

import "net/http"

func initApi(route *http.ServeMux) {

	route.HandleFunc("/index", index)
	route.HandleFunc("/favicon.svg", favicon)
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
