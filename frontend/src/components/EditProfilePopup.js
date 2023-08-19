import PopupWithForm from './PopupWithForm.js';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfile"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          type="text"
          name="name"
          id="fullnameInput"
          minLength="2"
          maxLength="40"
          value={name ?? ""}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <span className="error" id="fullnameInput-error"></span>
        <input
          className="popup__input"
          type="text"
          name="identity"
          id="identityInput"
          minLength="2"
          maxLength="200"
          value={description ?? ""}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="error" id="identityInput-error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;