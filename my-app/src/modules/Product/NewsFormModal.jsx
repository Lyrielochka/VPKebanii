import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/NewsFormModal.scss";

export function NewsFormModal({ item, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    date: "",
    summary: "",
    img: "",
  });

  const [imageOptions, setImageOptions] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [newExtraImage, setNewExtraImage] = useState("");

  useEffect(() => {
    axios.get("http://wmp.by/api/images")
      .then((res) => setImageOptions(res.data))
      .catch((err) => console.error("Ошибка загрузки изображений:", err));
  }, []);

  useEffect(() => {
    if (item) {
      const imgName = item.img?.startsWith("/Images/")
        ? item.img.replace("/Images/", "")
        : item.img || "";

      setForm({
        title: item.title || "",
        category: item.category || "",
        author: item.author || "",
        date: item.date || "",
        summary: item.summary || "",
        img: imgName,
      });

      setExtraImages(item.images || []);
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const payload = {
      ...form,
      img: form.img ? `/Images/${form.img}` : "",
      images: extraImages.map((img) =>
        img.startsWith("/Images/") ? img : `/Images/${img}`
      ),
    };


      if (item?.idNews) {
        await axios.put(`http://wmp.by/news/${item.idNews}`, payload);
      } else {
        await axios.post("http://wmp.by/news", payload);
      }

      onSuccess();
    } catch (err) {
      console.error("Ошибка сохранения новости:", err);
    }
  };

  return (
    <div className="news-form-modal">
      <div className="news-form-modal__overlay" onClick={onClose}></div>
      <div className="news-form-modal__content">
        <h2>{item ? "Редактировать новость" : "Добавить новость"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Заголовок" value={form.title} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Категория" value={form.category} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Автор" value={form.author} onChange={handleChange} required />
          <input type="text" name="date" placeholder="Дата" value={form.date} onChange={handleChange} required />
          <textarea name="summary" placeholder="Краткое описание" value={form.summary} onChange={handleChange} required />

          <label className="news-form-modal__file">
            <span className="custom-upload-button">📁 Главное фото</span>
            <select name="img" value={form.img} onChange={handleChange} required className="hidden-select">
              <option value="">-- Выберите изображение --</option>
              {imageOptions.map((filename) => (
                <option key={filename} value={filename}>
                  {filename}
                </option>
              ))}
            </select>
          </label>

          {form.img && (
            <img
              src={`http://wmp.by/Images/${form.img}`}
              alt="preview"
              className="news-form-modal__preview"
              style={{ maxHeight: "150px", marginTop: "10px" }}
            />
          )}

          <div className="news-form-modal__extra">
            <label>Дополнительные изображения:</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                value={newExtraImage}
                onChange={(e) => setNewExtraImage(e.target.value)}
              >
                <option value="">-- Выберите изображение --</option>
                {imageOptions.map((filename) => (
                  <option key={filename} value={filename}>
                    {filename}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (newExtraImage && !extraImages.includes(newExtraImage)) {
                    setExtraImages([...extraImages, newExtraImage]);
                    setNewExtraImage("");
                  }
                }}
              >
                ➕
              </button>
            </div>

            <ul>
              {extraImages.map((img, i) => (
                <li key={i}>
                  {img}{" "}
                  <button type="button" onClick={() => {
                    setExtraImages(extraImages.filter((_, index) => index !== i));
                  }}>
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="news-form-modal__actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}
