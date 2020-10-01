import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {formObject, initialCards as items}  from '../components/utils/constants.js';


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
//карточки
const popupImage = document.querySelector('#image-popup');
const cardContainer = document.querySelector('.elements');
//список форм
const formsList = Array.from(document.querySelectorAll('.popup__form'));


//экземпляры классов
const formValidator = new FormValidator(formObject);
const popupWithAuthorForm = new PopupWithForm(popupAuthor, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupWithAuthorForm.close();
  }
});
popupWithAuthorForm.setEventListeners ();
const popupWithCardForm = new PopupWithForm(popupCard, {
  formSubmitHandler: (data) => {
    section._renderer(data);
    popupWithCardForm.close();
  }
});
popupWithCardForm.setEventListeners ();
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners ();
const section = new Section({items,
  renderer: (data) => {
    const card = new Card(data, '#card-template', handleCardClick);
    const cardElement = card.generateCard(data);
    section.addItem(cardElement);
  }}, cardContainer);
const userInfo = new UserInfo({profileName, profileDescription});


//считывает значения строк при открытии попапа
function readStringPopupAuthor () {
  const data = userInfo.getUserInfo ();
  nameInput.value = data.name;
  descriptionInput.value = data.description;
  popupWithAuthorForm.open();
}

//функции попапа добавления карточек
//считывает поля формы создания карточки
const addCardPopup = () => {
  popupWithCardForm.open(popupCard);
}
//начальное создание карточек
const renderInitialCards = () => {
  section.renderItems(items);
}
//считывает попап изображения карточки
function handleCardClick (evt) {
  const data = {
    image: evt.target.src,
    description: evt.target.alt
  }
  popupWithImage.open(data);
}
//вызов начального создания карточек
renderInitialCards();


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', readStringPopupAuthor);
//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  addCardPopup();
});
//подключаем валидацию
  formValidator.enableValidation(formObject, formsList);
