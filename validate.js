const formObject = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputError: '.popup__input_error',
});

//выводим сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error-active');
};

//скрываем сообщение об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
  errorElement.classList.remove('popup__input_error-active');
  errorElement.textContent = '';
};

//работаем с кнопкой
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput (inputList)) {
    buttonElement.setAttribute("disabled", true);
    //buttonElement.disable = true;
  }
  else {
    console.log(buttonElement);
    buttonElement.removeAttribute("disabled", false);
    //buttonElement.disable = false;
  }
}

//проверяем поле на валидность
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
};

//получаем массив инпутов и вешаем на каждый слушатель
const setEventListeners = (formObject, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);

  //строка на том же месте, что и в тренажёре, но проверка при первом открытии не работает
  //я это победить не смог, увы
  toggleButtonState (inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState (inputList, buttonElement);
    });
  });
};

//получаем массив форм и снимаем стандартную обработку submit
function enableValidation () {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formObject, formElement);
  });
};

enableValidation (formObject);
