const formObject = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputError: '.popup__input_error',
  errorClass: 'popup__input_error-active',
});


//выводим сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, {errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//скрываем сообщение об ошибке
const hideInputError = (formElement, inputElement, {errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//работаем с кнопкой
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//переключает режимы кнопки
function toggleButtonState (inputList, buttonElement, {inactiveButtonClass, ...rest}) {
  if (hasInvalidInput (inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
//проверяет поле на валидность
function checkInputValidity (formElement, inputElement, {...rest}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  }
  else {
    hideInputError(formElement, inputElement, rest);
  }
};
//получает массив инпутов и вешает на каждый слушатель
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //строка на том же месте, что и в тренажёре, но проверка при первом открытии не работает
  //я это победить не смог, увы
  toggleButtonState (inputList, buttonElement, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState (inputList, buttonElement, rest);
    });
  });
};
//получает массив форм и снимает стандартную обработку submit
function enableValidation ({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation (formObject);
