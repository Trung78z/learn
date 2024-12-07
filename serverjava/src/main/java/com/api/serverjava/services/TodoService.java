package com.api.serverjava.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.serverjava.models.Todo;
import com.api.serverjava.repository.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getTodo() {
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Integer id, Todo todo) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();
            if (todo.getStatus() != null) {
                existingTodo.setStatus(todo.getStatus());
            }
            if (todo.getDate() != null) {
                existingTodo.setDate(todo.getDate());
            }
            if (todo.getPriority() != null) {
                existingTodo.setPriority(todo.getPriority());
            }
            if (todo.getTask() != null) {
                existingTodo.setTask(todo.getTask());
            }

            return todoRepository.save(existingTodo);
        } else {
            throw new RuntimeException("Task not found");

        }
    }

    public void deleteTodo(Integer id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            todoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Task not found");
        }
    }
}
