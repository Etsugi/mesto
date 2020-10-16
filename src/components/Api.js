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
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
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
        if(data) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
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
        if(data) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
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
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
      })
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  disLikeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}


