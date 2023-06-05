import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Title from "./components/Title";
import WeatherData from "./components/WeatherData";
import { SearchContext } from "./context/SearchContext";

interface resultsObj {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

function App() {
  const [results, setResults] = useState<resultsObj[]>([]);
  const [show, setShow] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="App">
      <SearchContext.Provider
        value={{
          results,
          setResults,
          show,
          setShow,
          input,
          setInput,
          weatherData,
          setWeatherData,
          loading,
          setLoading,
        }}
      >
        <Title />
        <SearchBar />
        {results && <SearchResultsList />}
        {weatherData && <WeatherData />}
      </SearchContext.Provider>
    </div>
  );
}

export default App;
