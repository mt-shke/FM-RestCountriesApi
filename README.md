# FM-RestCountriesApi

## ContextApi

<details>
<summary>Simple DarkTheme context, createContext & useReducer</summary>

state/dark-context.js

```js
import React, { useState } from "react";

const DarkContext = React.createContext({
	darkMode: false,
	onSwitchMode: () => {},
});

export const DarkContextProvider = (props) => {
	const [mode, setMode] = useState("light");

	const switchModeHandler = () => {
		if (mode === "light") {
			setMode("dark");
			DarkContext.darkMode = true;
		}
		if (mode === "dark") {
			setMode("light");
			DarkContext.darkMode = false;
		}
	};

	return (
		<DarkContext.Provider value={{ darkMode: mode, onSwitchMode: switchModeHandler }}>
			<div className={mode}>{props.children}</div>
		</DarkContext.Provider>
	);
};

export default DarkContext;
```

</details>

<details>
<summary>DataContextProvider</summary>

state/data-context.js

```js
import React from "react";

const DataContext = React.createContext({
	listed: [],
	detailed: [],
	detailedView: false,

	searchCountry: (data) => {},
	filterCountry: (data) => {},
	detailCountry: (data) => {},
});
```

state/DataContextProvider.js

```js
import DataContext from "./data-context";
import { useReducer } from "react";

const defaultState = {
	all: [],
	listed: [],
	unique: [],
	detailed: [],
	detailedView: false,
	borders: [],
	searchCountryHandler: (data) => {},
	filterCountryHandler: (data) => {},
	detailCountryHandler: (data) => {},
	changeViewHandler: (data) => {},
	fetchCountries: () => {},
};

const listReducer = (state, action) => {
	const all = state.allCountries;
	const { entry } = action;

	if (action.type === "SEARCH") {
		const countries = all.filter((country) => country.name.common.toLowerCase().includes(entry));
		return { ...state, listed: countries };
	}

	if (action.type === "FILTER") {
		const countries = all.filter((country) => country.region === entry);
		return { ...state, listed: countries, detailedView: false };
	}

	if (action.type === "CHANGEVIEW") {
		return { ...state, detailedView: false };
	}

	if (action.type === "DETAILED") {
		const countryToDisplay = all.find((country) => country.name.common === action.id);
		const bord = countryToDisplay.borders ?? null;
		const borderCountries = bord
			?.map((bor) => all.filter((country) => country.cca3 === bor))
			.flat()
			.map((border) => border.name.common);

		return { ...state, detailedView: true, detailed: countryToDisplay, borders: borderCountries };
	}

	if (action.type === "FETCHALL") {
		const countries = action.countries;
		const sortedName = countries.map((country) => country.name.common).sort();
		let sorted = [];
		countries.forEach((country) => {
			const index = sortedName.indexOf(country.name.common);
			sorted[index] = country;
		});

		const string = JSON.stringify(sorted);
		localStorage.setItem("countries", string);
		return { ...state, allCountries: sorted };
	}

	if (action.type === "FETCHLOCAL") {
		const countries = action.countries;
		return { ...state, allCountries: countries };
	}
};

const DataContextProvider = (props) => {
	const [listState, setListedCountries] = useReducer(listReducer, defaultState);

	// const searchCountryHandler = async (entry) => {
	// 	const data = await fetchEntry(entry);
	// 	if (data) {
	// 		setListedCountries({ type: "SEARCH", countries: data });
	// 		// fetchBorders(data); Still to do
	// 	}
	// };

	const searchCountryHandler = (entry) => {
		setListedCountries({ type: "SEARCH", entry: entry });
	};

	// const filterCountryHandler = async (region) => {
	// 	const data = await fetchRegion(region);
	// 	if (data) setListedCountries({ type: "FILTER", countries: data });
	// };

	const filterCountryHandler = (entry) => {
		setListedCountries({ type: "FILTER", entry: entry });
	};

	const detailCountryHandler = (id) => {
		setListedCountries({ type: "DETAILED", id: id });
	};

	const changeViewHandler = () => {
		setListedCountries({ type: "CHANGEVIEW" });
	};

	const fetchAllHandler = async () => {
		const data = await fetchAll();
		setListedCountries({ type: "FETCHALL", countries: data });
	};

	const checkLocalDataHandler = () => {
		const item = localStorage.getItem("countries") ?? "";
		const startW = item.startsWith(`[{"name":{"common":"El Salvador",`);
		const include = item.includes(`{"USD":{"name":"United States dollar","symbol":"$"}},"idd":{"root":`);

		if (!startW || !include) {
			return false;
		}
		const data = JSON.parse(item);
		setListedCountries({ type: "FETCHLOCAL", countries: data });
	};

	const dataContext = {
		allCountries: listState.allCountries,
		listed: listState.listed,
		detailed: listState.detailed,
		detailedView: listState.detailedView,
		borders: listState.borders,
		searchCountry: searchCountryHandler,
		filterCountry: filterCountryHandler,
		detailCountry: detailCountryHandler,
		changeView: changeViewHandler,
		fetchCountries: fetchAllHandler,
		checkLocal: checkLocalDataHandler,
	};

	return <DataContext.Provider value={dataContext}>{props.children}</DataContext.Provider>;
};

export default DataContextProvider;
```

</details>

<details>
<summary>Provider </summary>

index.js

```js
import { DarkContextProvider } from "./Components/UI/dark-context";
import DataContextProvider from "./Components/State/DataContextProvider";

ReactDOM.render(
	<DarkContextProvider>
		<DataContextProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</DataContextProvider>
	</DarkContextProvider>,
	document.getElementById("root")
);
```

</details>

<details>
<summary>Importing contextData in components</summary>

Header.js

```js
import { useContext } from "react";
import DarkContext from "../UI/dark-context";

const Header = () => {
	const ctx = useContext(DarkContext);

	return (
		<div className="title">
			<h3>Where in the world?</h3>
			<div onClick={ctx.onSwitchMode}>
				{ctx.darkMode === "dark" && <BsMoon className="moon" />}
				{ctx.darkMode === "light" && <BiMoon className="moon" />}
				Dark Mode
			</div>
		</div>
	);
};
```

</details>
