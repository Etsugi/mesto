export default class Api {
  constructor (config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.source
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  disLikeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}
