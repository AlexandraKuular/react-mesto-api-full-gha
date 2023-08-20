import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onSubmit }) {

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
    if (!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__btn" onClick={handleSubmit}>Войти</button>
      </form>
    </section>
  )
}

export default Login;