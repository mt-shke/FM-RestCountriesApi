import { Fragment, useContext } from "react";
import "./Borders";
import DataContext from "../../State/data-context";

const Borders = () => {
	const dataCtx = useContext(DataContext);

	const viewCountryHandler = (event) => {
		const countryId = event.target.closest(".bord").id;
		dataCtx.detailCountry(countryId);
	};

	const content = dataCtx.borders.map((country, index) => (
		<li key={`${country}${index}`} id={country} value={country} className="bord" onClick={viewCountryHandler}>
			{country}
		</li>
	));

	return <Fragment>{content}</Fragment>;
};

export default Borders;
