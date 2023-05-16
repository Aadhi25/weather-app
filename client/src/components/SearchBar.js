import React, { useContext, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { FaSearchLocation } from "react-icons/fa";
import { SearchContext } from "../context/SearchContext";
import "./SearchBar.css";

const SearchBar = () => {
  const { setResults, setShow, input, setInput, setLoading } =
    useContext(SearchContext);

  // Call the backend to call the api
  const fetchPlaces = async (value) => {
    try {
      setLoading(true);
      if (value.length >= 3) {
        const res = await axios.get("https://weatherly-app.onrender.com/", {
          params: {
            placeName: value,
          },
        });
        setLoading(false);
        console.log(res.data);
        setResults(res.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      setResults([]);
      setShow(true);
      console.log(error.msg);
    }
  };

  const handleOnChange = (value) => {
    setInput(value);
    setShow(true);
    debouncedFunc(value);
  };

  // eslint-disable-next-line
  const debouncedFunc = useMemo(() => debounce(fetchPlaces, 200), []);

  return (
    <div className="search-input">
      <FaSearchLocation id="search-icon" />
      <input
        type="text"
        placeholder="Type atleast 3 letters"
        value={input}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
