export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._button = this._popupSelector.querySelector('.popup__close-button');
    this._overley = this._popupSelector.querySelector('.popup__overlay');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListenersOnPopup ();
  }

  close () {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (event) {
    if (event.key === 'Escape') {
      this.close ();
    }
  }

  setEventListenersOnPopup () {
    this._button.addEventListener('click', () => {
      this.close ();
    });
    this._overley.addEventListener('click', () => {
      this.close ();
    });
  }
}
