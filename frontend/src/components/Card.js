import btnDeleteCard from '../images/Trash.svg';
import btnLikeCard from '../images/Vector.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );

  const handleCard = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
      <article className="card">
        {isOwn && <button className="card__delete" type="button" onClick={handleDeleteClick} >
          <img className="card__trash" src={btnDeleteCard} alt="Кнопка удаления" />
        </button>}
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleCard}
        />
        <div className="card__title">
          <h2 className="card__name">{card.name}</h2>
          <div className="card__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} >
              <img src={btnLikeCard} alt="Кнопка лайк" />
            </button>
            <p className="card__like-number">{card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}

export default Card;