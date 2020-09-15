import Card from './Card.js';
import FormValidator from './FormValidator.js';

//массив начальных карточек(одну взял из описания пр, как пример карточки с длинным названием)
const initialCards = [
  {
    title: 'Аризона',
    source: './images/arizona.jpg'
  },
  {
    title: 'Челябинская Область',
    source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Калифорния',
    source: './images/california.jpg'
},
  {
    title: 'Монтана',
    source: './images/montana.jpg'
  },
  {
    title: 'Юта',
    source: './images/utah.jpg'
  },
  {
    title: 'Ванака',
    source: './images/wanaka.jpg'
  }
];

//объект формы
const formObject = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputError: '.popup__input_error',
  errorClass: 'popup__input_error-active',
});
const formValidator = new FormValidator(formObject);

//форма автора
const popupAuthor = document.querySelector('#edit-profile-popup');
const popupAuthorOpenButton = document.querySelector('.profile__edit-button');
const popupAuthorCloseButton = popupAuthor.querySelector('.popup__close-button');
const popupAuthorForm = popupAuthor.querySelector('.popup__form');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector ('.profile__description');
const nameInput =  popupAuthorForm.querySelector('.popup__input_name');
const descriptionInput =  popupAuthorForm.querySelector('.popup__input_description');

//форма добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardSaveButton = popupCard.querySelector('.popup__save-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const titleInput =  popupCardForm.querySelector('.popup__input_title');
const sourceInput =  popupCardForm.querySelector('.popup__input_source');

//карточки
const cardContainer = document.querySelector('.elements');

//пикчи
const popupImage = document.querySelector('#image-popup');

//общие функции
//открывает попапы
function openPopup (modalWindow) {
  modalWindow.classList.add('popup_opened');
}
//закрывает попапы
function closePopup (modalWindow) {
  modalWindow.classList.remove('popup_opened');
}
//закрывает попапы при клике Esc
function closePopupEsc () {
  if (event.key === 'Escape') {
    if (popupAuthor.classList.contains('popup_opened')){
      closePopup (popupAuthor);
      removeEventListenersOnAuthorPopup ();
    }
    else if (popupCard.classList.contains('popup_opened')){
      closePopup (popupCard);
      removeEventListenersOnCardPopup ();
    }
    else if (popupImage.classList.contains('popup_opened')){
      closePopup(popupImage);
    }
  }
}


//функции автора
//редактирует профиль автора
function formSubmitHandler () {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup (popupAuthor);
}
//слушатель формы попапа автора
function popupAuthorFormSubmit () {
  formSubmitHandler ();
  removeEventListenersOnAuthorPopup ();
}
//слушатель кнопки закрытия попапа автора
function popupAuthorCloseButtonClick () {
  closePopup (popupAuthor);
  removeEventListenersOnAuthorPopup ();
}
//слушатель оверлея попапа автора
function popupAuthorOverleyClick () {
  closePopup (popupAuthor);
  removeEventListenersOnAuthorPopup ();
}
//слушатель Esc попапа автора
function popupAuthorClickEsc () {
  closePopupEsc (popupAuthor);
}
//удаляет слушателей из попапа автора
function removeEventListenersOnAuthorPopup () {
  popupAuthorForm.removeEventListener('submit', popupAuthorFormSubmit);
  popupAuthorCloseButton.removeEventListener('click', popupAuthorCloseButtonClick);
  popupAuthor.querySelector('.popup__overlay').removeEventListener('click', popupAuthorOverleyClick);
  document.removeEventListener('keydown', popupAuthorClickEsc);
}
//добавляет слушателей в попап автора
function addEventListenersOnAuthorPopup () {
  popupAuthorForm.addEventListener('submit', popupAuthorFormSubmit);
  popupAuthorCloseButton.addEventListener('click', popupAuthorCloseButtonClick);
  popupAuthor.querySelector('.popup__overlay').addEventListener('click', popupAuthorOverleyClick);
  document.addEventListener('keydown', popupAuthorClickEsc);
}
//считывает значения строк при открытии попапа
function readStringPopupAuthor () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  formValidator.enableValidation(formObject, popupAuthor);
  addEventListenersOnAuthorPopup ();
  openPopup (popupAuthor);
}


//функции попапа добавления карточек
//считывает поля формы создания карточки
function addCard () {
  event.preventDefault();
  const title = titleInput.value;
  const source = sourceInput.value;
  const data = {title, source};
  renderCard (data);
  closePopup (popupCard);
  titleInput.value = '';
  sourceInput.value = '';
}
//слушатель формы попапа добавления карточек
function popupCardFormSubmit () {
  addCard ();
  removeEventListenersOnCardPopup ();
}
//слушатель кнопки закрытия попапа добавления карточек
function popupCardCloseButtonClick () {
  closePopup (popupCard);
  removeEventListenersOnCardPopup ();
}
//слушатель оверлея попапа добавления карточек
function popupCardOverleyClick () {
  closePopup (popupCard);
  removeEventListenersOnCardPopup ();
}
//слушатель Esc попапа добавления карточек
function popupCardClickEsc () {
  closePopupEsc (popupCard);
}
//удаляет слушателей из попапа добавления карточек
function removeEventListenersOnCardPopup () {
  popupCardForm.removeEventListener('submit', popupCardFormSubmit);
  popupCardCloseButton.removeEventListener('click', popupCardCloseButtonClick);
  popupCard.querySelector('.popup__overlay').removeEventListener('click', popupCardOverleyClick);
  document.removeEventListener('keydown', popupCardClickEsc);
  popupCardSaveButton.classList.add('popup__save-button_disabled');
  popupCardSaveButton.disabled = true;
}
//добавляет слушателей в попап добавления карточек
function addEventListenersOnCardPopup () {
  popupCardForm.addEventListener('submit', popupCardFormSubmit);
  popupCardCloseButton.addEventListener('click', popupCardCloseButtonClick);
  popupCard.querySelector('.popup__overlay').addEventListener('click', popupCardOverleyClick);
  document.addEventListener('keydown', popupCardClickEsc);
}

//функции карточек
//начальное создание карточек
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    renderCard (item);
  });
}
//создание карточек
const renderCard = (data) => {
  const card = new Card(data, popupImage, openPopup, closePopup, closePopupEsc);
  card.renderElement(card, cardContainer);
}
//вызов начального создания карточек
renderInitialCards();


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', function () {
  readStringPopupAuthor (popupAuthorOpenButton);
});

//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  addEventListenersOnCardPopup (popupCardOpenButton);
  formValidator.enableValidation(formObject, popupCard);
  openPopup (popupCard);
});
