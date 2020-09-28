//для удаления слушателей, без них я не смог Т_Т
let popupCloseButton = '';
let popupCloseOverley = '';
let popupCloseEsc = '';

export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._button = this._popupSelector.querySelector('.popup__close-button');
    this._overley = this._popupSelector.querySelector('.popup__overlay');
  }

  open () {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListenersOnPopup ();
  }

  close () {
    this._popupSelector.classList.remove('popup_opened');
    this.removeEventListenersOnPopup ();
  }

  _handleEscClose () {
    document.addEventListener('keydown', popupCloseEsc = () => {
      if (event.key === 'Escape') {
        this.close (this._popupSelector);
      }
    });
  }

  setEventListenersOnPopup () {
    this._button.addEventListener('click', popupCloseButton = () => {
      this.close ();
    });
    this._overley.addEventListener('click', popupCloseOverley = () => {
      this.close ();
    });
    this._handleEscClose ();
  }

  removeEventListenersOnPopup () {
    this._button.removeEventListener('click', popupCloseButton);
    this._overley.removeEventListener('click', popupCloseOverley);
    document.removeEventListener('keydown', popupCloseEsc);
  }
}
