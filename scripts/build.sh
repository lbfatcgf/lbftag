#!/bin/bash

set -e


cd web
pnpm run build
cd ..
pwd
go build  -tags=systray_nogtk -o dist/lbftag cmd/main.go
 