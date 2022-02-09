import React from "react";
import styled from "styled-components";
import Form from "./Form";
import { useSelector } from "react-redux";
import ListToDo from "./ListToDo";

const MainSection = styled.section`
	padding: 4em 2em;
	width: 80%;
	margin-left: auto;
`;

const SectionTitle = styled.h1`
	font-size: 4rem;
	text-align: center;
	text-transform: uppercase;
	color: #333;
	letter-spacing: 3px;
`;

const Main = () => {
	const isAddToDoActive = useSelector((state) => state.todo.isAddToDoActive);
	return (
		<MainSection>
			<SectionTitle>
				{isAddToDoActive ? "add to do" : "list to do"}
			</SectionTitle>
			{isAddToDoActive && <Form type="add" />}
			{!isAddToDoActive && <ListToDo />}
		</MainSection>
	);
};

export default Main;
