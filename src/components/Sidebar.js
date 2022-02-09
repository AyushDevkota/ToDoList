import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../store/todo";

const Menu = styled.aside`
	background-color: #333;
	color: #e2e2e2;
	padding: 4em 2em;
	box-shadow: 5px 0px 10px #333;
	position: fixed;
	height: 100vh;
	width: 20%;
`;

const ListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2em;
`;

const List = styled.li`
	text-transform: uppercase;
	font-weight: 700;
	cursor: pointer;
	padding: 1em;

	&.active {
		background-color: black;
	}
`;

const Sidebar = () => {
	const dispatch = useDispatch();
	const isAddToDoActive = useSelector((state) => state.todo.isAddToDoActive);
	const isListToDoActive = useSelector((state) => state.todo.isListToDoActive);
	const toggleActive = (e) => {
		if (e.target.textContent === "add to do") {
			dispatch(todoActions.changeAddToDoActive());
		} else {
			dispatch(todoActions.changeListToDoActive());
		}
	};
	return (
		<Menu>
			<ListContainer>
				<List
					className={`${isAddToDoActive && "active"}`}
					onClick={toggleActive}
				>
					add to do
				</List>
				<List
					className={`${isListToDoActive && "active"}`}
					onClick={toggleActive}
				>
					list to do
				</List>
			</ListContainer>
		</Menu>
	);
};

export default Sidebar;
