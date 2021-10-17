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
