import { Request, Response } from "express";
import * as todoService from "../services/todoService";
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.findAllTodos();
    res.status(200).json({ message: todos, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = await todoService.findTodoById(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found.", success: false });
    } else {
      res.status(200).json({ message: todo, success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { task, date, priority, status } = req.body;
    const todo = await todoService.createTodo(task, date, priority, status);
    res.status(201).json({ message: todo, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await todoService.deleteTodoById(id);
    if (!success) {
      res.status(404).json({ success: false, message: "Todo not found." });
    } else {
      res.status(200).json({
        message: `Todo with id ${id} deleted successfully.`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { task, date, priority, status } = req.body;
    await todoService.updateTodoById(id, task, date, priority, status);
    res.status(200).json({
      message: `Todo with id ${id} updated successfully.`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
