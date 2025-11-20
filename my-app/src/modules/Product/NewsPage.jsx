import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/NewsPage.scss";
import { Footer } from "./Footer";
import { ScrollBar } from "./ScrollBar";
import { NewsModal } from "../Product/NewsModal";
import { NewsFormModal } from "../Product/NewsFormModal";

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editNews, setEditNews] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedNews || showForm ? "hidden" : "auto";
  }, [selectedNews, showForm]);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:3001/news");
      setNews(res.data.reverse());
    } catch (err) {
      console.error("Ошибка загрузки новостей:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="news-page">
      <h1 className="news-page__title">
        {role === "admin" && (
          <span
            style={{
              cursor: "pointer",
              fontSize: "24px",
              marginRight: "15px",
            }}
            onClick={() => {
              setEditNews(null);
              setShowForm(true);
            }}
          >
            ➕
          </span>
        )}
        Новости
        <img className="mark" src="/headerUS.png" alt="" />
      </h1>

      <div className="news-page__list">
        {visibleNews.map((item) => (
          <div className="news-card" key={item.idNews || item.title}>
            <img src={item.img} alt={item.title} className="news-card__image" />
            <div className="news-card__content">
              <span className="news-card__category">{item.category}</span>
              <h2 className="news-card__title">{item.title}</h2>
              <p className="news-card__meta">{item.author} • {item.date}</p>
              <p className="news-card__summary">{item.summary}</p>
              <div className="btnsNews">
                <button className="news-card__button" onClick={() => setSelectedNews(item)}>
                  ПОДРОБНЕЕ
                </button>
                {item.idNews && role === "admin" && (
                  <>
                    <button className="news-card__button" onClick={() => { setEditNews(item); setShowForm(true); }}>
                      ✏️
                    </button>
                    <button className="news-card__button" onClick={() => handleDelete(item.idNews)}>
                      Удалить
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="news-page__pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <span
            key={num}
            className={`news-page__dot ${num === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </span>
        ))}
      </div>

      {selectedNews && <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />}
      {showForm && (
        <NewsFormModal
          item={editNews}
          onClose={() => {
            setShowForm(false);
            setEditNews(null);
          }}
          onSuccess={() => {
            fetchNews();
            setShowForm(false);
          }}
        />
      )}

      <div className="line">
        <img src="/line.png" alt="" />
      </div>
      <ScrollBar />
      <Footer />
    </div>
  );
}
