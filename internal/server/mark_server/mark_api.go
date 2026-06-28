package markserver

import (
	"errors"
	"net/http"

	"github.com/lbfatcgf/lbftag/internal/dbsource/markcurd"
	"github.com/lbfatcgf/lbftag/internal/htmlparser"
	"github.com/lbfatcgf/lbftag/internal/models"
	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
	"github.com/lbfatcgf/lbftag/tool"
	HttpTool "github.com/lbfatcgf/lbftag/tool/httptool"
	Gonanoid "github.com/matoous/go-nanoid/v2"
)

func InitApi(route *http.ServeMux) {
	r := make(map[string]func(w http.ResponseWriter, r *http.Request), 0)
	r["POST /api/mark/import/html"] = importFromHtml
	r["GET /api/marks"] = getMarks
	r["GET /api/mark/{code}"] = getMark
	r["PUT /api/mark"] = updateMark
	r["DELETE /api/mark/{code}"] = deleteMark
	r["POST /api/mark"] = addMark
	r["POST /api/mark/clearAll"] = clearAll

	for r, v := range r {
		if models.GetConfig().LogOpen != nil && *models.GetConfig().LogOpen {

			tool.PrintRoute(r)
		}
		route.HandleFunc(r, v)
	}
}

func importFromHtml(w http.ResponseWriter, r *http.Request) {
	f, _, err := r.FormFile("file")
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	defer f.Close()
	marks, err := htmlparser.HtmlParser(f)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	err = markcurd.ImportMarks(marks)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}

func getMarks(w http.ResponseWriter, r *http.Request) {
	pCode := r.URL.Query().Get("pCode")
	list, err := markcurd.QueryMarks(pCode)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success(list))

}

func getMark(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	if code == "" {
		HttpTool.ErrRequset(w, "400", errors.New("code 错误"))
		return
	}
	res, err := markcurd.QueryMark(code)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success(res))
}

func updateMark(w http.ResponseWriter, r *http.Request) {

	m, err := HttpTool.DecodeJSONBody[models.MarkNode](r)
	if err != nil {
		// fmt.Printf("%+v\n", err)
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	err = markcurd.UpdateMark(m)
	if err != nil {
		// fmt.Printf("%+v\n", err)
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}

func deleteMark(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	if code == "" {
		HttpTool.ErrRequset(w, "400", errors.New("code 错误"))
		return
	}
	err := markcurd.DeleteMark(code)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}

func addMark(w http.ResponseWriter, r *http.Request) {
	m, err := HttpTool.DecodeJSONBody[models.MarkNode](r)
	if err != nil {
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	code, err := Gonanoid.New()
	if err != nil {
		// fmt.Printf("%+v\n", err)
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	m.Code = code
	err = markcurd.AddMark(&m)
	if err != nil {
		// fmt.Printf("%+v\n", err)
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}

func clearAll(w http.ResponseWriter, r *http.Request) {
	err := markcurd.ClearAll()
	if err != nil {
		// fmt.Printf("%+v\n", err)
		HttpTool.ErrRequset(w, "400", err)
		return
	}
	HttpTool.ResponseJson(w, AjaxRes.Success("ok"))
}
