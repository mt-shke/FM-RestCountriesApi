import { useContext, useEffect, useState } from "react";
import css from "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import DataContext from "./Components/State/data-context";

function App() {
	const dataCtx = useContext(DataContext);

	const fetch = () => {
		dataCtx.fetchCountries();
	};

	useEffect(() => {
		if (!dataCtx.checkLocal());
		{
			fetch();
		}

		setTimeout(() => {}, 500);
	}, []);

	return (
		<div className="App">
			<header>
				<Header />
			</header>
			<Main />
		</div>
	);
}

export default App;
