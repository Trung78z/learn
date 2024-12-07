import prisma from "../configs/db";
export const findAllTodos = async () => {
  return await prisma.todos.findMany();
};

export const findTodoById = async (id: number) => {
  return await prisma.todos.findUnique({ where: { id } });
};

export const createTodo = async (
  task: string,
  date: string,
  priority: string,
  status: boolean
) => {
  const result = await prisma.todos.create({
    data: { task, date, priority, status },
  });
  return result.id;
};

export const deleteTodoById = async (id: number) => {
  return await prisma.todos.delete({ where: { id } });
};

export const updateTodoById = async (
  id: number,
  task: string,
  date: string,
  priority: string,
  status: boolean
) => {
  await prisma.todos.update({
    where: { id },
    data: { task, date, priority, status },
  });
};
