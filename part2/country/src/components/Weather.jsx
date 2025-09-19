const Weather = ({ weather, capital }) => {
  if (weather) {
    const iconCode = weather.weather[0].icon;
    console.log("icon", iconCode);
    return (
      <div>
        <h1>Weather in {capital}</h1>
        <p>Temperature {weather.main.temp} Celsius</p>
        {weather.weather.map((w) => (
          <img
            key={w.id}
            src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
            alt={w.description}
          />
        ))}
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
