class Auth {  
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }
  
  _checkRes(res) {
    if (res.ok) {
      Cookies.set
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then(this._checkRes);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then(this._checkRes);
  }

  getMe(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkRes);
  }
}

const auth = new Auth({
  baseUrl: 'http://api.alexkuular.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;