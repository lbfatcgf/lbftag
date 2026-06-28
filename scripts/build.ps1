
$ErrorActionPreference = 'Stop'

Set-Location web
pnpm i
pnpm run build
Write-Host "编译web完成"
Set-Location ..

$env:GOEXPERIMENT = "jsonv2"
go build -ldflags="-s -w" -tags=systray_nogtk -o dist/lbftag.exe cmd/main.go

Write-Host "编译go完成"
