import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import auth from '../utils/Auth.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import Cookies from "js-cookie";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({open: false, message: '', status: null});
  const [email, setEmail] = useState();

  const logOut = () => {
    Cookies.remove('token');
    setEmail('');
    setLoggedIn(false);
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (data) => {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(data);
  }

  const handleInfoTooltip = () => {
    setInfoTooltip({open: true, message: "Вы успешно зарегистрировались!", status: "success"});
  }

  const handleInfoTooltipFail = () => {
    setInfoTooltip({open: true, message: "Что-то пошло не так! Попробуйте ещё раз.", status: "fail"});
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip({open: false});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    if (isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        ._deleteLike(card._id)
        .then(({card}) => {
          setCards((state) => state.map((c) => c._id === card._id ? card : c));
        })
        .catch((err) => {console.log(err)});
    } else {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .likeCard({ idCard: card._id, isLiked})
        .then(({card}) => {
          setCards((state) => state.map((c) => c._id === card._id ? card : c));
        })
        .catch((err) => {console.log(err)});
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([item, data]) => {
          console.log(item, data);
          setCards(item);
          setCurrentUser(data);
        })
        .catch((err) => {console.log(err)});
    }
  }, [loggedIn]);

  function handleUpdateUser({name, about}) {
    api
      .setUserInfo({name, about})
      .then((data) => {
        setCurrentUser(data.user);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then(({user}) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then(({card}) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }


  function handleRegister({ email, password }) {
    return auth
      .register({ email, password })
      .then((res) => {
        handleInfoTooltip();
        return res;
      })
      .catch((err) => {
        handleInfoTooltipFail();
      });
  }

  function handleLogin({ email, password}) {
    auth
      .login({ email, password })
      .then((data) => {
        if(data.token) {
          Cookies.set('token', data.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        handleInfoTooltipFail();
      });
  }

  function getMe() {
    const jwt = Cookies.get("token");
    
    if(jwt) {
      auth
        .getMe(jwt)
        .then((data) => {
          if(data.email) {
            setEmail(data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if(Cookies.get('token')) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && !email) {
      getMe();
    }
  }, [loggedIn, email]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <BrowserRouter>
            <Header loggedIn={loggedIn} logOut={logOut} email={email}/>
            
            <Routes>
              <Route path="/sign-up" element={loggedIn ? (<Navigate to="/" />) : <Register onSubmit={handleRegister} />} />
              <Route path="/sign-in" element={loggedIn ? (<Navigate to="/" />) : (
                <Login onSubmit={handleLogin} loggedIn={loggedIn} />)} />
              <Route path="/" element={<ProtectedRoute element={<Main 
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />}
                loggedIn={loggedIn} />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>

        <InfoTooltip
          open={infoTooltip.open}
          message={infoTooltip.message}
          status={infoTooltip.status}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="deleteCard"
          textBtn="Да"
          onClose={closeAllPopups} />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;