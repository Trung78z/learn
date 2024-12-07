package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	cfg := mysql.Config{
		User:   os.Getenv("DB_USER"),
		Passwd: os.Getenv("DB_PASS"),
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "recordings",
	}

	var err error

	DB, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal("Error opening DB connection:", err)
	}

	if err := DB.Ping(); err != nil {
		log.Fatal("Error connecting to DB:", err)
	}

	fmt.Println("Connected to the database!")
}
func CloseDB() {
	if err := DB.Close(); err != nil {
		log.Fatal("Error closing the database:", err)
	}
}
