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
function addCard () {
  event.preventDefault();
  const title = titleInput.value;
  const source = sourceInput.value;
  const data = {title, source};
  renderCard (data);
  closePopup (popupCard);
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
//слушатель кнопки закрытия попапа изображений
function popupImageCloseButtonClick () {
  closePopup (popupImage);
  removeEventListenersOnImagePopup ();
}
//слушатель оверлея попапа изображений
function popupImageOverleyClick () {
  closePopup (popupImage);
  removeEventListenersOnImagePopup ();
}
//слушатель Esc попапа изображений
function popupImageClickEsc () {
  closePopupEsc (popupImage);
}
//удаляет слушатели с попапа изображений
function removeEventListenersOnImagePopup () {
  popupImage.querySelector('.popup__close-button').removeEventListener('click', popupImageCloseButtonClick);
  popupImage.querySelector('.popup__overlay_for-image').removeEventListener('click', popupImageOverleyClick);
  document.removeEventListener('keydown', popupImageClickEsc);
}
//вешает слушатели на попап изображений
function addEventListenersOnImagePopup () {
  popupImage.querySelector('.popup__close-button').addEventListener('click', popupImageCloseButtonClick);
  popupImage.querySelector('.popup__overlay_for-image').addEventListener('click', popupImageOverleyClick);
  document.addEventListener('keydown', popupImageClickEsc);
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
