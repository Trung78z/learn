import { Todo } from "../models/todoModel";

export const findAllTodos = async (): Promise<Todo[]> => {
  return await Todo.findAll();
};

export const findTodoById = async (id: number): Promise<Todo | null> => {
  return await Todo.findById(id);
};

export const createTodo = async (
  task: string,
  date: string,
  priority: string
): Promise<Todo> => {
  const todo = new Todo(task, date, priority);
  await todo.save();
  return todo;
};

export const deleteTodoById = async (id: number): Promise<boolean> => {
  return await Todo.delete(id);
};

export const updateTodoById = async (
  id: number,
  fields: Partial<Todo>
): Promise<void> => {
  await Todo.update(id, fields);
};
