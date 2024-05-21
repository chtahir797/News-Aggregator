// import { useState, useEffect } from "react";
// import axios from "axios";
// import './CategoryNews.css'
// const CategoryNews = () => {
//   const [select, setSelect] = useState("business");
//   const [apiResponse, setApiResponse] = useState(null);
//   const [loading, setLoading] = useState(false)
//   const category = [
//     "business",
//     "entertainment",
//     "general",
//     "health",
//     "science",
//     "sports",
//     "technology",
//   ];
//   const handleChange = (e) => {
//     setSelect(e.target.value);
//   };
//   const FetchingData = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get(
//         `https://newsapi.org/v2/top-headlines?category=${select}&apiKey=8aba765311894dde983f4a8c080b838f`
//       );
//       setApiResponse(response.data.articles);
//     } catch (error) {
//       console.log("Getting Some Error", error);
//     }
//     setLoading(false)
//   };
//   useEffect(() => {
//     FetchingData();
//   }, [select]);
//   console.log(apiResponse)
//   return (
//     <>
//     <div className="category-news">
//       <h1>Select the Category</h1>
//       <select
//         value={select}
//         onChange={handleChange}
//         className="catagory-select"
//       >
//         {category.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>

//       <div className="news-data">
//           {loading ? (
//             <p className="loading">Loading...</p>
//           ) : apiResponse && apiResponse.length > 0 ? (
//             apiResponse.map((article, index) => (
//               <div key={index} className="article-card">
//                 <h2 className="article-title">{article.title}</h2>
//                 <p className="article-content">{article.content}</p>
//                 {article.urlToImage ? (
//                   <img
//                     src={article.urlToImage}
//                     alt="article"
//                     className="article-image"
//                   />
//                 ) : (
//                   <p className="no-image">No Image Found</p>
//                 )}
//                 <div className="timedetail">
//                   <div className="detail-page">
//                     <a
//                       key={index}
//                       href={article.url}
//                       target="_blank"
//                       className="detail"
//                     >
//                       More Details
//                     </a>
//                   </div>

//                   <p className="article-date">
//                     {new Date(article.publishedAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-articles">No articles found</p>
//           )}
//         </div>
//         </div>
//     </>
//   );
// };
// export default CategoryNews;

import { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryNews.css";

const CategoryNews = () => {
  const [select, setSelect] = useState("business");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const cachedData = localStorage.getItem(select);
      if (cachedData) {
        setApiResponse(JSON.parse(cachedData));
      } else {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${select}&apiKey=8aba765311894dde983f4a8c080b838f`
        );
        const articles = response.data.articles;
        setApiResponse(articles);
        localStorage.setItem(select, JSON.stringify(articles));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [select]);

  return (
    <div className="category-news">
      <h1>Select the Category</h1>
      <select
        value={select}
        onChange={handleChange}
        className="category-select"
      >
        {category.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

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

export default CategoryNews;
