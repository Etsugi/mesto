import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, {formSubmitHandler}) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._submit = this._submit.bind(this);
    this._form = this._popupSelector.querySelector('.popup__form');
    //this._input = this._form.querySelectorAll('.popup__input');
  }

  _submit (evt) {
    evt.preventDefault();
    this._formSubmitHandler (this._getInputValues());
  }

  _getInputValues () {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;

  }

  open () {
    super.open();
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListenersOnForm ();
  }

  close () {
    this._form.reset();
    this._form.removeEventListener('submit', this._submit);
    super.close();
  }

  setEventListenersOnForm () {
    this._form.addEventListener('submit', this._submit);
  }
}
