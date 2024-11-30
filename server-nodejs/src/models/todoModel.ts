import pool from "../configs/db";

export class Todo {
  id?: number;
  task: string;
  date: string;
  priority: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    task: string,
    date: string,
    priority: string,
    status: boolean = false
  ) {
    this.task = task;
    this.date = date;
    this.priority = priority;
    this.status = status;
  }

  static async findAll(): Promise<Todo[]> {
    try {
      const [rows] = await pool.execute("SELECT * FROM todos");
      return rows as Todo[];
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Failed to fetch todos from database.");
    }
  }

  static async findById(id: number): Promise<Todo | null> {
    try {
      const [rows] = await pool.execute("SELECT * FROM todos WHERE id = ?", [
        id,
      ]);
      const todos = rows as Todo[];
      return todos.length > 0 ? todos[0] : null;
    } catch (error) {
      console.error(`Error fetching todo with id ${id}:`, error);
      throw new Error("Failed to fetch todo.");
    }
  }

  async save(): Promise<void> {
    try {
      const sql = `
        INSERT INTO todos (task, date, priority, status)
        VALUES (?, ?, ?, ?)
      `;
      const [result]: any = await pool.execute(sql, [
        this.task,
        this.date,
        this.priority,
        this.status,
      ]);
      this.id = result.insertId;
    } catch (error) {
      console.error("Error inserting todo:", error);
      throw new Error("Failed to insert todo.");
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const sql = `DELETE FROM todos WHERE id = ?`;
      const [result]: any = await pool.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error);
      throw new Error("Failed to delete todo.");
    }
  }

  // Cập nhật thông tin todo
  static async update(id: number, fields: Partial<Todo>): Promise<void> {
    try {
      const updates = Object.keys(fields)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(fields);

      const sql = `UPDATE todos SET ${updates} WHERE id = ?`;
      await pool.execute(sql, [...values, id]);
    } catch (error) {
      console.error(`Error updating todo with id ${id}:`, error);
      throw new Error("Failed to update todo.");
    }
  }
}
