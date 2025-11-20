import "../../theme/scss/ProfileModal.scss";

export function ProfileModal({ profile, onClose }) {
  if (!profile) return null;

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="profile-modal__close" onClick={onClose}>✖</button>

        <div className="profile-modal__top">
          <img
            src={profile.photo ? `${profile.photo}` : "/default-avatar.png"}
            alt={profile.fullName}
            className="profile-modal__photo"
          />
          <p>Звание</p>
          {profile.rank && (
            <img
              src={`${profile.rank}`}
              alt="Звание"
              className="profile-modal__rank"
            />
          )}
          <h2>{profile.fullName}</h2>
          <p className="profile-modal__grade">Класс: <strong>{profile.grade || "—"}</strong></p>
        </div>

        <div className="profile-modal__info">
          <p><strong>Пол:</strong> {profile.gender || "—"}</p>
        </div>

        {profile.tokens?.length > 0 && (
          <div className="profile-modal__tokens">
            <h3>Достижения</h3>
            <div className="profile-modal__token-list">
              {profile.tokens.map((token, i) => (
                <img
                  key={i}
                  src={`${token}`}
                  alt={`Токен ${i + 1}`}
                  className="profile-modal__token"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
