import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, {confirmSubmitHandler}) {
    super(popupSelector);
    this._confirmSubmitHandler = confirmSubmitHandler;
    this._submit = this._submit.bind(this);
    this._form = popupSelector.querySelector('.popup__form');
  }

  _submit (evt) {
    evt.preventDefault();
    this._confirmSubmitHandler(this._data);
    this._form.removeEventListener('submit', this._submit);
  }

  open (data) {
    super.open();
    this._data = data;
  }

  close () {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }
}
