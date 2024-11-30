import { Request, Response } from "express";
import * as todoService from "../services/todoService";
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.findAllTodos();
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tìm một todo theo ID
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = await todoService.findTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tạo một todo mới
export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { task, date, priority } = req.body;
    const todo = await todoService.createTodo(task, date, priority);
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa một todo theo ID
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await todoService.deleteTodoById(id);
    if (!success) {
      return res.status(404).json({ message: "Todo not found." });
    }
    return res
      .status(200)
      .json({ message: `Todo with id ${id} deleted successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cập nhật một todo
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const fields = req.body;
    await todoService.updateTodoById(id, fields);
    return res
      .status(200)
      .json({ message: `Todo with id ${id} updated successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
