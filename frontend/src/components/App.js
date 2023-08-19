import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

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

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCard({ idCard: card._id, isLiked}).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
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
    Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([item, data]) => {
          setCards(item);
          setCurrentUser(data);
        })
        .catch((err) => {console.log(err)});
  }, []);

  function handleUpdateUser({name, about}) {
    api
      .setUserInfo({name, about})
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
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