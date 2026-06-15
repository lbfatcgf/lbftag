package models

type ResponseData struct {
	Code string `json:"code"`
	Msg  string `json:"msg"`
	Data any    `json:"data"`
}

func Success(data any) ResponseData {
	return ResponseData{
		Code: "200",
		Data: data,
		Msg:  "ok",
	}
}
