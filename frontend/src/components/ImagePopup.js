import btnPopupClose from '../images/CloseIcon.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? 'popup_opened' : ''}`} id="popupImage">
      <div className="popup__containerImage">
        <button className="popup__btnborder" type="button">
          <img
            className="popup__btn-close"
            id="popup__btn-closeImage"
            src={btnPopupClose}
            alt="Кнопка закрытия"
            onClick={props.onClose}
          />
        </button>
        <img
          className="popup__image"
          id="imageSrc"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__image-name" id="imageName">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;