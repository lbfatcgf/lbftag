package htmlparser

import (
	"errors"
	"fmt"
	"io"
	"net/url"

	"github.com/PuerkitoBio/goquery"
	"github.com/lbfatcgf/lbftag/internal/models"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

func NewMarkNodeDir(tagName, icon, url, parent string, deep int) (*models.MarkNode, error) {
	id, err := gonanoid.New()
	if err != nil {
		return nil, err
	}
	return &models.MarkNode{
		TagName:     tagName,
		Type:        models.MARK_DIR,
		Icon:        icon,
		Url:         url,
		Code:        id,
		Parent:      parent,
		HasChildren: true,
		Deep:        deep,
	}, nil
}
func NewMarkNodeLink(tagName, icon, url, parent string, deep int) (*models.MarkNode, error) {
	id, err := gonanoid.New()
	if err != nil {
		return nil, err
	}
	return &models.MarkNode{
		TagName:     tagName,
		Type:        models.MARK_LINK,
		Icon:        icon,
		Url:         url,
		Code:        id,
		Parent:      parent,
		HasChildren: false,
		Deep:        deep,
	}, nil
}

// var alls = make([]*MarkNode, 0)

func HtmlParser(reader io.Reader) ([]models.MarkNode, error) {
	// fmt.Println(string(data))
	// reader := bytes.NewReader(data)
	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		fmt.Printf("err:%v\n", err.Error())
		return nil, err
	}
	rDl := doc.Find("DL").First()
	if rDl == nil {
		return nil, errors.New("not find DL")
	}

	return parserDL(rDl, "", 0), nil
}

func markFromATag(atag *goquery.Selection, parent string, parentDeep int) (*models.MarkNode, bool) {

	// fmt.Println(atag.Text())
	title := atag.Text()
	href, ok := atag.Attr("href")
	if !ok {
		href = ""

	}
	icon, ok := atag.Attr("ICON_URI")
	if !ok {
		icon = ""
	}
	if icon == "" {

		u, err := url.Parse(href)
		if err == nil {
			icon = u.Host + "/favicon.ico"
		}
	}
	nLink, err := NewMarkNodeLink(title, icon, href, parent, parentDeep)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return nil, true
	}
	return nLink, false
}

func parserDL(dl *goquery.Selection, parent string, parentDeep int) (markNodes []models.MarkNode) {
	if dl == nil {
		return
	}

	dl.ChildrenFiltered("DT").Each(func(i int, s *goquery.Selection) {
		if h3 := s.ChildrenFiltered("H3").First(); h3 != nil && h3.Text() != "" {
			title := h3.Text()
			nDir, err := NewMarkNodeDir(title, "", "", parent, parentDeep+1)
			if err != nil {
				fmt.Printf("Error: %v\n", err)
				return
			}
			markNodes = append(markNodes, *nDir)
			//TODO 递归获取节点
			list := parserDL(s.ChildrenFiltered("DL").First(), nDir.Code, nDir.Deep)
			if len(list) > 0 {
				markNodes = append(markNodes, list...)
			}
		}
		if atag := s.ChildrenFiltered("a").First(); atag != nil && atag.Text() != "" {
			nLink, shouldReturn := markFromATag(atag, parent, parentDeep+1)
			if shouldReturn {
				return
			}
			markNodes = append(markNodes, *nLink)
		}
	})
	return
}
