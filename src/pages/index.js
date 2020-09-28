import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards as items}  from '../components/InitialCards.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


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


//считывает значения строк при открытии попапа
function readStringPopupAuthor () {
  const userInfo = new UserInfo({profileName, profileDescription});
  const popupWithForm = new PopupWithForm(popupAuthor, function () {
    data.name = nameInput.value;
    data.description = descriptionInput.value;
    userInfo.setUserInfo (data);
  });
  const data = userInfo.getUserInfo ();
  nameInput.value = data.name;
  descriptionInput.value = data.description;
  formValidator.enableValidation(formObject, popupAuthor);
  popupWithForm.open(popupAuthor);
}


//функции попапа добавления карточек
//считывает поля формы создания карточки
const addCardPopup = () => {
  event.preventDefault();
  const popupWithForm = new PopupWithForm(popupCard, function () {
    const title = titleInput.value;
    const source = sourceInput.value;
    const data = {title, source};
    renderer (data);
  });
  formValidator.enableValidation(formObject, popupCard);
  popupWithForm.open(popupCard);
  titleInput.value = '';
  sourceInput.value = '';
}
//начальное создание карточек
const renderInitialCards = () => {
  const section = new Section({items, renderer}, cardContainer);
  section.renderItems(items);
}
//создание карточек
const renderer = (data) => {
  const section = new Section({items, renderer}, cardContainer);
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}
//считывает попап изображения карточки
function handleCardClick (evt) {
  const popupImage = document.querySelector('#image-popup');
  const popupWithImage = new PopupWithImage(evt, popupImage);
  popupWithImage.open(evt, popupImage);
}
//вызов начального создания карточек
renderInitialCards();


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', readStringPopupAuthor);

//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  addCardPopup();
  formValidator.enableValidation(formObject, popupCard);
});
