$ErrorActionPreference = 'Stop'

$buildGo = $false
$buildWeb = $false

foreach ($arg in $args) {
    if ($arg -eq "-server") {
        $buildGo = $true
    }
    if ($arg -eq "-web") {
        $buildWeb = $true
    }
}

if ($buildWeb) {
    Set-Location web
    pnpm i
    pnpm run build
    Write-Host "编译web完成"
    Set-Location ..
}

if ($buildGo) {
    $env:GOEXPERIMENT = "jsonv2"
    go build -tags=systray_nogtk -o dist/lbftag cmd/main.go
    Write-Host "编译go完成"
}
