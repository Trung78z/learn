import { Router } from "express";
import {
  getAllTodos,
  getTodoById,
  createNewTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController";
const router = Router();
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createNewTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
