import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (data, popupSelector) {
    super(popupSelector);
    this._data = data.target;
  }
  open () {
    this._popupSelector.querySelector('.popup__image').src = this._data.src;
    this._popupSelector.querySelector('.popup__image').alt = this._data.alt;
    this._popupSelector.querySelector('.popup__image-description').textContent = this._data.alt;
    super.open();
  }
}
