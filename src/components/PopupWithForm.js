import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, {formSubmitHandler}) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._submit = this._submit.bind(this);
    this._form = this._popupSelector.querySelector('.popup__form');
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
  }

  close () {
    this._form.reset();
    super.close();
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }
}
