import SearchBar from "./Navigation/SearchBar";
import FilterBar from "./Navigation/FilterBar";
import Countries from "./Countries/Countries";
import DataContext from "../State/data-context";
import { Fragment, useContext } from "react";
import Detail from "./Countries/Detail";

const Main = () => {
	const dataCtx = useContext(DataContext);

	return (
		<main>
			{!dataCtx.detailedView && (
				<Fragment>
					<header className="container-search">
						<SearchBar />
						<FilterBar />
					</header>
				</Fragment>
			)}
			{!dataCtx.detailedView && <Countries />}
			{dataCtx.detailedView && <Detail />}
		</main>
	);
};

export default Main;
