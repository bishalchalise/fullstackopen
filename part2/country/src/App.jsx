import { useState, useEffect } from "react";
import countryService from "./services/country";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import "./index.css";

const App = () => {
  const [value, setValue] = useState("");
  const [countryInfo, setCountryInfo] = useState("");
  const [countries, setCountries] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [capital, setCapital] = useState("");
  const [weather, setWeather] = useState(null);

  console.log("country name:", countryName);

  useEffect(() => {
    countryService
      .getAllCountry()
      .then((initialcountry) => setCountries(initialcountry))
      .catch((error) => console.log(error.toString()));
  }, []);

  useEffect(() => {
    if (countryName) {
      countryService
        .getCountryInfo(countryName)
        .then((returnedCountry) => {
          setCountryInfo(returnedCountry);
          setCapital(returnedCountry.capital[0]);
        })
        .catch((error) => console.log(error.toString()));
    } else {
      setCountryInfo("");
    }
  }, [countryName]);

  useEffect(() => {
    if (capital) {
      countryService
        .getCountryWeather(capital)
        .then((weather) => {
          setWeather(weather);
          console.log(weather);
        })
        .catch((error) => console.log(error.toString()));
    }
  }, [capital]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />
      {value === "" ? (
        <div></div>
      ) : (
        <CountryList
          setCountryName={setCountryName}
          countries={countries}
          searchCountry={value}
          setValue={setValue}
        />
      )}
      <CountryInfo
        weather={weather}
        capital={capital}
        countryInfo={countryInfo}
      />
    </div>
  );
};

export default App;
