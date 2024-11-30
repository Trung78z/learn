import { dataTypeAdd } from "../types/enum";
import { apiClient } from "./apiService";

export const getTodoService = async () => {
  return apiClient.get("/todo");
};

export const addTodoService = async (data: dataTypeAdd) => {
  return apiClient.post("/todo", data);
};
export const deleteTodoService = async (todoId: number) => {
  return apiClient.delete(`/todo/${todoId}`);
};
export const editTodoService = async (todoId: number, data: dataTypeAdd) => {
  return apiClient.put(`/todo/${todoId}`, data);
};
