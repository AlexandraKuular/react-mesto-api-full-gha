import profileAvatarBtnEdit from '../images/Edit.svg';
import profileBtnEdit from '../images/EditButton.svg';
import btnAddCard from '../images/AddButton.svg';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-btnedit" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar-edit" src={profileAvatarBtnEdit} alt="Кнопка редактирования" />
          </button>
          <img className="profile__avatarimg" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__info-btnborder" type="button" onClick={onEditProfile}>
              <img className="profile__info-btn" src={profileBtnEdit} alt="Кнопка редактирования" />
            </button>
          </div>
          <p className="profile__info-identity">{currentUser.about}</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}>
          <img className="profile__button-plus" src={btnAddCard} alt="Кнопка добавления" />
        </button>
      </section>
      <section className="cards" id="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main;