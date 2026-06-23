#!/bin/bash

set -e


cd web
pnpm run build
echo "编译web完成"
cd ..

export GOEXPERIMENT=jsonv2
go build -ldflags="-s -w" -tags=systray_nogtk -o dist/lbftag cmd/main.go

echo "编译go完成"

