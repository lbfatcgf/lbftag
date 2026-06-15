package htmlparser_test

import (
	"os"
	"testing"

	"github.com/lbfatcgf/lbftag/internal/dbsource"
	"github.com/lbfatcgf/lbftag/internal/dbsource/markcurd"
	"github.com/lbfatcgf/lbftag/internal/htmlparser"
)

func TestHtmlParser(t *testing.T) {
	f, _ := os.OpenFile("/home/lbf/文档/bookmarks.html", os.O_RDONLY, 0644)

	list, err := htmlparser.HtmlParser(f)
	if err != nil {
		panic(err)
	}
	dbsource.InitDB()

	markcurd.ImportMarks(list)
}
