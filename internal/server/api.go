package server

import (
	"errors"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/dbsource/curd"
	"github.com/lbfatcgf/lbftag/internal/htmlparser"
	"github.com/lbfatcgf/lbftag/internal/models"
	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

func initApi(route *http.ServeMux) {

	route.HandleFunc("/index", index)
	route.HandleFunc("/favicon.svg", favicon)
	route.HandleFunc("POST /api/mark/import/html", importFromHtml)
	route.HandleFunc("GET /api/marks", getMarks)
	route.HandleFunc("GET /api/mark/{code}", getMark)
	route.HandleFunc("PUT /apt/mark", updateMark)
	route.HandleFunc("DELETE /api/mark/{code}", deleteMark)
	route.HandleFunc("POST /api/mark", addMark)
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
	responseJson(w, AjaxRes.Success("ok"))
}

func getMarks(w http.ResponseWriter, r *http.Request) {
	pCode := r.URL.Query().Get("pCode")
	list, err := curd.QueryMarks(pCode)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, AjaxRes.Success(list))

}

func getMark(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	if code == "" {
		errRequset(w, "400", errors.New("code 错误"))
		return
	}
	res, err := curd.QueryMark(code)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, AjaxRes.Success(res))
}

func updateMark(w http.ResponseWriter, r *http.Request) {

	m, err := decodeJSONBody[models.MarkNode](r)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	err = curd.UpdateMark(m)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, AjaxRes.Success("ok"))
}

func deleteMark(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	if code == "" {
		errRequset(w, "400", errors.New("code 错误"))
		return
	}
	err := curd.DeleteMark(code)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, AjaxRes.Success("ok"))
}

func addMark(w http.ResponseWriter, r *http.Request) {
	m, err := decodeJSONBody[models.MarkNode](r)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	code, err := gonanoid.New()
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	m.Code = code
	err = curd.AddMark(&m)
	if err != nil {
		errRequset(w, "400", err)
		return
	}
	responseJson(w, AjaxRes.Success("ok"))
}
