import "./SearchBar.css";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi/";
import DataContext from "../../State/data-context";

const SearchBar = () => {
	const dataCtx = useContext(DataContext);
	const [enteredValue, setEnteredValue] = useState("");

	useEffect(() => {
		const search = setTimeout(() => {
			if (enteredValue.length > 0) {
				dataCtx.searchCountry(enteredValue);
			}
		}, 500);
		return () => {
			clearTimeout(search);
		};
	}, [enteredValue]);

	const inputHandler = (event) => {
		const entry = event.target.value;
		setEnteredValue(entry);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		dataCtx.searchCountry(enteredValue);
	};

	return (
		<form onSubmit={submitHandler}>
			<div>
				<BiSearchAlt2 className="search" />
				<input type="text" placeholder="Search for a country..." onChange={inputHandler} />
			</div>
		</form>
	);
};

export default SearchBar;
