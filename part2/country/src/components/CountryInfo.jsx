import Weather from "./Weather";
const CountryInfo = ({ countryInfo, capital, weather }) => {
  if (countryInfo) {
    return (
      <div>
        <h1>{countryInfo.name.common}</h1>
        {countryInfo.capital.map((c, i) => (
          <div key={i}> {c}</div>
        ))}
        <div>Area {countryInfo.area}</div>
        <h1>Languages</h1>
        <ul>
          {Object.values(countryInfo.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={countryInfo.flags.png}
          alt={countryInfo.flags.alt}
          style={{ width: "300px", height: "auto", border: "1px solid #ccc" }}
        />
        <Weather capital={capital} weather={weather} />
      </div>
    );
  }
  return;
};

export default CountryInfo;
