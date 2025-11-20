import { useState } from 'react';
import axios from 'axios';
import './login.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) newErrors.email = 'Email обязателен';
    else if (!emailRegex.test(email)) newErrors.email = 'Некорректный формат email';

    if (!password.trim()) newErrors.password = 'Пароль обязателен';
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const endpoint = isRegistering ? 'register' : 'login';
        const res = await axios.post(`http://localhost:3001/${endpoint}`, {
          email,
          password
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('userId', res.data.user.idUser);

        setSuccess(isRegistering ? '✅ Регистрация успешна!' : `✅ Вы вошли как ${res.data.role}`);
        setTimeout(() => {
          setSuccess('');
          window.location.reload();
        }, 500);

        setEmail('');
        setPassword('');
        setIsRegistering(false);
      } catch (err) {
        setErrors({ server: err.response?.data?.message || 'Ошибка сервера' });
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>

        <label>
          Email
          <input
            type="email"
            className={errors.email ? 'error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>

        <label>
          Пароль
          <input
            type="password"
            className={errors.password ? 'error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </label>

        <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>

        <button
          type="button"
          className="toggle-button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrors({});
            setSuccess('');
          }}
        >
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>

        {success && <div className="success-message">{success}</div>}
        {errors.server && <div className="error-message">{errors.server}</div>}
      </form>
    </div>
  );
};
