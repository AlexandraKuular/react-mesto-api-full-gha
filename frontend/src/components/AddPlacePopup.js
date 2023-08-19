import PopupWithForm from './PopupWithForm.js';
import React, { useRef, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const name = useRef();
  const link = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name.current.value,
      link: link.current.value
    });
  }

  useEffect(() => {
    name.current.value ='';
    link.current.value ='';
  }, [isOpen]);

  return(
    <PopupWithForm
      title="Новое место"
      name="add"
      textBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          type="text"
          name="imgName"
          id="cardNameInput"
          autoComplete="off"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          ref={name}
          required
        />
        <span className="error" id="cardNameInput-error"></span>
        <input
          className="popup__input"
          type="url"
          name="link"
          id="cardLinkInput"
          autoComplete="off"
          placeholder="Ссылка на картинку"
          ref={link}
          required
        />
        <span className="error" id="cardLinkInput-error"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;