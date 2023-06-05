import { useContext } from "react";
import axios from "axios";
import "./SearchResult.css";
import { SearchContext } from "../context/SearchContext";

type receivedProps = {
  obj: {
    name: string;
  };
};

type valueTypes = string | number;

export const SearchResult = ({ obj }: receivedProps) => {
  const { setShow, setInput, setWeatherData, setLoading, loading } =
    useContext(SearchContext);

  const loadingText: string = "Loading...";

  const fetchWeather = async (value: valueTypes) => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://weatherly-app.onrender.com/weather/",
        {
          params: {
            weatherPlace: value,
          },
        }
      );
      setLoading(false);
      console.log(res.data);
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
