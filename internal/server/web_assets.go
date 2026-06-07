package server

import (
	lbftap "github.com/lbfatcgf/lbftag"
)

func Index() []byte {

	data, err := lbftap.Assets.ReadFile("web/dist/index.html")

	if err != nil {
		panic(err)
	}
	return data

}

func Icon() []byte {
	data, err := lbftap.Assets.ReadFile("web/dist/favicon.svg")

	if err != nil {
		panic(err)
	}
	return data
}
