package middleware

import (
	"log"
	"net/http"
	"time"
)

// 中间件：请求日志 + 耗时
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		// log.Printf("[%s] %s %s", r.Method, r.URL.Path, r.RemoteAddr)

		next.ServeHTTP(w, r)

		log.Printf("[%s] %s %s 耗时: %v", r.Method, r.URL.Path, r.RemoteAddr, time.Since(start))
	})
}
