import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataType, dataTypeAdd } from "../../types/enum";
import { dataTodo } from "../../utils/lib/data";

interface typeInitialState {
    loading: boolean;
    data: dataType[];
    error: null | string;
}
const initialState: typeInitialState = {
    loading: false,
    data: dataTodo,
    error: null,
};



export const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        addCase: (state, action: PayloadAction<dataTypeAdd>) => {
            state.loading = false;
            const lastId = state.data.length > 0 ? state.data[state.data.length - 1].id : 0;
            const newId = lastId + 1;
            const newTask = { ...action.payload, id: newId };
            state.data.push(newTask);
        },
        updateCase: (state, action: PayloadAction<dataType[]>) => {
            state.loading = false;
            state.data = (action.payload);
        },
        updateStatusCase: (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.data = state.data.map((task) =>
                task.id === action.payload
                    ? { ...task, status: !task.status }
                    : task
            );
        },
        deleteCase: (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.data = state.data.filter(item => item.id !== action.payload);
        }
    },
});
export const { addCase, updateCase, deleteCase, updateStatusCase } = todoSlice.actions;
export default todoSlice.reducer;
