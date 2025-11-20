import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/NewsFormModal.scss";
import { buildImageUrl, getImageOptions } from "../../services/imageService";

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

  const normalizeImageName = (value = "") =>
    value
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/?Images\//i, "")
      .replace(/^\/+/, "")
      .trim();

  useEffect(() => {
    let isMounted = true;

    getImageOptions()
      .then((images) => {
        if (isMounted) {
          setImageOptions(images);
        }
      })
      .catch((err) =>
        console.error("�?�?��+��� �����?�?�?����� ����?�+�?�����?���:", err)
      );

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (item) {
      const imgName = normalizeImageName(item.img || "");

      setForm({
        title: item.title || "",
        category: item.category || "",
        author: item.author || "",
        date: item.date || "",
        summary: item.summary || "",
        img: imgName,
      });

      setExtraImages((item.images || []).map(normalizeImageName));
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coverImage = normalizeImageName(form.img);
      const normalizedExtras = extraImages.map(normalizeImageName);

      const payload = {
        ...form,
        img: coverImage ? `/Images/${coverImage}` : "",
        images: normalizedExtras
          .filter(Boolean)
          .map((img) => `/Images/${img}`),
      };

      if (item?.idNews) {
        await axios.put(`https://wmp.by/news/${item.idNews}`, payload);
      } else {
        await axios.post("https://wmp.by/news", payload);
      }

      onSuccess();
    } catch (err) {
      console.error("�?�?��+��� �?�?�:�?���?��?��? �?�?�?�?�?�'��:", err);
    }
  };

  return (
    <div className="news-form-modal">
      <div className="news-form-modal__overlay" onClick={onClose}></div>
      <div className="news-form-modal__content">
        <h2>{item ? "����?����'��?�?�?���'�? �?�?�?�?�?�'�?" : "�"�?�+���?��'�? �?�?�?�?�?�'�?"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="�-���?�?�>�?�?�?��" value={form.title} onChange={handleChange} required />
          <input type="text" name="category" placeholder="�?���'��?�?�?��?" value={form.category} onChange={handleChange} required />
          <input type="text" name="author" placeholder="�?�?�'�?�?" value={form.author} onChange={handleChange} required />
          <input type="text" name="date" placeholder="�"���'��" value={form.date} onChange={handleChange} required />
          <textarea name="summary" placeholder="�?�?���'��?�� �?����?���?���" value={form.summary} onChange={handleChange} required />

          <label className="news-form-modal__file">
            <span className="custom-upload-button">�?"? �"�>���?�?�?�� �"�?�'�?</span>
            <select name="img" value={form.img} onChange={handleChange} required className="hidden-select">
              <option value="">-- �'�<�+��?��'�� ����?�+�?�����?��� --</option>
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
              className="news-form-modal__preview"
              style={{ maxHeight: "150px", marginTop: "10px" }}
            />
          )}

          <div className="news-form-modal__extra">
            <label>�"�?���?�>�?��'��>�?�?�<�� ����?�+�?�����?��?:</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                value={newExtraImage}
                onChange={(e) => setNewExtraImage(e.target.value)}
              >
                <option value="">-- �'�<�+��?��'�� ����?�+�?�����?��� --</option>
                {imageOptions.map((filename) => (
                  <option key={filename} value={filename}>
                    {filename}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  const normalized = normalizeImageName(newExtraImage);
                  if (normalized && !extraImages.includes(normalized)) {
                    setExtraImages([...extraImages, normalized]);
                  }
                  setNewExtraImage("");
                }}
              >
                �?
              </button>
            </div>

            <ul>
              {extraImages.map((img, i) => (
                <li key={i}>
                  {img}{" "}
                  <button type="button" onClick={() => {
                    setExtraImages(extraImages.filter((_, index) => index !== i));
                  }}>
                    �??
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="news-form-modal__actions">
            <button type="submit">���?�:�?���?��'�?</button>
            <button type="button" onClick={onClose}>�?�'�?��?��</button>
          </div>
        </form>
      </div>
    </div>
  );
}
