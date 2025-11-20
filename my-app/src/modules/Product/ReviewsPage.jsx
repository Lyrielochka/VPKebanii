import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../theme/scss/ReviewsPage.scss';

export function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:3001/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/reviews', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchReviews();
      setFormData({ name: '', text: '', rating: 5 });
    } catch (err) {
      console.error('Ошибка при отправке отзыва:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (idReview) => {
    try {
      await axios.delete(`http://localhost:3001/reviews/${idReview}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(prev => prev.filter(r => r.idReview !== idReview));
    } catch (err) {
      console.error('Ошибка удаления отзыва:', err.response?.data || err.message);
    }
  };

  const handleEdit = (review) => {
    setEditId(review.idReview);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/reviews/${editId}`, {
        text: editText,
        rating: editRating
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchReviews();
      setEditId(null);
    } catch (err) {
      console.error('Ошибка обновления отзыва:', err.response?.data || err.message);
    }
  };

  return (
    <div className="reviewsPage">
      <h2>Отзывы</h2>

      <div className="reviewList">
        {reviews.map((r) => (
          <div key={r.idReview} className="reviewCard">
            <strong>{r.name}</strong>
            <p>{r.text}</p>
            <span className="stars">
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </span>
            { role === 'admin' && (
            <div className="editbuttnos">
              <button onClick={() => handleEdit(r)}>✏️</button>
              <button onClick={() => handleDelete(r.idReview)}>🗑️</button>
            </div>
            )}
          </div>
        ))}
      </div>

      {editId && (
        <div className="editForm">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <select
            value={editRating}
            onChange={(e) => setEditRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>
                {'★'.repeat(r)}{'☆'.repeat(5 - r)}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Сохранить</button>
        </div>
      )}

      <h3>Оставить отзыв</h3>
      {token ? (
      <form onSubmit={handleSubmit} className="reviewForm">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="text"
          placeholder="Ваш отзыв"
          value={formData.text}
          onChange={handleChange}
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>
              {'★'.repeat(r)}{'☆'.repeat(5 - r)}
            </option>
          ))}
        </select>
        <button type="submit">Отправить</button>
      </form>
      ) : (
        <p>Чтобы оставить отзыв, авторизуйтесь.</p>
    )}
    </div>
  );
}
