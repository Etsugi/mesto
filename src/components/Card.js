export default class Card {
  constructor (data, myId, templateCard, {handleCardClick, likeCardClick, disLikeCardClick, deleteCardClick}) {
    this._title = data.name;
    this._image = data.link;
    this._ownerId = data._ownerId;
    this._id = data._id;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._likeCardClick = likeCardClick;
    this._disLikeCardClick = disLikeCardClick;
    this._deleteCardClick = deleteCardClick;
    this._myId = myId;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateCard)
    .content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__trash-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListenersOnCard();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__text').textContent = this._title;
    if(this._ownerId != this._myId) {
      this._element.querySelector('.element__trash-button').classList.add('element__trash-button-disabled');
    }
    return this._element;
  }

  _likeCard() {
    this._likeButton.classList.add('element__like-button_active');

  }

  _disLikeCard() {
    this._likeButton.classList.remove('element__like-button_active');

  }

  _checkLikeEnabled(evt) {
    if(evt.target.classList.contains('element__like-button_active')) {
      this._disLikeCardClick();
    }
    else {
      this._likeCardClick();
    }
  }

  _checkLikeCounter (data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _checkLike(data) {
    this._checkLikeCounter (data);
    data.likes.forEach(element => {
      if(element._id === this._myId) {
        this._likeCard(element);
      }
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListenersOnCard() {
    this._likeButton.addEventListener('click', () => {
      this._checkLikeEnabled(event);
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(event)
    });
  }
}
