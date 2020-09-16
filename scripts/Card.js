export default class Card {
  constructor (data, templateCard) {
    this._title = data.title;
    this._image = data.source;
    this._templateCard = templateCard;
  }
//клонирует карточку
  _getTemplate() {
    const cardElement = document.querySelector(this._templateCard)
    .content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
//генерирует карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListenersOnCard();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__text').textContent = this._title;
    return this._element;
  }
//лайкает карточку
  _likeCard(likeButton) {
    likeButton.classList.toggle('element__like-button_active');
  }
//удаляет карточку
  _deleteCard() {
    this._element.remove();
  }
//устанавливает слушатели на карточку
  _setEventListenersOnCard() {
    const likeButton = this._element.querySelector('.element__like-button');
    const deleteButton = this._element.querySelector('.element__trash-button');
    likeButton.addEventListener('click', () => {
      this._likeCard(likeButton);
    });
    deleteButton.addEventListener('click', () => {
      this._deleteCard();
    })
  }
}
