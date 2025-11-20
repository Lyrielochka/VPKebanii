import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../theme/scss/Lauout.scss";

export function Lauout(props) {
  const { setShowModalCart = () => {}, showModalCart = false } = props;

  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token && storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const clearStorage = () => {
    localStorage.clear();
    setRole(null);
    window.location.reload();
  };

  return (
    <div className="layout">
      <nav>
        <Link to="/">
          <div><img className='logo' src="/gerb.png" alt="Логотип" /></div>
        </Link>

        {!menuOpen && (
          <button className="burger" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        )}

        <div ref={menuRef} className={`layout-links ${menuOpen ? "open" : ""}`}>
          <a href="#about">О нас</a>
          <a href="#team">Команда</a>
          <Link to="/news">Новости</Link>
          <Link to="/advuntures">Достижения</Link>
          <Link to="/contacts">Контакты</Link>
          {role && <Link to="/cabinet">Личный кабинет</Link>}
          {role === "admin" && <Link to="/admin/users">Пользователи</Link>}


          {!role && (
            <Link to="/login" className="authorize mobile-only">Войти</Link>
          )}

          {role && (
            <div className="user-role mobile-only">
              <span>{role}</span>
              <span className="clear-role" onClick={clearStorage}>❌</span>
            </div>
          )}
        </div>

        <div className="layout-contact desktop-only">
          {!role && (
            <Link to="/login" className="authorize">Войти</Link>
          )}
          {role && (
            <div className="user-role">
              <span>{role}</span>
              <span className="clear-role" onClick={clearStorage}>❌</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
