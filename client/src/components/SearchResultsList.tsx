import { useContext } from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { SearchContext } from "../context/SearchContext";

export const SearchResultsList = () => {
  const { results, show, input, loading } = useContext(SearchContext);

  if (results.length === 0 && input.length >= 3 && !loading) {
    return (
      <div
        style={{
          padding: "10px 20px",
        }}
      >
        No matches found
      </div>
    );
  } else if (loading) {
    return (
      <div
        style={{
          padding: "10px 20px",
        }}
      >
        Loading...
      </div>
    );
  } else {
    return (
      <div className="results-list">
        {show &&
          results.length !== 0 &&
          !loading &&
          results.map((result: { id: number; name: string }) => {
            return <SearchResult obj={result} key={result.id} />;
          })}
      </div>
    );
  }
};
