export default class FormValidator {
  constructor (formObject) {
    this._formObject = formObject;
  }
  //выводим сообщение об ошибке
  _showInputError (formElement, inputElement, errorMessage, {errorClass, ...rest}) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  //скрываем сообщение об ошибке
  _hideInputError (formElement, inputElement, {errorClass, ...rest}) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  //проверяет форму на валидность
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //переключает режимы кнопки
  _toggleButtonState (inputList, buttonElement, {inactiveButtonClass, ...rest}) {
    if (this._hasInvalidInput (inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }
  //проверяет поле на валидность
  _checkInputValidity (formElement, inputElement, {...rest}) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    }
    else {
      this._hideInputError(formElement, inputElement, rest);
    }
  };
  //получает массив инпутов и вешает на каждый слушатель
  _setEventListeners (formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState (inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleButtonState (inputList, buttonElement, rest);
      });
      document.addEventListener('keydown', () => {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleButtonState (inputList, buttonElement, rest);
      });
      document.addEventListener('click', () => {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleButtonState (inputList, buttonElement, rest);
      });
    });
  };
  //получает массив форм и снимает стандартную обработку submit
  enableValidation ({formSelector, ...rest}, formsList) {
    formsList.forEach((formElement) => {
      this._setEventListeners(formElement, rest);
    });
  };
}
