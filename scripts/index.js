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
//валидация
const formValidator = new FormValidator(formObject);
//форма автора
const popupAuthor = document.querySelector('#edit-profile-popup');
const popupAuthorOpenButton = document.querySelector('.profile__edit-button');
const popupAuthorForm = popupAuthor.querySelector('.popup__form');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector ('.profile__description');
const nameInput =  popupAuthorForm.querySelector('.popup__input_name');
const descriptionInput =  popupAuthorForm.querySelector('.popup__input_description');
//форма добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const titleInput =  popupCardForm.querySelector('.popup__input_title');
const sourceInput =  popupCardForm.querySelector('.popup__input_source');
//карточки
const cardContainer = document.querySelector('.elements');
//картинки
const popupImage = document.querySelector('#image-popup');
//для функций слушателей
let popupCloseButton = '';
let popupCloseOverley = '';
let popupCloseEsc = '';
let popupForm = '';


//общие функции
//открывает попапы
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
//закрывает попапы
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}
//удаляет слушатели из попапа
function removeEventListenersOnPopup (form, button, overley) {
  if (form != null) {
    form.removeEventListener('submit', popupForm);
  }
  button.removeEventListener('click', popupCloseButton);
  overley.removeEventListener('click', popupCloseOverley);
  document.removeEventListener('keydown', popupCloseEsc)
}
//добавляет слушатели в попап
function addEventListenersOnPopup (popup) {
  const button = popup.querySelector('.popup__close-button');
  const overley = popup.querySelector('.popup__overlay');
  const form = popup.querySelector('.popup__form');

  if (form != null) {
    form.addEventListener('submit', popupForm = () => {
      if (popup.id === 'edit-profile-popup') {
        closePopup (popup);
        formAuthorSubmitHandler (form, button, overley);
      }
      else if (popup.id === 'add-card-popup') {
        closePopup (popup);
        formCardSubmitHandler (form, button, overley);
      }
    });
  }
  button.addEventListener('click', popupCloseButton = () => {
    closePopup (popup);
    removeEventListenersOnPopup (form, button, overley);
  });
  overley.addEventListener('click', popupCloseOverley = () => {
    closePopup (popup);
    removeEventListenersOnPopup (form, button, overley);
  });
  document.addEventListener('keydown', popupCloseEsc = () => {
    if (event.key === 'Escape') {
      closePopup (popup);
      removeEventListenersOnPopup (form, button, overley);
    }
  });
}


//функции автора
//редактирует профиль автора
function formAuthorSubmitHandler (form, button, overley) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    removeEventListenersOnPopup (form, button, overley);
}
//считывает значения строк при открытии попапа
function readStringPopupAuthor () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  formValidator.enableValidation(formObject, popupAuthor);
  addEventListenersOnPopup (popupAuthor);
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
  titleInput.value = '';
  sourceInput.value = '';
}
//слушатель формы попапа добавления карточек
function formCardSubmitHandler (form, button, overley) {
  addCard ();
  removeEventListenersOnPopup (form, button, overley);
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
  const card = new Card(data, '#card-template');
  renderElement(card, cardContainer);
}
function renderElement (card, cardContainer) {
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
}
//считывает попап изображения карточки
function popupImageCard (evt) {
  if (evt.target.classList.contains('element__image')) {
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = evt.target.alt;
    popupImage.querySelector('.popup__image-description').textContent = evt.target.alt;
    addEventListenersOnPopup (popupImage);
    openPopup (popupImage);
  }
}
//вызов начального создания карточек
renderInitialCards();


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', function () {
  readStringPopupAuthor (popupAuthorOpenButton);
});
//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  addEventListenersOnPopup (popupCard);
  formValidator.enableValidation(formObject, popupCard);
  openPopup (popupCard);
});
//слушатель открытия попапа изображений
cardContainer.addEventListener('click', popupImageCard);
