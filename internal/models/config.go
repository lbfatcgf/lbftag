package models

import (
	"fmt"
	"gorm.io/gorm"
)

type Config struct {
	gorm.Model
	Port         *int    `json:"port" gorm:"not null; default:6677"`
	Host         *string `json:"host" gorm:"not null; default:'0.0.0.0'"`
	DefaultEngin *string `json:"defaultEngin" gorm:"not null; default:'bing'"`
	LogOpen      *bool   `json:"log" gorm:"not null; default:true"`
}

func (Config) TableName() string {
	return "app_config"
}

func (c *Config) Hosts() string {
	return fmt.Sprintf("http://%v:%v/index", *c.Host, *c.Port)
}

func (c *Config) ServerHost() string {
	return fmt.Sprintf("%v:%v", *c.Host, *c.Port)
}
func (c *Config) CanChangConfig() map[string]any {
	return map[string]any{
		"defaultEngin": *c.DefaultEngin,
		"log":          *c.LogOpen,
	}
}
func (c *Config) UpdateByConfig(conf Config) {
	if conf.Port != nil {
		c.Port = conf.Port
	}
	if conf.Host != nil {
		c.Host = conf.Host
	}
	if conf.LogOpen != nil {
		c.LogOpen = conf.LogOpen
	}
	if conf.DefaultEngin != nil {
		c.DefaultEngin = conf.DefaultEngin
	}

}

var conf *Config

func InitConfig(con *Config) {
	conf = con
}

func GetConfig() *Config {
	return conf
}
