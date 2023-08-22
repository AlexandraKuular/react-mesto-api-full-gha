import Cookies from "js-cookie";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  //Проверка запроса
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkRes);
  }

  //Запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Редактирование профиля
  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
    .then(this._checkRes);
  }

  //Добавление новой карточки
  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      },
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(this._checkRes);
  }

    //Обновление аватара
    changeAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkRes);
    }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkRes);
  }

  //Постановка лайка
  _putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkRes);
  }

  //Снятие лайка
  _deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkRes);
  }

  likeCard({idCard, isLiked}) {
    if (isLiked) {
      return this._deleteLike(idCard);
    }
    return this._putLike(idCard);
  }
}

const api = new Api({
  baseUrl: 'https://api.alexkuular.nomoreparties.co'
});
export default api;