import btnPopupClose from '../images/CloseIcon.svg';
import authSuccess from '../images/authSuccess.svg';
import authFail from '../images/authFail.svg';

function InfoTooltip({ open, message, status, onClose }) {

  const getIcon = (status) => {
    switch (status) {
      case "success": 
        return authSuccess;
      case "fail":
        return authFail;
    }
  }

  return (
    <div className={`popup ${open ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__btnborder" type="button" onClick={onClose}>
          <img
            className="popup__btn-close"
            id="popup__btn-closeProfile"
            src={btnPopupClose}
            alt="Кнопка закрытия"
          />
        </button>
        <img
          className='popup__auth-icon'
          src={getIcon(status)}
        />
        <h2 className="popup__auth-text">{message}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;