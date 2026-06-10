package server

import (
	"encoding/json"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/dbsource/curd"
	"github.com/lbfatcgf/lbftag/internal/htmlparser"
	"github.com/lbfatcgf/lbftag/internal/models"
)

func initApi(route *http.ServeMux) {

	route.HandleFunc("/index", index)
	route.HandleFunc("/favicon.svg", favicon)
	route.HandleFunc("POST /api/mark/import/html", importFromHtml)
	route.HandleFunc("GET /api/mark", getMarks)
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

func importFromHtml(w http.ResponseWriter, r *http.Request) {
	f, _, err := r.FormFile("file")
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	defer f.Close()
	marks, err := htmlparser.HtmlParser(f)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	err = curd.ImportMarks(marks)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, models.ResponseData{
		Code: "200",
		Data: "",
		Msg:  "ok",
	})
}

func errRequset(w http.ResponseWriter, code string, err error) {
	responseJson(w, models.ResponseData{
		Code: code, Data: err.Error(), Msg: err.Error(),
	})
}

func responseJson(w http.ResponseWriter, data models.ResponseData) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)

}

func getMarks(w http.ResponseWriter, r *http.Request) {
	pCode := r.URL.Query().Get("pCode")
	list, err := curd.QueryMarks(pCode)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, models.ResponseData{
		Code: "200",
		Data: list,
		Msg:  "ok",
	})

}
