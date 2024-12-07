package main

import (
	"log"

	_ "github.com/Trung78z/learn/serverGo/cmd/docs"
	"github.com/Trung78z/learn/serverGo/config"
	"github.com/Trung78z/learn/serverGo/internal/routes"
	"github.com/gofiber/fiber/v2"
)

// @title Example API
// @version 1.0
// @description This is a sample server
// @termsOfService http://example.com/terms/
// @contact.name API Support
// @contact.url http://www.example.com/support
// @contact.email support@example.com
// @host localhost:8080
// @BasePath /api/v1
func init() {
	config.LoadEnv()
	config.InitDB()
}

func main() {
	app := fiber.New()
	if config.DB == nil {
		log.Fatal("Database connection is not initialized!")
	}
	routes.SetupRoutes(app, config.DB)
	defer config.CloseDB()
	log.Fatal(app.Listen(":8080"))
}

// app.Get("/api/v1/user", GetUser)
// app.Post("/api/v1/user", CreateUser)
// app.Get("/swagger/*", fiberSwagger.WrapHandler)

// @Summary Get User
// @Description Get user information by ID
// @Tags user
// @Accept json
// @Produce json
// @Success 200 {object} User
// @Failure 400 {object} ErrorResponse
// @Router /api/v1/user [get]
func GetUser(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"id":   1,
		"name": "John Doe",
		"age":  30,
	})
}

// @Summary Create User
// @Description Create a new user with provided information
// @Tags user
// @Accept json
// @Produce json
// @Param user body User true "User Information"
// @Success 201 {object} User
// @Failure 400 {object} ErrorResponse
// @Router /api/v1/user [post]
func CreateUser(c *fiber.Ctx) error {
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(ErrorResponse{
			Message: "Invalid input",
		})
	}
	user.ID = 1 // Giả sử ID của người dùng là 1
	return c.Status(fiber.StatusCreated).JSON(user)
}

// User struct để Swagger tự động tạo tài liệu
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}
