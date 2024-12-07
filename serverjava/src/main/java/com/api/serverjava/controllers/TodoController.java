package com.api.serverjava.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.api.serverjava.models.Todo;
import com.api.serverjava.services.TodoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(value = "/api/todo")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getTodo();
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTodo(@RequestBody Todo todo) {
        try {
            Todo createdTodo = todoService.createTodo(todo);
            return ResponseEntity.ok(Map.of("message", createdTodo, "success", true));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "success", false));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred while processing the request"));
        }
    }

    // Other methods for updating, deleting, and searching for todos...
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateTodo(@PathVariable Integer id, @RequestBody Todo todo) {

        try {
            Todo updatedTodo = todoService.updateTodo(id, todo);
            return ResponseEntity.ok(Map.of("message", updatedTodo, "success", true));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "success", false));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred while processing the request"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable Integer id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok(Map.of("message", "Todo deleted successfully", "success", true));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "success", false));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred while processing the request"));
        }
    }
}
