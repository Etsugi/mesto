import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image');
    this._description = this._popupSelector.querySelector('.popup__image-description');
  }
  open (data) {
    this._image.src = data.image;
    this._image.alt = data.description;
    this._description.textContent = data.description;
    super.open();
  }
}
