import btnPopupClose from '../images/CloseIcon.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__btnborder" type="button" onClick={props.onClose}>
          <img
            className="popup__btn-close"
            id="popup__btn-closeProfile"
            src={btnPopupClose}
            alt="Кнопка закрытия"
          />
        </button>
        <h2 className="popup__container-edit">{props.title}</h2>
        <form className={`popup__form popup__form-${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__btn-save" type="submit">{props.textBtn}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;