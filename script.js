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
function openPopup (evt) {
  addEventListeners (evt);
  document.querySelector(`#${evt.id}-popup`).classList.add('popup_opened');
}
//добавляет в попапы слушателей
function addEventListeners (evt) {
  if (evt.id === 'edit-profile') {
    popupAuthorForm.addEventListener('submit', formSubmitHandler);
    popupAuthorCloseButton.addEventListener('click', function () {
      closePopup (evt);
    });
    popupAuthor.querySelector('.popup__overlay').addEventListener('click', function () {
      closePopup (evt);
    });
    document.addEventListener('keydown', closePopupEsc);
  }
  else if (evt.id === 'add-card') {
    popupCardForm.addEventListener('submit', addCard);
    popupCardCloseButton.addEventListener('click',function () {
      closePopup (evt);
    });
    popupCard.querySelector('.popup__overlay').addEventListener('click', function () {
      closePopup (evt);
    });
    document.addEventListener('keydown', closePopupEsc);
  }
};
//закрывает попапы
function closePopup (evt) {
  document.querySelector(`#${evt.id}-popup`).classList.remove('popup_opened');
  removeEventListeners (evt);
}
//удаляет из попапов слушаталей
function removeEventListeners (evt) {
  if (evt.id === 'edit-profile') {
    popupAuthorForm.removeEventListener('submit',  formSubmitHandler);
    popupAuthorCloseButton.removeEventListener('click', function () {
      closePopup (evt);
    });
    popupAuthor.querySelector('.popup__overlay').removeEventListener('click', function () {
      closePopup (evt);
    });
    document.removeEventListener('keydown', closePopupEsc);
  }
  else if (evt.id === 'add-card') {
    popupCardForm.removeEventListener('submit', addCard);
    popupCardCloseButton.removeEventListener('click',function () {
      closePopup (evt);
    });
    popupCard.querySelector('.popup__overlay').removeEventListener('click', function () {
      closePopup (evt);
    });
    document.removeEventListener('keydown', function () {
      closePopupEsc (evt);
    });
    popupCardSaveButton.classList.add('popup__save-button_disabled');
    popupCardSaveButton.disabled = true;
  }
}
//закрывает попапы при клике Esc
function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    if (popupImage.classList.contains('popup_opened')){
      popupImageOpenClose(evt);
    }
    else if (popupAuthor.classList.contains('popup_opened')){
      closePopup (popupAuthorOpenButton);
    }
    else if (popupCard.classList.contains('popup_opened')){
      closePopup (popupCardOpenButton);
    }
  }
}


//функции автора
//считывает значения строк при первом открытии попапа
function popupAuthorReadString (evt) {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup (evt);
}
//редактирует профиль
function formSubmitHandler (evt, popupAuthorForm) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup (popupAuthorOpenButton);
}


//функции карточек
//добавляет карточку в разметку
function renderCard (cardElement) {
  cardContainer.prepend (cardElement);
}
//создаёт карточку
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardText = cardElement.querySelector('.element__text');
  cardImage.alt = data.title;
  cardImage.src = data.source;
  cardText.textContent = data.title;
  addEventListenersOnCard (cardElement, data);
  titleInput.value = '';
  sourceInput.value = '';
  //const cardLikeButton = cardElement.querySelector('.element__like-button').addEventListener('click', likeCard);
  //const cardTrashButton = cardElement.querySelector('.element__trash-button').addEventListener('click', deleteCard);
  //cardImage.addEventListener('click', popupImageCard);

  renderCard (cardElement);

  //console.log(data);
}

function addEventListenersOnCard (cardElement, data) {
  //console.log(data);
  //const cardLikeButton = cardElement.querySelector('.element__like-button').addEventListener('click', likeCard);
  //const cardTrashButton = cardElement.querySelector('.element__trash-button').addEventListener('click', deleteCard);
  //cardImage.addEventListener('click', popupImageCard);
}

//считывает поля формы создания карточки
function addCard (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const source = sourceInput.value;
  const data = {title, source};
  createCard(data);
  closePopup (popupCardOpenButton);
}
//лайк карточки
function likeCard (evt) {
  evt.target.classList.toggle('element__like-button_active');
}
//удаление карточки
function deleteCard (evt) {
  evt.target.closest(".element").remove(evt);
}
//вешает на карточку слушатели
function addCardListeners (evt) {
  if (evt.target.classList.contains('element__like-button')) {
    likeCard(evt);
  }
  if (evt.target.classList.contains('element__trash-button')) {
    deleteCard(evt);
  }
  if (evt.target.classList.contains('element__image')) {
    title = evt.target.alt;
    source = evt.target.src;
    data = {title, source};
    popupImageCard (data);
    popupImageOpenClose(data);
  }
}
//начальный вывод карточек
initialCards.forEach (function (item) {
  const title = item.title;
  const source = item.source;
  const data = {title, source};
  createCard(data);
})


//функции попапа пикч
//
function popupImageCard (data) {
  //console.log(data.target.src);
  const popupPicture = popupImage.querySelector('.popup__image');
  const popupImageDescription = popupImage.querySelector('.popup__image-description');
  popupPicture.src = data.source;
  popupPicture.alt = data.title;
  popupImageDescription.textContent = data.title;;
  popupImageListeners (data);
}
//вешает слушатели на попап изображений
function popupImageListeners () {
  popupImage.querySelector('.popup__close-button').addEventListener('click', popupImageOpenClose);
  popupImage.querySelector('.popup__overlay_for-image').addEventListener('click', popupImageOpenClose);
  document.addEventListener('keydown', closePopupEsc);
}
//удаляет слушатели с попапа изображений
function popupImageListenersDelete () {
  popupImage.querySelector('.popup__close-button').removeEventListener('click', popupImageOpenClose);
  popupImage.querySelector('.popup__overlay_for-image').removeEventListener('click', popupImageOpenClose);
  document.removeEventListener('keydown', closePopupEsc);
}
//открывает/закрывает попап изображений
function popupImageOpenClose () {
  if (!popupImage.classList.contains('popup_opened')) {
    popupImage.classList.toggle('popup_opened');
  }
  else {
    popupImage.classList.toggle('popup_opened');
    popupImageListenersDelete ();
  }
}


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', function () {
  popupAuthorReadString (popupAuthorOpenButton);
});

//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', function () {
  openPopup (popupCardOpenButton);
});

//слушатель открытия попапа изображений
cardContainer.addEventListener('click', addCardListeners);
