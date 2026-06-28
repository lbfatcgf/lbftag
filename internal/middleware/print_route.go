package middleware

import (
	"net/http"
	"time"

	"github.com/lbfatcgf/lbftag/internal/models"
	"github.com/lbfatcgf/lbftag/tool/logtool"
)

var logger = logtool.NewLogger("middleware", true)

// 中间件：请求日志 + 耗时
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		start := time.Now()

		next.ServeHTTP(w, r)

		if models.GetConfig().LogOpen != nil && *models.GetConfig().LogOpen {
			// fmt.Printf("log open:%v", models.GetConfig().Hot.LogOpen)
			logger.Debug("requset", "method", r.Method, "path", r.URL.Path, "remote_addr", r.RemoteAddr, "cost", time.Since(start))
		}

	})
}
