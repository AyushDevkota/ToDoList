import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { todoActions } from "../store/todo";
import Modal from "./Modal";
import Form from "./Form";

const StyledDiv = styled.div`
	width: 70%;
	margin: 2em auto;
	display: flex;
	flex-direction: column;
	gap: 1em;
`;

const List = styled.div`
	padding: 1.5em 3em;
	background-color: #333;
	border-radius: 1em;
	display: flex;
	flex-direction: column;
	gap: 1em;
	color: #e2e2e2;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 1em;
`;

const Button = styled.button`
	background: ${(props) => (props.edit ? "green" : "red")};
	border-radius: 1em;
	color: #e2e2e2;
`;

const Searchbar = styled.input`
	padding: 0.75em 1em;
	width: 50%;
	margin: 1em auto;
`;

const MyPaginate = styled(ReactPaginate).attrs({
	activeClassName: "active",
})`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	list-style-type: none;
	padding: 0 5rem;
	li a {
		border-radius: 7px;
		padding: 0.1rem 1rem;
		border: gray 1px solid;
		cursor: pointer;
	}
	li.previous a,
	li.next a,
	li.break a {
		border-color: transparent;
	}
	li.active a {
		background-color: #0366d6;
		border-color: transparent;
		color: white;
		min-width: 32px;
	}
	li.disabled a {
		color: grey;
	}
	li.disable,
	li.disabled a {
		cursor: default;
	}
`;

const itemsPerPage = 5;

const ListToDo = () => {
	const [filter, setFilter] = useState("");
	const [modal, setModal] = useState(false);
	const [editId, setEditId] = useState();
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const helper = () => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(todos.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(todos.length / itemsPerPage));
	};

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % todos.length;
		setItemOffset(newOffset);
	};

	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todo.todos);

	const deleteHandler = (item) => {
		dispatch(todoActions.deleteToDo(item.id));
		helper();
	};

	const changeModalState = () => setModal(!modal);

	const editFunc = (id) => {
		changeModalState();
		setEditId(id);
	};

	const sortAscendingHandler = () => {
		dispatch(todoActions.ascendingHandler());
		helper();
	};
	const sortDescendingHandler = () => {
		dispatch(todoActions.descendingHandler());
		helper();
	};

	useEffect(() => {
		helper();
	}, [itemOffset, itemsPerPage, todos]);

	return (
		<StyledDiv>
			<Searchbar
				placeholder="Enter title"
				onChange={(event) => setFilter(event.target.value)}
			/>
			<ButtonContainer>
				<Button edit onClick={sortAscendingHandler}>
					Sort by Ascending
				</Button>
				<Button onClick={sortDescendingHandler}>Sort by Descending</Button>
			</ButtonContainer>
			{currentItems &&
				currentItems
					.filter((todo) => {
						if (filter === "") {
							return todo;
						} else if (
							todo.title.toLowerCase().includes(filter.toLocaleLowerCase())
						) {
							return todo;
						}
					})
					.map((todo) => {
						return (
							<List key={todo.id}>
								<h2>{todo.title}</h2>
								<p>{todo.description}</p>
								<p>{todo.date}</p>
								<ButtonContainer>
									<Button edit onClick={() => editFunc(todo.id)}>
										Edit
									</Button>
									<Button onClick={() => deleteHandler(todo)}>delete</Button>
								</ButtonContainer>
							</List>
						);
					})}
			<MyPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel="< previous"
				breakLabel="..."
				renderOnZeroPageCount={null}
			/>
			{modal && (
				<Modal onClick={changeModalState}>
					<Form
						type="edit"
						id={editId}
						helper={helper}
						onClick={changeModalState}
					/>
				</Modal>
			)}
		</StyledDiv>
	);
};

export default ListToDo;
