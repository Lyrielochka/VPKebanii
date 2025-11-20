import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../../theme/scss/AdminUsersPage.scss";

export function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role !== "admin") {
      setUnauthorized(true);
      setLoading(false);
      return;
    }

<<<<<<< HEAD
    if (token) {
      axios
        .get("https://wmp.by/users-with-profiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Ошибка загрузки пользователей:", err);
          setUnauthorized(true);
          setLoading(false);
        });
    } else {
=======
    if (!token) {
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
      setUnauthorized(true);
      setLoading(false);
      return;
    }

    api
      .get("/users-with-profiles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки пользователей:", err);
        setUnauthorized(true);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = async (idUser) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Удалить пользователя и его профиль?");
    if (!confirm) return;

    try {
<<<<<<< HEAD
      await axios.delete(`https://wmp.by/users/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
=======
      await api.delete(`/users/${idUser}`, {
        headers: { Authorization: `Bearer ${token}` },
>>>>>>> 53f0a549a4394f977e89e0b0e9c6d20634ff205b
      });
      setUsers((prev) => prev.filter((user) => user.idUser !== idUser));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить пользователя.");
    }
  };

  if (loading) {
    return <div className="admin-users">Загрузка...</div>;
  }

  if (unauthorized) {
    return (
      <div className="admin-users">
        <h2>Доступ запрещён</h2>
        <p>У вас нет прав для просмотра этой страницы.</p>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <h2>Пользователи сайта</h2>
      <div className="admin-users__list">
        {users.map((user) => (
          <div key={user.idUser} className="admin-users__card">
            <h3>{user.email}</h3>
            {user.profile ? (
              <>
                <p>ФИО: {user.profile.fullName || "—"}</p>
                <p>Класс: {user.profile.grade || "—"}</p>
                <div className="admin-users__btn-group">
                  <button
                    className="admin-users__edit-btn"
                    onClick={() =>
                      navigate(`/admin/profile/${user.profile.idProfile}`)
                    }
                  >
                    ✏️ Редактировать профиль
                  </button>
                  <button
                    className="admin-users__delete-btn"
                    onClick={() => handleDeleteUser(user.idUser)}
                  >
                    🗑️
                  </button>
                </div>
              </>
            ) : (
              <p>Профиль не создан</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
