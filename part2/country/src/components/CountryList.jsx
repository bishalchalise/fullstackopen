import { useEffect } from "react";

const CountryList = ({
  countries,
  searchCountry,
  setCountryName,
  setValue,
}) => {
  const filtered = countries.filter(({ name }) =>
    name.common.toLowerCase().includes(searchCountry.trim().toLowerCase())
  );

  useEffect(() => {
    if (filtered.length === 1) {
      setCountryName(filtered[0].name.common);
    } else {
      setCountryName("");
    }
  }, [filtered]);

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {filtered.map(({ name }) => (
        <div key={name.official}>
          {name.common}
          <button
            onClick={() => {
              setCountryName(name.common);
              setValue("");
              // setValue(name.common);
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
