import { useContext } from "react";
import axios from "axios";
import "./SearchResult.css";
import { SearchContext } from "../context/SearchContext";

export const SearchResult = ({ obj }) => {
  const { setShow, setInput, setWeatherData, setLoading, loading } =
    useContext(SearchContext);

  const loadingText = "Loading...";

  const fetchWeather = async (value) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/weather/", {
        params: {
          weatherPlace: value,
        },
      });
      setLoading(false);
      setWeatherData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setShow(false);
    setInput(obj.name);
    fetchWeather(obj.name);
  };

  return (
    <div className="search-result" onClick={handleOnClick}>
      {loading === true ? loadingText : obj.name}
    </div>
  );
};
