import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import "./WeatherData.css";

const WeatherData = (): any => {
  const { weatherData, loading } = useContext(SearchContext);

  if (!loading) {
    return (
      <div className="weather-card">
        <h2 style={{ marginBottom: "15px" }}>{weatherData.location.name}</h2>
        <p>Country: {weatherData.location.country}</p>
        <p>Temp in Celsius: {weatherData.current.temp_c}</p>
        <p>Temp in Fahrenheit: {weatherData.current.temp_f}</p>
        <p>Humidity: {weatherData.current.humidity}</p>
        <p>Condition: {weatherData.current.condition.text}</p>
        <p>Wind Degree: {weatherData.current.wind_degree}</p>
      </div>
    );
  } else {
    <div className="weather-card">Loading...</div>;
  }
};

export default WeatherData;
