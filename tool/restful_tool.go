package tool

import (
	"fmt"
	"strings"
)

func PrintRoute(path string) {
	path = strings.TrimSpace(path)
	if path == "" {
		return
	}
	list := strings.Split(path, " ")
	if len(list) == 1 {
		list = append(make([]string, 0), "ROUTE", list[0])
	}
	fmt.Printf("\033[1;31;40m%s\033[0m\t %s\n", list[0], list[1])
}
