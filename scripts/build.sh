#!/bin/bash

set -e

args=("$@")

buildGo=false
buildWeb=false

for arg in "${args[@]}"; do

    if [ "$arg" == "-server" ];then
        buildGo=true
    fi
    if [ "$arg" == "-web" ];then
        buildWeb=true
    fi
done
# if [ ${#args[@]} -eq 0];then
#     buildGo=
# fi


if $buildWeb; then

    cd web
    pnpm run build
    echo "编译web完成"
    cd ..
fi

if $buildGo; then
    pwd
    export GOEXPERIMENT=jsonv2
    go build  -tags=systray_nogtk -o dist/lbftag cmd/main.go

    echo "编译go完成"
fi
