package models

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/pelletier/go-toml/v2"
)

type Config struct {
	Port int    `toml:"port" json:"port"`
	Host string `toml:"host" json:"host"`
}

func (c *Config) Hosts() string {
	return fmt.Sprintf("http://%v:%v/index", c.Host, c.Port)
}

func (c *Config) ServerHost() string {
	return fmt.Sprintf("%v:%v", c.Host, c.Port)
}

var conf *Config

func ReadConfig() {
	confDir, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}
	cf, err := os.Open(confDir + "/lbftag/conf.toml")
	if err != nil {
		if os.IsNotExist(err) {
			conf = defaultConfig()
			// 先确保目录存在
			dir := filepath.Dir(confDir + "/lbftag/conf.toml") // 获取父目录
			if err := os.MkdirAll(dir, 0755); err != nil {
				// 创建目录失败，处理错误
				panic(err) // 或返回 err
			}

			// 再创建文件
			cf, err = os.Create(confDir + "/lbftag/conf.toml")
			if err != nil {
				// 创建文件失败
				panic(err)
			}
			data := make([]byte, 0)
			data, err = toml.Marshal(conf)
			// cf.Write()
			if err != nil {
				panic(err)
			}

			_, err = cf.Write(data)
			if err != nil {
				panic(err)
			}
		} else {
			panic(err)
		}
	}

	defer cf.Close()
	fmt.Println("配置文件已存在")
	data, err := io.ReadAll(cf)
	if err != nil {
		panic(err)
	}

	var config Config
	err = toml.Unmarshal(data, &config)
	if err != nil {
		panic(err)
	}
	conf = &config
	fmt.Println(conf)
}
func defaultConfig() *Config {
	return &Config{
		Port: 6677,
		Host: "0.0.0.0",
	}
}

func GetConfig() *Config {
	if conf == nil {
		conf = defaultConfig()
	}

	return conf
}
