package models

import (
	"fmt"
	"io"
	"os"
	"sync"

	"github.com/pelletier/go-toml/v2"
)

type Config struct {
	Port         int        `toml:"port" json:"port"`
	Host         string     `toml:"host" json:"host"`
	DefaultEngin string     `toml:"defaultEngin" json:"defaultEngin"`
	Hot          *HotConfig `toml:"hot" json:"hot"`
}

// 可在线更改配置
type HotConfig struct {
	LogOpen bool `toml:"log" json:"log"`
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

	config := defaultConfig()
	err = toml.Unmarshal(data, config)
	if err != nil {
		panic(err)
	}
	conf = config
	// fmt.Println(conf)
}
func defaultConfig() *Config {
	return &Config{
		Port:         6677,
		Host:         "0.0.0.0",
		DefaultEngin: "bing",
		Hot: &HotConfig{
			LogOpen: true,
		},
	}
}

func GetConfig() *Config {
	if conf == nil {
		conf = defaultConfig()
	}

	return conf
}

var wlock = &sync.RWMutex{}

func SaveConfig() error {
	wlock.Lock()
	defer wlock.Unlock()
	confDir, err := os.UserConfigDir()
	if err != nil {
		return err
	}
	data := make([]byte, 0)
	data, err = toml.Marshal(conf)
	if err != nil {
		return err
	}
	return os.WriteFile(confDir+"/lbftag/conf.toml", data, os.ModePerm)
}
