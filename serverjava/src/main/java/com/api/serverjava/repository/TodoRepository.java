package com.api.serverjava.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.serverjava.models.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    Optional<Todo> findById(Integer id);
}
