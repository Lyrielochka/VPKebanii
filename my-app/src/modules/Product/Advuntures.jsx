import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/Advuntures.scss";
import { Footer } from "./Footer";
import { ScrollBar } from "./ScrollBar";
import { DiplomaFormModal } from "./DiplomaFormModal";

export function Advunture() {
  const staticDiplomas = [
    { name: "Диплом 1", img: "/diplom1.jpg" },
    { name: "Диплом 2", img: "/diplom2.jpg" },
    { name: "Диплом 3", img: "/Диплом Республика.jpg" },
    { name: "Диплом 4", img: "/Диплом область.jpg" },
  ];

  const [diplomas, setDiplomas] = useState([]);
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [editingDiploma, setEditingDiploma] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  useEffect(() => {
    fetchDiplomas();
  }, []);

  const fetchDiplomas = async () => {
    try {
      const res = await axios.get("http://wmp.by/diplomas");
      setDiplomas(res.data);
    } catch (err) {
      console.error("Ошибка загрузки дипломов:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить диплом?")) return;
    try {
      await axios.delete(`http://wmp.by/diplomas/${id}`);
      fetchDiplomas();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const totalPages = Math.ceil((staticDiplomas.length + diplomas.length) / itemsPerPage);
  const allDiplomas = [...staticDiplomas, ...diplomas];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleDiplomas = allDiplomas.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    document.body.style.overflow = selectedDiploma || editingDiploma ? "hidden" : "auto";
  }, [selectedDiploma, editingDiploma]);

  return (
    <div className="advunture">
      <h1 className="advunture__title">
        {isAdmin && (
          <span
            style={{
              cursor: "pointer",
              fontSize: "24px",
              marginRight: "15px",
              color: "white",
            }}
            onClick={() => setEditingDiploma({})}
          >
            ➕
          </span>
        )}
        Наши достижения
        <img className="mark" src="/headerUS.png" alt="" />
      </h1>

      <p className="advunture__description">
        Здесь представлены дипломы и награды, полученные нашей командой.
      </p>

      <div className="advunture__slider">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="advunture__nav advunture__nav--left"
        >
          ←
        </button>

        <div className="advunture__cards">
          {visibleDiplomas.map((item, index) => (
            <div
              className="advunture__card"
              key={item.idDiploma || index}
              onClick={() => setSelectedDiploma(item)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              {isAdmin && item.idDiploma && (
                <div className="advunture__actions">
                  <button
                    className="advunture__edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingDiploma(item);
                    }}
                  >
                    ✏️ 
                  </button>
                  <button
                    className="advunture__delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.idDiploma);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="advunture__nav advunture__nav--right"
        >
          →
        </button>
      </div>

      <div className="advunture__line">
        <img src="/line3.png" alt="" />
      </div>

      {selectedDiploma && (
        <div className="advunture__modal" onClick={() => setSelectedDiploma(null)}>
          <div className="advunture__modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="advunture__modal-close"
              onClick={() => setSelectedDiploma(null)}
            >
              ×
            </button>
            <img src={selectedDiploma.img} alt={selectedDiploma.name} />
            <h3>{selectedDiploma.name}</h3>
          </div>
        </div>
      )}

      {editingDiploma && (
        <DiplomaFormModal
          item={editingDiploma}
          onClose={() => setEditingDiploma(null)}
          onSuccess={() => {
            setEditingDiploma(null);
            fetchDiplomas();
          }}
        />
      )}

      <ScrollBar />
      <Footer />
    </div>
  );
}
