import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export type appSelector = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export type appStore = typeof store;
