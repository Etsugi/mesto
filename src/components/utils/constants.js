//объект формы
export const formObject = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputError: '.popup__input_error',
  errorClass: 'popup__input_error-active',
});

//массив начальных карточек(одну взял из описания пр, как пример карточки с длинным названием)
export const initialCards = [
  {
    title: 'Аризона',
    source: './src/images/arizona.jpg'
  },
  {
    title: 'Челябинская Область',
    source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Калифорния',
    source: './src/images/california.jpg'
},
  {
    title: 'Монтана',
    source: './src/images/montana.jpg'
  },
  {
    title: 'Юта',
    source: './src/images/utah.jpg'
  },
  {
    title: 'Ванака',
    source: './src/images/wanaka.jpg'
  }
];
