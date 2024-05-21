import { useState } from "react";
import axios from "axios";
import "./NewsSearch.css";

const NewsSearch = () => {
  const [query, setQuery] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const cachedData = localStorage.getItem(query);
      if (cachedData) {
        setApiResponse(JSON.parse(cachedData));
      } else {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=8aba765311894dde983f4a8c080b838f`
        );
        const articles = response.data.articles;
        setApiResponse(articles);
        localStorage.setItem(query, JSON.stringify(articles));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      // Provide user feedback for errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for news..."
        className="search-input"
      />
      <button onClick={fetchData} className="search-button">
        Search
      </button>
      <div className="news-data">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : apiResponse && apiResponse.length > 0 ? (
          apiResponse.map((article, index) => (
            <div key={index} className="article-card">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-content">{article.content}</p>
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt="article"
                  className="article-image"
                />
              ) : (
                <p className="no-image">No Image Found</p>
              )}
              <div className="time-detail">
                <div className="detail-page">
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail"
                  >
                    More Details
                  </a>
                </div>
                <p className="article-date">
                  {new Date(article.publishedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-articles">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default NewsSearch;
