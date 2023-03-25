import React, { useEffect, useState } from "react";
import { Articles } from "./Articles";
import { IArticle } from "../types/types";
import { Tabs, Space, Button, Spin } from "antd";
import { SearchComponent } from "./SearchComponent";
import { fetchNewsData } from "../utils/apiService";
const items = [
  {
    key: "1",
    label: `Top News`,
  },
  {
    key: "2",
    label: `Category`,
  },
  {
    key: "3",
    label: `Search`,
  },
];

const App = () => {
  const [articles, setArticlesData] = useState<IArticle[]>([]);
  const [tabKey, setTabKey] = useState<string>("1");
  const [selectedCountry, setSelectedCountry] = useState<string>("us");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData()
  }, [selectedCountry]);

  const fetchData = async () => {
    setLoading(true);
    const response =  await fetchNewsData(selectedCountry,'')
    setArticlesData(response);
    setLoading(false);
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const onChange = (key: string) => {
    setTabKey(key);
  };

  return (
    <div>
      <div className="d-flex" style={{ margin: "10px" }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <div className="d-flex">
          <Space wrap>
            <Button
              type={selectedCountry === "us" ? "primary" : "default"}
              onClick={() => handleCountryChange("us")}
            >
              US
            </Button>
            <Button
              type={selectedCountry === "gb" ? "primary" : "default"}
              onClick={() => handleCountryChange("gb")}
            >
              GB
            </Button>
          </Space>
        </div>
      </div>
      {tabKey === "1" && (
        <div>
          {!loading ? (
            <>
              <div className="header-content">{`Top News From ${
                selectedCountry === "gb"
                  ? "Great Britain"
                  : "United States of America"
              }:`}</div>
              <Articles articles={articles} />
            </>
          ) : (
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <Spin />
            </div>
          )}
        </div>
      )}
      {tabKey === "2" && <div>Category Section</div>}
      {tabKey === "3" && (
        <div>
          <SearchComponent
            articles={articles}
            selectedCountry={selectedCountry}
          />
        </div>
      )}
    </div>
  );
};

export default App;
