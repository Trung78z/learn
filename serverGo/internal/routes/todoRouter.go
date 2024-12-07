package routes

import (
	"database/sql"

	"github.com/Trung78z/learn/serverGo/internal/controllers"
	"github.com/Trung78z/learn/serverGo/internal/repositories"
	"github.com/Trung78z/learn/serverGo/internal/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	api := app.Group("/api/v1")
	repo := repositories.NewTodoRepository(db)
	service := services.NewTodoService(repo)
	controller := controllers.NewTodoController(service)
	api.Get("/todos", controller.GetAll)
	api.Get("/todos/:id", controller.GetByID)
	api.Post("/todos", controller.Create)
	api.Put("/todos/:id", controller.Update)
	api.Delete("/todos/:id", controller.Delete)
}
