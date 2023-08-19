import PopupWithForm from './PopupWithForm.js';
import React, { useRef, useEffect } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  useEffect(() => {
    avatar.current.value ='';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatar"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          type="url"
          name="link"
          id="avatarLinkInput"
          autoComplete="off"
          placeholder="Ссылка на картинку"
          ref={avatar}
          required
        />
        <span className="error" id="avatarLinkInput-error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;