import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
	todos: [],
	isAddToDoActive: true,
	isListToDoActive: false,
};

const todoSlice = createSlice({
	name: "todo",
	initialState: initialAuthState,
	reducers: {
		addToDo(state, action) {
			state.todos.push(action.payload);
		},
		deleteToDo(state, action) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		editToDo(state, action) {
			const data = state.todos.filter((todo) => todo.id === action.payload.id);
			data[0].title = action.payload.data.title;
			data[0].description = action.payload.data.description;
			data[0].date = action.payload.data.date;
		},
		changeAddToDoActive(state) {
			state.isAddToDoActive = true;
			state.isListToDoActive = false;
		},
		changeListToDoActive(state) {
			state.isAddToDoActive = false;
			state.isListToDoActive = true;
		},
		ascendingHandler(state) {
			state.todos.sort((a, b) => new Date(a.date) - new Date(b.date));
		},
		descendingHandler(state) {
			state.todos.sort((a, b) => new Date(b.date) - new Date(a.date));
		},
	},
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
