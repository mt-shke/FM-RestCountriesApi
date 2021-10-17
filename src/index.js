import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
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
