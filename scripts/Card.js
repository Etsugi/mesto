export default class Card {
  static _cardTemplate = document.querySelector('#card-template').content;
  constructor (data, popupImage, openPopup, closePopup, closePopupEsc) {
    this._title = data.title;
    this._image = data.source;
    this._popupImage = popupImage;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
    this._closePopupEsc = closePopupEsc;
  }
//клонирует карточку
  _getTemplate() {
    const cardElement = Card._cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }
//генерирует карточку
  _generateCard() {
    this._element = this._getTemplate();
    this._setEventListenersOnCard();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__text').textContent = this._title;
    return this._element;
  }
//добавляет карточку в разметку
  renderElement(card, cardContainer) {
    const cardElement = card._generateCard();
    cardContainer.prepend(cardElement);
}
//лайкает карточку
  _likeCard(likeButton) {
    likeButton.classList.toggle('element__like-button_active');
  }
//удаляет карточку
  _deleteCard() {
    this._element.remove();
  }
//открывает попап изображения карточки
  _openPopupCard(target) {
    if (target.classList.contains('element__image')) {
      this._popupImageCard (target);
      this._openPopup (this._popupImage);
    }
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
    this._element.addEventListener('click', () => {
      const target = event.target;
      this._openPopupCard(target);
    });
  }
//слушатель закрытия попапа изображений
   _popupImageCloseClick = () => {
    this._closePopup (this._popupImage);
    this._removeEventListenersOnImagePopup ();
  }
//слушатель Esc попапа изображений
  _popupImageClickEsc = () => {
    this._closePopupEsc (this._popupImage);
    this._removeEventListenersOnImagePopup ();
  }
//устанавливает слушатели на попап изображения карточки
  _addEventListenersOnImagePopup () {
    const closeButton = this._popupImage.querySelector('.popup__close-button');
    const overley = this._popupImage.querySelector('.popup__overlay_for-image');
    closeButton.addEventListener('click', this._popupImageCloseClick);
    overley.addEventListener('click', this._popupImageCloseClick);
    document.addEventListener('keydown', this._popupImageClickEsc);
  }
  //удаляет слушатели с попапа изображений
  _removeEventListenersOnImagePopup () {
    const closeButton = this._popupImage.querySelector('.popup__close-button');
    const overley = this._popupImage.querySelector('.popup__overlay_for-image');
    closeButton.removeEventListener('click', this._popupImageCloseClick);
    overley.removeEventListener('click', this._popupImageCloseClick);
    document.removeEventListener('keydown', this._popupImageClickEsc);
  }
  //считывает попап изображения карточки
  _popupImageCard (data) {
    const popupPicture = this._popupImage.querySelector('.popup__image');
    const popupImageDescription = this._popupImage.querySelector('.popup__image-description');
    popupPicture.src = data.src;
    popupPicture.alt = data.alt;
    popupImageDescription.textContent = data.alt;
    this._addEventListenersOnImagePopup ();
  }
}
