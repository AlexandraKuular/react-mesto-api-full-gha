import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue);
    navigate('/sign-in');
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form popup__form">
        <input
          className="auth__input"
          type="emil"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
          required
        />
        <span className="error" id="fullnameInput-error"></span>
        <input
          className="auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          required
        />
        <button className="auth__btn" onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      <p className="auth__link"><Link to='/sign-in' className="auth__link">Уже зарегестрированны? Войти</Link></p>
    </section>
  )
}

export default Register;