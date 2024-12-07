package controllers

import (
	"strconv"

	"github.com/Trung78z/learn/serverGo/internal/models"
	"github.com/Trung78z/learn/serverGo/internal/services"
	"github.com/gofiber/fiber/v2"
)

type TodoController struct {
	Service services.TodoService
}

func NewTodoController(service services.TodoService) *TodoController {
	return &TodoController{Service: service}
}

func (uc *TodoController) GetAll(c *fiber.Ctx) error {
	Todos, err := uc.Service.GetAllTodos()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch Todos"})
	}
	return c.JSON(fiber.Map{"message": Todos, "success": true})
}

func (uc *TodoController) GetByID(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	Todo, err := uc.Service.GetTodoByID(id)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "error": "Todo not found"})
	}
	return c.JSON(fiber.Map{"message": Todo, "success": true})
}

func (uc *TodoController) Create(c *fiber.Ctx) error {
	var Todo models.Todo
	if err := c.BodyParser(&Todo); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid input"})
	}
	err := uc.Service.CreateTodo(Todo)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to create Todo"})
	}
	return c.Status(201).JSON(fiber.Map{"message": Todo, "success": true})
}

func (uc *TodoController) Update(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var Todo models.Todo
	if err := c.BodyParser(&Todo); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid input"})
	}
	err := uc.Service.UpdateTodo(id, Todo)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to update Todo"})
	}
	return c.JSON(fiber.Map{"message": Todo, "success": true})
}

func (uc *TodoController) Delete(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID format"})
	}

	err = uc.Service.DeleteTodo(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to delete Todo"})
	}

	return c.JSON(fiber.Map{
		"message": "Delete successfully with ID: " + strconv.Itoa(id),
		"success": true,
	})
}
