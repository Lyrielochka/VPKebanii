import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "../../theme/scss/Profile.scss";
import { buildImageUrl, getImageOptions } from "../../services/imageService";

export function AdminEditProfile() {
  const { idProfile } = useParams();
  const role = localStorage.getItem("role");

  const [imageOptions, setImageOptions] = useState([]);
  const [profileData, setProfileData] = useState({
    fullName: "",
    gender: "",
    parents: "",
    grade: "",
    phone: "",
    photo: "",
    rank: "",
    tokens: [],
  });

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    gender: false,
    parents: false,
    grade: false,
    phone: false,
  });

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
<<<<<<< HEAD
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
=======
    api
      .get("/images")
      .then((res) => setImageOptions(res.data))
      .catch((err) => console.error("Ошибка загрузки изображений:", err));
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
  }, []);

  useEffect(() => {
    if (idProfile) {
<<<<<<< HEAD
      axios
        .get(`https://wmp.by/profiles/${idProfile}`)
=======
      api
        .get(`/profiles/${idProfile}`)
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
        .then((res) => {
          const profile = res.data;
          setProfileData({
            fullName: profile.fullName || "",
            gender: profile.gender || "",
            parents: profile.parents || "",
            grade: profile.grade || "",
            phone: profile.phone || "",
            photo: profile.photo?.replace("/Images/", "") || "",
            rank: profile.rank?.replace("/Images/", "") || "",
            tokens: (profile.tokens || []).map((t) => t.replace("/Images/", "")),
          });
        })
        .catch((err) => {
          console.error("Ошибка загрузки профиля:", err);
        });
    }
  }, [idProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTokenAdd = (e) => {
    const value = e.target.value;
    if (value && !profileData.tokens.includes(value)) {
      const updated = [...profileData.tokens, value].slice(0, 10);
      setProfileData((prev) => ({ ...prev, tokens: updated }));
    }
    e.target.value = "";
  };

  const handleTokenRemove = (index) => {
    setProfileData((prev) => {
      const updated = [...prev.tokens];
      updated.splice(index, 1);
      return { ...prev, tokens: updated };
    });
  };

  const handleSave = async () => {
    try {
<<<<<<< HEAD
      await axios.put(`https://wmp.by/profiles/${idProfile}`, {
=======
      await api.put(`/profiles/${idProfile}`, {
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
        fullName: profileData.fullName,
        gender: profileData.gender,
        parents: profileData.parents,
        grade: profileData.grade,
        phone: profileData.phone,
        photo: profileData.photo ? `/Images/${profileData.photo}` : "",
        rank: profileData.rank ? `/Images/${profileData.rank}` : "",
        tokens: profileData.tokens.map((t) => `/Images/${t}`),
      });
      alert("Профиль обновлён");
    } catch (err) {
      console.error("Ошибка сохранения профиля:", err);
    }
  };

  return (
    <div className="profile">
      <h2 className="profile__title">
        Личный кабинет
        <img className="mark" src="/headerUS.png" alt="" />
      </h2>

      <div className="profile__layout">
        <div className="profile__left">
          <div className="profile__rank">
            {profileData.rank && (
              <img
<<<<<<< HEAD
                src={buildImageUrl(profileData.rank)}
=======
                src={`/Images/${profileData.rank}`}
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
                alt="Звание"
                loading="lazy"
              />
            )}
            {role === "admin" && (
              <label className="profile__upload-btn">
                Выбрать звание
                <select name="rank" value={profileData.rank} onChange={handleChange}>
                  <option value="">-- Выберите изображение --</option>
                  {imageOptions.map((filename) => (
                    <option key={filename} value={filename}>
                      {filename}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="profile__avatar">
            {profileData.photo ? (
              <img
<<<<<<< HEAD
                src={buildImageUrl(profileData.photo)}
=======
                src={`/Images/${profileData.photo}`}
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
                alt="Аватар"
                loading="lazy"
              />
            ) : (
              <div className="profile__avatar-placeholder">Фото</div>
            )}
            {role === "admin" && (
              <label className="profile__upload-btn">
                Выбрать фото
                <select name="photo" value={profileData.photo} onChange={handleChange}>
                  <option value="">-- Выберите изображение --</option>
                  {imageOptions.map((filename) => (
                    <option key={filename} value={filename}>
                      {filename}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="profile__name-block">
            {isEditing.fullName ? (
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                onBlur={() => toggleEdit("fullName")}
              />
            ) : (
              <h3 onClick={() => toggleEdit("fullName")}>
                {profileData.fullName || "ФИО не указано"}{" "}
                <span className="edit-icon">✏️</span>
              </h3>
            )}
          </div>

          <button className="profile__save-btn" onClick={handleSave}>
            Сохранить
          </button>
        </div>

        <div className="profile__right">
          <div className="profile__info">
            {["gender", "parents", "grade", "phone"].map((field) => (
              <div key={field} className="profile__info-item">
                <label>
                  {field === "gender"
                    ? "Пол"
                    : field === "parents"
                    ? "Родители"
                    : field === "grade"
                    ? "Класс"
                    : "Телефон"}
                </label>
                {isEditing[field] ? (
                  field === "gender" ? (
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      onBlur={() => toggleEdit(field)}
                    >
                      <option value="">Выберите</option>
                      <option value="Мужской">Мужской</option>
                      <option value="Женский">Женский</option>
                    </select>
                  ) : (
                    <input
                      type={field === "phone" ? "tel" : "text"}
                      name={field}
                      value={profileData[field]}
                      onChange={handleChange}
                      onBlur={() => toggleEdit(field)}
                    />
                  )
                ) : (
                  <p onClick={() => toggleEdit(field)}>
                    {profileData[field] || "Не указано"}{" "}
                    <span className="edit-icon">✏️</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="profile__tokens">
            <label>Жетоны ({profileData.tokens.length}/10)</label>
            {role === "admin" && (
              <label className="profile__upload-btn">
                Добавить жетон
                <select onChange={handleTokenAdd}>
                  <option value="">-- Выберите изображение --</option>
                  {imageOptions.map((filename) => (
                    <option key={filename} value={filename}>
                      {filename}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <div className="profile__tokens-preview">
              {profileData.tokens.map((token, index) => (
                <div key={index} className="profile__token-item">
                  <img
<<<<<<< HEAD
                    src={buildImageUrl(token)}
=======
                    src={`/Images/${token}`}
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
                    alt={`Жетон ${index + 1}`}
                    loading="lazy"
                  />
                  {role === "admin" && (
                    <button
                      className="profile__token-remove"
                      onClick={() => handleTokenRemove(index)}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
