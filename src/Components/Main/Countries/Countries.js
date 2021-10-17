import "./Countries.css";
import DataContext from "../../State/data-context";
import { useContext } from "react";

const Countries = (props) => {
	const dataCtx = useContext(DataContext);

	const viewCountryHandler = (event) => {
		const countryId = event.target.closest(".country").id;
		dataCtx.detailCountry(countryId);
	};

	const displayedCountries = dataCtx.listed.map((country, index) => (
		<article
			className="country"
			id={country.name.common}
			key={`${country.name.common}${index}`}
			onClick={viewCountryHandler}
		>
			<div className="flag">
				<img className="flag" src={country.flags.svg} alt="flag"></img>
			</div>
			<div className="stats">
				<ul className="country-stats">
					<li key={country.name.common + index}>
						<h3>{country.name.common}</h3>
					</li>
					<li key={`${country.population + country.name}`}>
						<span>Population:</span> {new Intl.NumberFormat().format(country.population)}
					</li>
					<li key={`${country.name + country.region}`}>
						<span>Region: </span> {country.region}
					</li>
					<li key={`${country}.capital`}>
						<span>Capital: </span>
						{country.capital}
					</li>
				</ul>
			</div>
		</article>
	));

	return <main className="countries--container">{displayedCountries}</main>;
};

export default Countries;
