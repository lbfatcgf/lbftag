# 检测操作系统类型（兼容 Windows、macOS、Linux）
UNAME_S := $(shell uname -s 2>/dev/null || echo Windows)

ifeq ($(UNAME_S), Linux)
    OS := linux
	PROJECT_PATH:= $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
	BUILD_CMD := bash $(PROJECT_PATH)/scripts/build.sh
else ifeq ($(UNAME_S), Darwin)
    OS := macos
	PROJECT_PATH:= $(shell pwd)
	BUILD_CMD := bash $(PROJECT_PATH)/scripts/build.sh
else
    OS := windows
	PROJECT_PATH := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
	BUILD_CMD := &"$(PROJECT_PATH)/scripts/build.ps1"
endif

WEB_PRO := $(PROJECT_PATH)/web

# 使用示例
info:
	@echo "Detected OS: $(OS) DIR: $(PROJECT_PATH)"

# 构建

build:
	$(BUILD_CMD)
