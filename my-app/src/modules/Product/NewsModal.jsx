import "../../theme/scss/NewsModal.scss";

export function NewsModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={item.img} alt={item.title} className="modal-image" />
        <div className="modal-text">
          <span className="modal-category">{item.category}</span>
          <h2 className="modal-title">{item.title}</h2>
          <p className="modal-meta">{item.author} • {item.date}</p>
          <p className="modal-summary">{item.summary}</p>

          {item.images?.length > 0 && (
            <div className="modal-gallery">
              {item.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Доп. фото ${i + 1}`}
                  className="modal-gallery__image"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
