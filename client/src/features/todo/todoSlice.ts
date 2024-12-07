import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataType, dataTypeAdd } from "../../types/enum";
import {
  addTodoService,
  deleteTodoService,
  editTodoService,
  getTodoService,
} from "../../services/userService";
import { AxiosError } from "axios";

interface typeInitialState {
  loading: boolean;
  data: dataType[];
  error: null | string;
}
const initialState: typeInitialState = {
  loading: false,
  data: [],
  error: null,
};

export const getTodo = createAsyncThunk("todo/FetchData", async () => {
  const res = await getTodoService();
  return res.data.message;
});

export const addTodo = createAsyncThunk(
  "todo/create",
  async (todo: dataTypeAdd, { rejectWithValue }) => {
    try {
      const res = await addTodoService(todo);
      return res.data.message;
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 409
      ) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const editTodo = createAsyncThunk(
  "todo/EditData",
  async (todo: dataType, { rejectWithValue }) => {
    try {
      const res = await editTodoService(todo.id, todo);
      return res.data.message;
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 409
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todo/DeleteData",
  async (todoId: number, { rejectWithValue }) => {
    try {
      const res = await deleteTodoService(todoId);
      return res.data;
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 404
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addCase: (state, action: PayloadAction<dataTypeAdd>) => {
      state.loading = false;
      const lastId =
        state.data.length > 0 ? state.data[state.data.length - 1].id : 0;
      const newId = lastId + 1;
      const newTask = { ...action.payload, id: newId };
      state.data.push(newTask);
    },
    updateCase: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateStatusCase: (state, action) => {
      state.loading = false;
      state.data = state.data.map((task) =>
        task.id === action.payload ? { ...task, status: !task.status } : task,
      );
    },
    deleteCase: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push({ ...action.meta.arg, id: action.payload });
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(editTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.meta);
      const index = state.data.findIndex(
        (todo) => todo.id === action.meta.arg.id,
      );
      if (index !== -1) state.data[index] = action.meta.arg;
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.meta.arg);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { addCase, updateCase, deleteCase, updateStatusCase } =
  todoSlice.actions;
export default todoSlice.reducer;
