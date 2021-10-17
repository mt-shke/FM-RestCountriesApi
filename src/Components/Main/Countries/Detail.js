import "./Detail.css";
import { BsArrowLeft } from "react-icons/bs";
import { Fragment, useContext } from "react";
import DataContext from "../../State/data-context";
import Borders from "./Borders";

const Detail = () => {
	const dataCtx = useContext(DataContext);
	const country = dataCtx.detailed;

	const changeView = () => {
		dataCtx.changeView();
	};

	const currencies = Object.values(country.currencies)
		.map((curr) => curr.name)
		.join(", ");

	const languages = Object.values(country.languages).join(", ");

	const content = (
		<section className="details">
			<button className="button-back" onClick={changeView}>
				<BsArrowLeft className="arrowLeft" />
				Back
			</button>

			<main className="details--country--container">
				<img className="flag-detail" src={country.flags.svg} alt="flag"></img>

				<div className="stats--container">
					<h2>{country.name.common}</h2>
					<div className="stats--inner--container">
						<ul className="detail-stats stats">
							<li>
								<span>Native Name:</span> {country.name.official}
							</li>
							<li>
								<span>Population:</span> {new Intl.NumberFormat().format(country.population)}
							</li>
							<li>
								<span>Region: </span> {country.region}
							</li>
							<li>
								<span>Sub Region: </span> {country.subregion}
							</li>
							<li>
								<span>Capital: </span> {country.capital}
							</li>
						</ul>

						<ul className="detail-stats-two stats">
							<li>
								<span>Top Level Domain: </span>
								{[...country.tld]}
							</li>
							<li>
								<span>Currencies: </span> {currencies}
							</li>
							<li>
								<span>Languages: </span> {languages}
							</li>
						</ul>
						<div className="detail-stats-three">
							<h4> Border Countries:</h4>
							<ul className="border-countries">{dataCtx.borders && <Borders />}</ul>
						</div>
					</div>
				</div>
			</main>
		</section>
	);

	return <Fragment> {content}</Fragment>;
};

export default Detail;
