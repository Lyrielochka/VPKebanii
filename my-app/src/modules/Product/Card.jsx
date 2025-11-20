import { useState, useEffect } from 'react';

export const Card = ({ item, setSelected, handleEdit, handleDelete }) => {
  const { path, name, amenities, price } = item;
  const [liked, setLiked] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setLiked(favorites.some(fav => fav.path === item.path));
  }, [item]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = liked
      ? favorites.filter(fav => fav.path !== item.path)
      : [...favorites, item];

    localStorage.setItem('favorites', JSON.stringify(updated));
    setLiked(!liked);
  };

  return (
    <div className="Card">
      <div className="card-image-wrapper">
        <img src={path} alt={name} className="card-image" />
        <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={toggleFavorite}>♥</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <div className="amenities-list">
          {amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <img src={`/${amenity.icon}`} alt={amenity.label} className="amenity-icon" />
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>

        {role === 'admin' && (
          <div className="card-buttons">
            <button onClick={() => handleEdit(item)}>✏️</button>
            <button onClick={() => handleDelete(item.idCard)}>🗑️</button>
          </div>
        )}

        <div className="card-price">{price}$</div>
      </div>
    </div>
  );
};
