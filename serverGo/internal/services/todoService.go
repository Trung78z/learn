package services

import (
	"github.com/Trung78z/learn/serverGo/internal/models"
	"github.com/Trung78z/learn/serverGo/internal/repositories"
)

type TodoService interface {
	GetAllTodos() ([]models.Todo, error)
	GetTodoByID(id int) (models.Todo, error)
	CreateTodo(todo models.Todo) error
	UpdateTodo(id int, todo models.Todo) error
	DeleteTodo(id int) error
}

type todoService struct {
	repo repositories.TodoRepository
}

// NewTodoService tạo một service mới
func NewTodoService(repo repositories.TodoRepository) TodoService {
	return &todoService{repo: repo}
}

func (s *todoService) GetAllTodos() ([]models.Todo, error) {
	return s.repo.GetAll()
}

func (s *todoService) GetTodoByID(id int) (models.Todo, error) {
	return s.repo.GetByID(id)
}

func (s *todoService) CreateTodo(todo models.Todo) error {
	return s.repo.Create(todo)
}

func (s *todoService) UpdateTodo(id int, todo models.Todo) error {
	return s.repo.Update(id, todo)
}

func (s *todoService) DeleteTodo(id int) error {
	return s.repo.Delete(id)
}
