import axios from "axios";

export const fetchNewsData = async (
  selectedCountry: string,
  searchText: string
) => {
  try {
    const apiKey = "7838d440f4644f96aac5be14a911bf44";
    const baseUrl = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${apiKey}`;

    const url = searchText
      ? `${baseUrl}&q=${searchText}`
      : baseUrl;

    const config = {
      method: "get",
      url: url,
      headers: {},
    };

    const response = await axios(config);
    return response?.data?.articles;
  } catch (error) {
    console.log(error);
  }
};
