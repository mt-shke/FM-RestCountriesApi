// Update V3.1 : FetchAll only

export const timer = async function (time) {
	return new Promise(function (_, reject) {
		setTimeout(() => {
			reject(new Error(`Request took too long! ${time} secondes passed!`));
		}, time * 1000);
	});
};

export const fetchAlphaCode = async (value) => {
	try {
		const response = await Promise.race([fetch(`https://restcountries.eu/rest/v2/alpha/${value}`), timer(2)]);
		if (!response.ok) throw new Error((err) => console.error(err.message));
		const data = await response.json();
		return getRequiredData(data);
	} catch (err) {
		console.log(err.message);
	}
};

export const fetchEntry = async (entry) => {
	try {
		const response = await Promise.race([fetch(`https://restcountries.eu/v3.1/name/${entry}`), timer(2)]);
		if (!response.ok) throw new Error((err) => console.error(err.message));
		console.log(response);
		const data = await response.json();
		console.log(data);
		const requiredData = data.map((country) => getRequiredData(country));
		return requiredData;
	} catch (err) {
		console.log(err.message);
	}
};

export const fetchRegion = async (region) => {
	try {
		const response = await Promise.race([
			fetch(`https://restcountries.eu/rest/v2/region/${region}`),
			timer(2),
		]);
		if (!response.ok) throw new Error((err) => console.error(err.message));

		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err.message);
	}
};

// export const fetchBorders = async (data, state) => {
// 	try {
// 		console.log(data);
// 		const bordersAlphaCode = data.map((country) => country.borders);
// 		console.log(bordersAlphaCode);
// 		const borders = await bordersAlphaCode.forEach(
// 			(country) => (console.log(country), fetchAlphaCode(country))
// 		);
// 		if (!borders.ok) throw new Error((err) => console.error("Cannot fetch borders: no response"));
// 		const bordersName = await borders.map((bor) => bor.name);
// 		if (!borders.ok) throw new Error((err) => console.error("Cannot fetch borders: no response"));
// 		if (bordersName) console.log(bordersName);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };

// const fetchState = async (data, state) => {
// 	try {
// 		const countries = data.map((country) => state.find(country));
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };

export const getRequiredData = (data) => {
	return {
		name: data.name,
		nativeName: data.nativeName,
		population: data.population,
		region: data.region,
		subregion: data.subregion,
		capital: data.capital,
		topLevelDomain: data.topLevelDomain,
		currencies: data.currencies,
		languages: data.languages,
		borders: data.borders,
		flag: data.flag,
		alpha3Code: data.alpha3Code,
		id: data.name,
	};
};

//  Rest Countries V3.1 with useEffect fetch all
// https://restcountries.com/v3.1/all

export const fetchAll = async () => {
	try {
		const response = await Promise.race([fetch(`https://restcountries.com/v3.1/all`), timer(2)]);
		if (!response.ok) throw new Error((err) => console.error(err.message));
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err.message);
	}
};
