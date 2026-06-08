package htmlparser_test

import (
	"os"
	"testing"

	"github.com/lbfatcgf/lbftag/internal/htmlparser"
)

func TestHtmlParser(t *testing.T) {
	data, _ := os.ReadFile("/home/lbf/文档/bookmarks.html")

	htmlparser.HtmlParser(data)
}
