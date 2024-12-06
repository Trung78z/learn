package models

type Togo struct {
	id       uint   `json:"id"`
	task     string `json:"task"`
	date     string `json:"date"`
	priority string `json:"priority"`
	status   bool   `json:"status"`
}
