import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
import "./TopNews.css";
import "./NewsSearch.css";

const TopNews = () => {
  const [country, setCountry] = useState("us");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectSource, setSelectSource] = useState("By News Channel");
  const [selectCategory, setSelectCategory] = useState("business");

  const sources = ["By News Channel", "By Category", "By Country"];
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const countries = [
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "us",
    "ve",
    "za",
  ];

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSelectSource(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectCategory(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    let url = "";

    if (selectSource === "By Country") {
      url = `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=8aba765311894dde983f4a8c080b838f`;
    } else if (selectSource === "By Category") {
      url = `https://newsapi.org/v2/top-headlines/sources?category=${selectCategory}&apiKey=8aba765311894dde983f4a8c080b838f`;
    } else if (selectSource === "By News Channel") {
      url = `https://newsapi.org/v2/top-headlines/sources?apiKey=8aba765311894dde983f4a8c080b838f`;
    }

    try {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setApiResponse(JSON.parse(cachedData));
      } else {
        const response = await axios.get(url);
        const articles = response.data.sources;
        setApiResponse(articles);
        localStorage.setItem(url, JSON.stringify(articles));
      }
    } catch (error) {
      console.log("Getting some error: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [country, selectSource, selectCategory]);

  return (
    <>
      <div className="top-news">
        <h1>Top News By Source</h1>
        <div className="source">
          <select
            value={selectSource}
            onChange={handleSourceChange}
            className="source-select"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        {selectSource === "By Category" && (
          <select
            value={selectCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}

        {selectSource === "By Country" && (
          <select
            value={country}
            onChange={handleCountryChange}
            className="country-select"
          >
            {countries.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        )}

        <div className="news-data">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : apiResponse && apiResponse.length > 0 ? (
            apiResponse.map((article, index) => (
              <div key={index} className="article-card">
                <h2 className="article-title">
                  {article.name || article.title}
                </h2>
                <p className="article-content">
                  {article.description.slice(0, 50) + "..."}
                </p>

                <div className="timedetail">
                  <div className="detail-page">
                  <Link
                    key={index}
                    to={article.url}
                    className="detail"
                    target="_blank"
                  >
                    More Details
                  </Link>
                  </div>
                  <div className="catagory">
                    <p className="cat">{article.category.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-articles">No articles found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNews;
