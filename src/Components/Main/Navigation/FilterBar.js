import "./FilterBar.css";
import { FiChevronDown } from "react-icons/fi";
import { useContext, useState } from "react";
import DataContext from "../../State/data-context";

const FilterBar = (props) => {
	const [options, displayOptions] = useState(false);
	const dataCtx = useContext(DataContext);

	const filterRegion = () => {
		!options && displayOptions(true);
		options && displayOptions(false);
	};

	const setFilterHandler = (e) => {
		const region = e.target.dataset.region;
		displayOptions(false);
		dataCtx.filterCountry(region);
		// searchCountryByRegion(region);
	};

	return (
		<div className="filter--select filter">
			<div className="select" onClick={filterRegion}>
				Filter by Region <FiChevronDown className="arrowDown" />
			</div>
			{options && (
				<div className="options">
					<div data-region="Africa" onClick={setFilterHandler}>
						Africa
					</div>
					<div data-region="Americas" onClick={setFilterHandler}>
						Americas
					</div>
					<div data-region="Asia" onClick={setFilterHandler}>
						Asia
					</div>
					<div data-region="Europe" onClick={setFilterHandler}>
						Europe
					</div>
					<div data-region="Oceania" onClick={setFilterHandler}>
						Oceania
					</div>
				</div>
			)}
		</div>
	);
};

export default FilterBar;
