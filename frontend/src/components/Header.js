import headerLogo from '../images/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import React from 'react';

function Header({ loggedIn, logOut, email }) {
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    Cookies.set('token', '');
    logOut();
    navigate('/sign-in');
  }

  function navToSignUp() {
    navigate("/sign-up");
  }

  function navToSignIn() {
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {getBtn({ loggedIn, pathname: location.pathname, email, signOut, navToSignIn, navToSignUp })}
    </header>
  )
}

export default Header;


const getBtn = ({ loggedIn, pathname, email, signOut, navToSignIn, navToSignUp }) => {
  if (loggedIn) {
    return (<>
      <span className='header__email'>{email}</span>
      <button className='header__btn header__btn-out' onClick={signOut}>Выйти</button>
    </>)
  } else {
    switch(pathname) {
      case "/sign-in":
        return <button className='header__btn' onClick={navToSignUp}>Регистрация</button>;
      case "/sign-up":
        return <button className='header__btn' onClick={navToSignIn}>Войти</button>;
    }
  }
}