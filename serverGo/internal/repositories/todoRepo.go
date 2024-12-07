package repositories

import (
	"database/sql"
	"fmt"

	"github.com/Trung78z/learn/serverGo/internal/models"
)

type TodoRepository interface {
	GetAll() ([]models.Todo, error)
	GetByID(id int) (models.Todo, error)
	Create(todo models.Todo) error
	Update(id int, todo models.Todo) error
	Delete(id int) error
}

type todoRepository struct {
	DB *sql.DB
}

func NewTodoRepository(db *sql.DB) TodoRepository {
	if db == nil {
		panic("DB connection is nil!")
	}
	return &todoRepository{DB: db}
}

func (r *todoRepository) GetAll() ([]models.Todo, error) {
	// Check if DB connection is available
	if r.DB == nil {
		return nil, fmt.Errorf("database connection is nil")
	}

	rows, err := r.DB.Query("SELECT id, task, date, priority, status FROM todos")
	if err != nil {
		return nil, fmt.Errorf("error fetching todos: %w", err)
	}
	defer rows.Close()

	var todos []models.Todo
	for rows.Next() {
		var todo models.Todo
		err := rows.Scan(&todo.ID, &todo.Task, &todo.Date, &todo.Priority, &todo.Status)
		if err != nil {
			return nil, fmt.Errorf("error scanning todo: %w", err)
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return todos, nil
}

func (r *todoRepository) GetByID(id int) (models.Todo, error) {
	// Check if DB connection is available
	if r.DB == nil {
		return models.Todo{}, fmt.Errorf("database connection is nil")
	}

	var todo models.Todo
	err := r.DB.QueryRow("SELECT id, task, date, priority, status FROM todos WHERE id = ?", id).
		Scan(&todo.ID, &todo.Task, &todo.Date, &todo.Priority, &todo.Status)

	if err == sql.ErrNoRows {
		// Return a custom error when no rows are found
		return todo, fmt.Errorf("todo with id %d not found", id)
	}
	if err != nil {
		return todo, fmt.Errorf("error fetching todo by id: %w", err)
	}

	return todo, nil
}

func (r *todoRepository) Create(todo models.Todo) error {
	// Check if DB connection is available
	if r.DB == nil {
		return fmt.Errorf("database connection is nil")
	}

	_, err := r.DB.Exec("INSERT INTO todos (task, date, priority, status) VALUES (?, ?, ?, ?)",
		todo.Task, todo.Date, todo.Priority, todo.Status)
	if err != nil {
		return fmt.Errorf("error inserting todo: %w", err)
	}
	return nil
}

func (r *todoRepository) Update(id int, todo models.Todo) error {
	// Check if DB connection is available
	if r.DB == nil {
		return fmt.Errorf("database connection is nil")
	}

	_, err := r.DB.Exec("UPDATE todos SET task = ?, date = ?, priority = ?, status = ? WHERE id = ?",
		todo.Task, todo.Date, todo.Priority, todo.Status, id)
	if err != nil {
		return fmt.Errorf("error updating todo: %w", err)
	}
	return nil
}

func (r *todoRepository) Delete(id int) error {
	// Check if DB connection is available
	if r.DB == nil {
		return fmt.Errorf("database connection is nil")
	}

	_, err := r.DB.Exec("DELETE FROM todos WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("error deleting todo: %w", err)
	}
	return nil
}
