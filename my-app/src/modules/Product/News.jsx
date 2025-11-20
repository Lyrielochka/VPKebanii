import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../theme/scss/News.scss";

export function News() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/news")
      .then((res) => setNews(res.data.reverse()))
      .catch((err) => console.error("Ошибка загрузки новостей:", err));
  }, []);

  const totalPages = Math.ceil(news.length / perPage);
  const visibleNews = news.slice(page * perPage, page * perPage + perPage);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleOpen = () => {
    navigate("/news"); // просто переход на NewsPage
  };

  return (
    <div className="news">
      <h2 className="news__title">
        Новости <img className="mark" src="/headerUS.png" alt="" />
      </h2>

      <div className="news__slider">
        <button className="news__nav" onClick={handlePrev}>‹</button>

        <div className="news__cards">
          {visibleNews.map((item) => (
            <div className="news__card" key={item.idNews}>
              <img
                src={`${item.img}`}
                alt={item.title}
                className="news__image"
              />
              <h3>{item.title}</h3>
              <button className="news__more" onClick={handleOpen}>
                Подробнее
              </button>
            </div>
          ))}
        </div>

        <button className="news__nav" onClick={handleNext}>›</button>
      </div>

      <div className="news__pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`news__dot ${i === page ? "active" : ""}`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>
    </div>
  );
}
