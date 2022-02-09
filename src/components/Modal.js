import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledModal = styled.div`
	width: 60%;
	padding: 4em 2em;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
	background: #333;
	color: #000;
	position: relative;
	z-index: 10;
	border-radius: 10px;
`;

const Modal = (props) => {
	return (
		<Overlay>
			<StyledModal>
				<AiOutlineClose
					style={{
						position: "absolute",
						top: "4%",
						right: "5%",
						fontSize: "20px",
						cursor: "pointer",
						color: "white",
					}}
					onClick={() => props.onClick()}
				/>
				{props.children}
			</StyledModal>
		</Overlay>
	);
};

export default Modal;
