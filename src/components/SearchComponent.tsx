import React, { useEffect, useState } from "react";
import { Articles } from "./Articles";
import { Input, Spin } from "antd";
import { IArticle } from "../types/types";
import { fetchNewsData } from "../utils/apiService";
import useDebounce from "../hooks/useDebounce";

export const SearchComponent = ({
  articles,
  selectedCountry,
}: {
  articles: IArticle[];
  selectedCountry: string;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IArticle[]>(articles);
  const [loading, setLoading] = useState<boolean>(false);

 const debounceSearch = useDebounce(searchText, 500);

  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  useEffect(() => {
    fetchFilteredData();
  }, [debounceSearch]);

  const fetchFilteredData = async () => {
    setLoading(true);
    const response = await fetchNewsData(selectedCountry, searchText);
    setFilteredData(response);
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="search-bar">
        <Input
          placeholder="Search text"
          onChange={(e) => handleChange(e)}
          value={searchText}
          style={{ width: 350, height: 40 }}
        />
      </div>
      {!loading ? (
        <>
          <div className="header-content">{`Search Top News From  ${
            selectedCountry === "gb"
              ? "Great Britain"
              : "United States of America"
          } by term:`}</div>
          <Articles articles={filteredData} />
        </>
      ) : (
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <Spin />
        </div>
      )}
    </div>
  );
};
