import React from "react";

const DataContext = React.createContext({
	listed: [],
	detailed: [],
	detailedView: false,

	searchCountry: (data) => {},
	filterCountry: (data) => {},
	detailCountry: (data) => {},
});

export default DataContext;
