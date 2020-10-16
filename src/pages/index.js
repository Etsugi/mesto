import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {formObject}  from '../components/utils/constants.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';


//профиль
const popupProfile = document.querySelector('#edit-profile-popup');
const popupProfileAvatar = document.querySelector('#edit-avatar-profile-popup');
const popupProfileAboutOpenButton = document.querySelector('.profile__edit-button');
const popupProfileAvatarOpenButton = document.querySelector('.profile__avatar-update-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = document.querySelector ('.profile__name');
const profileAbout = document.querySelector ('.profile__description');
const profileAvatar = document.querySelector ('.profile__avatar-image');
const nameInput =  popupProfileForm.querySelector('.popup__input_name');
const aboutInput =  popupProfileForm.querySelector('.popup__input_description');
//форма добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const popupCardOpenButton = document.querySelector('.profile__add-button');
//карточки
const popupImage = document.querySelector('#image-popup');
const cardContainer = document.querySelector('.elements');
const popupImageDelete = document.querySelector('#image-delete-popup');
//список форм
const formsList = Array.from(document.querySelectorAll('.popup__form'));
//айди пользователя
let myId = '';
//текст кнопки
let buttonText = '';


//экземпляры классов
const formValidator = new FormValidator({formObject});

const popupUpdateProfileAvatar = new PopupWithForm(popupProfileAvatar, {
  formSubmitHandler: (data) => {
    visibleLoading(popupProfileAvatar);
    api.updateUserAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => {
      hiddenLoading(popupProfileAvatar);
      popupUpdateProfileAvatar.close();
    })
  }
});
popupUpdateProfileAvatar.setEventListeners();

const popupWithProfileForm = new PopupWithForm(popupProfile, {
  formSubmitHandler: (data) => {
    visibleLoading(popupProfile);
    api.updateUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hiddenLoading(popupProfile);
    })
  }
});
popupWithProfileForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(popupCard, {
  formSubmitHandler: (data) => {
    visibleLoading(popupCard);
    api.addCard(data)
    .then((data) => {
      data._ownerId = myId;
      section._renderer(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hiddenLoading(popupCard);
      popupWithCardForm.close();
    })

  }
});
popupWithCardForm.setEventListeners();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const section = new Section({
  renderer: (data) => {
    const card = new Card(data, myId, '#card-template', {
      handleCardClick: (evt) => {
        const data = {
          image: evt.target.src,
          description: evt.target.alt,
        }
        popupWithImage.open(data);
      },
      likeCardClick: () => {
        api.likeCard(data)
        .then((data) => {
          card._checkLikeCounter(data);
        })
        .catch((err) => {
          console.log(err);
        })
      },
      disLikeCardClick: () => {
        api.disLikeCard(data)
        .then((data) => {
          card._checkLikeCounter(data);
        })
        .catch((err) => {
          console.log(err);
        })
      },
      deleteCardClick: () => {
        const popupWithSubmit = new PopupWithSubmit(popupImageDelete, {
          confirmSubmitHandler: (data) => {
            visibleLoading(popupImageDelete);
            api.deleteCard(data)
            .then((data) => {
              card._deleteCard(data)
            })
            .catch((err) => {
              alert(err);
            })
            .finally(() => {
              hiddenLoading(popupImageDelete);
              popupWithSubmit.close();
            })
          }
        });
        popupWithSubmit.setEventListeners();
        popupWithSubmit.open(data);

      }});
    const cardElement = card.generateCard(data);
    section.addItem(cardElement);
    card._checkLike(data)
  }}, cardContainer);

  popupWithImage.setEventListeners();

const userInfo = new UserInfo({profileName, profileAbout, profileAvatar});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'a3935a49-8230-429f-9fab-7d2d6f416793',
    'Content-Type': 'application/json'
  }
});

//загрузка
function visibleLoading(popupSelector) {
  buttonText = popupSelector.querySelector('.popup__save-button').textContent;
  popupSelector.querySelector('.popup__save-button').textContent = 'Загрузка...';
};
function hiddenLoading(popupSelector) {
  popupSelector.querySelector('.popup__save-button').textContent = buttonText;
  buttonText = '';
}

//считывает значения строк при открытии попапа
function readStringPopupProfile() {
  const data = userInfo.getUserInfo ();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  popupWithProfileForm.open();
}
//открывает попап смены аватара пользователя
const openPopupProfileAvatar = () => {
  popupUpdateProfileAvatar.open(popupProfileAvatar);
}
//открывает попап создания карточки
const openAddCardPopup = () => {
  popupWithCardForm.open(popupCard);
}


//предзагрузка данных с сервера
const initialData = api.getAllData();
initialData.then((data => {
  const [userData, cards] = data;
  myId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  section.renderItems(cards);
  })
)
.catch((err) => {
  alert(err);
});


//слушатель открытия попапа автора
popupProfileAboutOpenButton.addEventListener('click', readStringPopupProfile);
//слушатель открытия попапа аватара автора
popupProfileAvatarOpenButton.addEventListener('click', function () {
  openPopupProfileAvatar();
});
//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  openAddCardPopup();
});
//подключаем валидацию
  formValidator.enableValidation(formObject, formsList);
