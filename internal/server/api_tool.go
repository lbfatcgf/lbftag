package server

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	AjaxRes "github.com/lbfatcgf/lbftag/internal/models/ajaxRes"
)

func errRequset(w http.ResponseWriter, code string, err error) {
	responseJson(w, AjaxRes.ResponseData{
		Code: code, Data: err.Error(), Msg: err.Error(),
	})
}

func responseJson(w http.ResponseWriter, data AjaxRes.ResponseData) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)

}

// DecodeJSONBody 从 HTTP 请求中读取 JSON 并解码为指定类型 T。
// 返回解码后的值及可能的错误。
func decodeJSONBody[T any](r *http.Request) (T, error) {
	var result T
	defer r.Body.Close()

	// 限制 Body 读取大小，防止内存攻击（可选）
	// r.Body = http.MaxBytesReader(w, r.Body, 10<<20) // 10MB

	decoder := json.NewDecoder(r.Body)
	// 严格模式：禁止未知字段
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(&result); err != nil {
		return result, err
	}

	// 确保请求体只有单个 JSON 值，没有多余垃圾
	if err := decoder.Decode(&struct{}{}); err != io.EOF {
		return result, io.ErrUnexpectedEOF
	}

	return result, nil
}

// DrainBody 读取并替换 r.Body，使其可重复读取。
// 返回原始 Body 内容的副本，同时 r.Body 被替换为可重复读取的 io.NopCloser。
// 后续使用 json.NewDecoder(r.Body) 或 io.ReadAll(r.Body) 均可多次读取。
func DrainBody(r *http.Request) ([]byte, error) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}
	// 关闭原 Body（重要）
	r.Body.Close()
	// 替换 Body 为新的可重复读取的 ReadCloser
	r.Body = io.NopCloser(bytes.NewReader(body))
	return body, nil
}
