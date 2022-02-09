import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo";
import { v4 as uuidv4 } from "uuid";

const StyledForm = styled.form`
	width: 60%;
	margin: 3em auto;
	padding: 2em 0;
	background-color: #333;
	display: flex;
	flex-direction: column;
	gap: 1em;
	border-radius: 1em;
`;

const StyledInput = styled.input`
	width: 70%;
	padding: 1em;
	margin: 0 auto;
`;

const Button = styled.button`
	width: 30%;
	margin: 0 auto;
	border-radius: 1em;
	background-color: #e2e2e2;

	&:hover {
		background-color: rgb(100, 100, 100);
		color: white;
	}
`;

const Error = styled.p`
	color: red;
	width: 70%;
	margin: 0 auto;
`;

const Success = styled.div`
	background-color: green;
	padding: 0.75em 0em;
	width: 70%;
	margin: 0 auto;
	text-align: center;
`;

const INITIAL_STATE = { title: "", description: "", date: "" };

const Form = ({ type, id, helper, onClick }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(INITIAL_STATE);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const res = validateForm();
		if (res === 1) return;
		setLoading(true);
		setTimeout(() => setLoading(false), 3000);
		setTimeout(() => setSuccess(true), 3000);
		setTimeout(() => setSuccess(false), 5000);
		if (type === "add") {
			dispatch(todoActions.addToDo(form));
		} else {
			dispatch(todoActions.editToDo({ data: form, id: id }));
			helper();
			onClick();
		}
		setTimeout(() => setForm(INITIAL_STATE), 3000);
	};

	const inputChangeHandler = (e) => {
		setError(false);
		const value = e.target.value;
		const name = e.target.name;

		setForm({
			...form,
			id: uuidv4(),
			[name]: value,
		});
	};

	const validateForm = () => {
		if (
			form.title.length === 0 ||
			form.title.length > 55 ||
			form.description.length === 0 ||
			form.date.length === 0
		) {
			setError(true);
			return 1;
		}
		return 0;
	};

	return (
		<StyledForm onSubmit={formSubmitHandler}>
			{success && !error && !loading && (
				<Success>
					{type === "add"
						? "Task added successfully!"
						: "Task edited successfully!"}
				</Success>
			)}
			<StyledInput
				type="text"
				name="title"
				placeholder="Title"
				value={form.title}
				onChange={inputChangeHandler}
			/>
			<StyledInput
				type="text"
				name="description"
				placeholder="Description"
				value={form.description}
				onChange={inputChangeHandler}
			/>
			<StyledInput
				type="date"
				name="date"
				min={new Date().toISOString().split("T")[0]}
				value={form.date}
				onChange={inputChangeHandler}
			/>
			{error && <Error>Please enter valid data</Error>}
			<Button>{loading && !error ? "loading" : type}</Button>
		</StyledForm>
	);
};

export default Form;
