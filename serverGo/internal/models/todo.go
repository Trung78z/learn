package models

type Todo struct {
	ID       uint   `json:"id"`
	Task     string `json:"task"`
	Date     string `json:"date"`
	Priority string `json:"priority"`
	Status   bool   `json:"status"`
}
