//автор
const popupAuthor = document.querySelector('#edit-profile-popup');
const popupAuthorOpenButton = document.querySelector('.profile__edit-button');
const popupAuthorCloseButton = popupAuthor.querySelector('.popup__close-button');
const popupAuthorForm = document.querySelector('.popup__form');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector ('.profile__description');
const popupAuthorform = popupAuthor.querySelector('.popup__form');
const nameInput =  popupAuthorForm.querySelector('.popup__input_name');
const descriptionInput =  popupAuthorForm.querySelector('.popup__input_description');

//карточки
const popupCard = document.querySelector('#add-card-popup');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardSaveButton = popupCard.querySelector('.popup__save-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const titleInput =  popupCardForm.querySelector('.popup__input_title');
const sourceInput =  popupCardForm.querySelector('.popup__input_source');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

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
    }
    else if (popupCard.classList.contains('popup_opened')){
      closePopup (popupCard);
    }
    else if (popupImage.classList.contains('popup_opened')){
      closePopup(popupImage);
    }
  }
}


//функции автора
//редактирует профиль автора
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup (popupAuthor);
}
//удаляет слушателей из попапа автора
function removeEventListenersOnAuthorPopup () {
  popupAuthorForm.removeEventListener('submit',  formSubmitHandler);
  popupAuthorCloseButton.removeEventListener('click', function () {
    closePopup (popupAuthor);
  });
  popupAuthor.querySelector('.popup__overlay').removeEventListener('click', function () {
    closePopup (popupAuthor);
  });
  document.removeEventListener('keydown', closePopupEsc);
}
//добавляет слушателей в попап автора
function addEventListenersOnAuthorPopup (evt) {
  popupAuthorForm.addEventListener('submit', formSubmitHandler);
  popupAuthorCloseButton.addEventListener('click', function () {
    closePopup (popupAuthor);
    removeEventListenersOnAuthorPopup ();
  });
  popupAuthor.querySelector('.popup__overlay').addEventListener('click', function () {
    closePopup (popupAuthor);
    removeEventListenersOnAuthorPopup ();
  });
  document.addEventListener('keydown', function () {
    closePopupEsc (popupAuthor);
    removeEventListenersOnAuthorPopup ();
  });
}
//считывает значения строк при открытии попапа
function readStringPopupAuthor () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  addEventListenersOnAuthorPopup ();
  openPopup (popupAuthor);
}


//функции карточек
//лайк карточки
function likeCard (cardElement) {
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  })
}
//удаление карточки
function deleteCard (cardElement) {
  cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
    evt.target.closest(".element").remove(evt);
  })
}


//функции попапа добавления карточек
//создаёт карточку
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardText = cardElement.querySelector('.element__text');
  cardImage.alt = data.title;
  cardImage.src = data.source;
  cardText.textContent = data.title;
  likeCard (cardElement);
  deleteCard (cardElement);
  titleInput.value = '';
  sourceInput.value = '';
  return cardElement;
}
//добавляет карточку в разметку
function renderCard (cardElement) {
  return cardContainer.prepend (createCard(cardElement));
}
//считывает поля формы создания карточки
function addCard (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const source = sourceInput.value;
  const data = {title, source};
  renderCard (data);
  closePopup (popupCard);
}
//удаляет слушателей из попапа добавления карточек
function removeEventListenersOnCardPopup () {
  popupCardForm.removeEventListener('submit', addCard);
  popupCardCloseButton.removeEventListener('click',function () {
    closePopup (popupCard);
  });
  popupCard.querySelector('.popup__overlay').removeEventListener('click', function () {
    closePopup (popupCard);
  });
  document.removeEventListener('keydown', function () {
    closePopupEsc (popupCard);
  });
  popupCardSaveButton.classList.add('popup__save-button_disabled');
  popupCardSaveButton.disabled = true;
}
//добавляет слушателей в попап добавления карточек
function addEventListenersOnCardPopup () {
  popupCardForm.addEventListener('submit', addCard);
  popupCardCloseButton.addEventListener('click',function () {
    closePopup (popupCard);
    removeEventListenersOnCardPopup ();
  });
  popupCard.querySelector('.popup__overlay').addEventListener('click', function () {
    closePopup (popupCard);
    removeEventListenersOnCardPopup ();
  });
  document.addEventListener('keydown', function () {
    closePopupEsc (popupCard);
    removeEventListenersOnCardPopup ();
  });
}
//
function initialCardData (item) {
  const title = item.title;
  const source = item.source;
  const data = {title, source};
  return data;
}
//начальный вывод карточек
initialCards.forEach (function (item) {
  initialCardData (item);
  renderCard (item);
})


//функции попапа пикч
//считывает данные изображения для его вывода в попапе изображений
function popupImageCard (data) {
  const popupPicture = popupImage.querySelector('.popup__image');
  const popupImageDescription = popupImage.querySelector('.popup__image-description');
  popupPicture.src = data.source;
  popupPicture.alt = data.title;
  popupImageDescription.textContent = data.title;
  addEventListenersOnImagePopup ();
}
//удаляет слушатели с попапа изображений
function removeEventListenersOnImagePopup () {
  popupImage.querySelector('.popup__close-button').removeEventListener('click', function () {
    closePopup (popupImage);
  });
  popupImage.querySelector('.popup__overlay_for-image').removeEventListener('click', function () {
    closePopup (popupImage);
  });
  document.removeEventListener('keydown', function () {
    closePopupEsc (popupImage);
  });
}
//вешает слушатели на попап изображений
function addEventListenersOnImagePopup () {
  popupImage.querySelector('.popup__close-button').addEventListener('click', function () {
    closePopup (popupImage);
    removeEventListenersOnImagePopup ();
  });
  popupImage.querySelector('.popup__overlay_for-image').addEventListener('click', function () {
    closePopup (popupImage);
    removeEventListenersOnImagePopup ();
  });
  document.addEventListener('keydown', function () {
    closePopupEsc (popupImage);
    removeEventListenersOnImagePopup ();
  });
}


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', function () {
  readStringPopupAuthor (popupAuthorOpenButton);
});

//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  addEventListenersOnCardPopup (popupCardOpenButton);
  openPopup (popupCard);
});

//слушатель открытия попапа изображений
//cardContainer.addEventListener('click', popupCardEventListener);
cardContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__image')) {
    const title = evt.target.alt;
    const source = evt.target.src;
    const data = {title, source};
    popupImageCard (data);
    openPopup (popupImage);
  }
});
