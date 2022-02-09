import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import styled from "styled-components";

const Layout = styled.main`
	height: 100vh;
`;

const Content = () => {
	return (
		<Layout>
			<Sidebar />
			<Main />
		</Layout>
	);
};

export default Content;
