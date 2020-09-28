import Popup from './Popup.js';

//для удаления слушателей, без них я не смог Т_Т
let popupForm = '';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._submit = formSubmitHandler;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues () {
    this._submit ();
  }

  open () {
    super.open();
    this.setEventListenersOnForm ();
  }

  close () {
    //this._form.reset();
    super.close();
    this.removeEventListenersOnForm();
  }

  setEventListenersOnForm () {
    this._form.addEventListener('submit', popupForm = () => {
      this.close();
      this._getInputValues();
    });
  }

  removeEventListenersOnForm () {
    super.removeEventListenersOnPopup(this._popupSelector);
    this._form.removeEventListener('submit', popupForm);
  }
}
