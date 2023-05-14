import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Title from "./components/Title";
import WeatherData from "./components/WeatherData";
import { SearchContext } from "./context/SearchContext";

function App() {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(true);
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
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
