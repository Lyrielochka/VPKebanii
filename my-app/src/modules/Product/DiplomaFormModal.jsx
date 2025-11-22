import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/DiplomaFormModal.scss";
import { buildImageUrl, getImageOptions } from "../../services/imageService";

export function DiplomaFormModal({ item, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", img: "" });
  const [imageOptions, setImageOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getImageOptions()
      .then((images) => {
        if (isMounted) {
          setImageOptions(images);
        }
      })
      .catch((err) => console.error("Failed to load images:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (item) {
      const imgName = item.img?.startsWith("/Images/")
        ? item.img.replace("/Images/", "")
        : item.img || "";
      setForm({ name: item.name || "", img: imgName });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      img: form.img ? `/Images/${form.img}` : "",
    };

    try {
      if (item?.idDiploma) {
        await axios.put(`https://wmp.by/diplomas/${item.idDiploma}`, payload);
      } else {
        await axios.post("https://wmp.by/diplomas", payload);
      }
      onSuccess();
    } catch (err) {
      console.error("Ошибка сохранения диплома:", err);
    }
  };

  return (
    <div className="diploma-form-modal">
      <div className="diploma-form-modal__overlay" onClick={onClose}></div>
      <div className="diploma-form-modal__content" onClick={(e) => e.stopPropagation()}>
        <h2>{item?.idDiploma ? "Редактировать диплом" : "Добавить диплом"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Название диплома"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>
            Выбрать изображение из public/Images
            <select name="img" value={form.img} onChange={handleChange} required>
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
              src={buildImageUrl(form.img)}
              alt="preview"
              loading="lazy"
              className="diploma-form-modal__preview"
              style={{ maxHeight: "150px", marginTop: "10px" }}
            />
          )}

          <div className="diploma-form-modal__actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
