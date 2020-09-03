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


//автор
const popupAuthor = document.querySelector('#edit-author');
const popupAuthorOpenButton = document.querySelector('.profile__edit-button');
const popupAuthorCloseButton = popupAuthor.querySelector('.popup__close-button');
const popupAuthorForm = document.querySelector('.popup__form');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector ('.profile__description');

//
const popupAuthorform = popupAuthor.querySelector('.popup__form');
const nameInput =  popupAuthorForm.querySelector('.popup__input_name');
const descriptionInput =  popupAuthorForm.querySelector('.popup__input_description');
//const formError = popupAuthorform.querySelector(`#${nameInput.id}-error`);
//

//карточки
const popupCard = document.querySelector('#add-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const titleInput =  popupCardForm.querySelector('.popup__input_title');
const sourceInput =  popupCardForm.querySelector('.popup__input_source');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

//пикчи
const popupImage = document.querySelector('#image-popup');


//функции попапа автора
//функция открытия/закрытия попапа автора
function popupAuthorOpenClose () {
  if (!popupAuthor.classList.contains('popup_opened')) {
    popupAuthorListenersAdd ();
    popupAuthor.classList.toggle('popup_opened');
  }
  else {
    popupAuthor.classList.toggle('popup_opened');
    popupAuthorListenersDelete ();
  }
}
//вешает слушатели на попап редактирования профиля
function popupAuthorListenersAdd () {
  popupAuthorForm.addEventListener('submit', formSubmitHandler);
  popupAuthorCloseButton.addEventListener('click', popupAuthorOpenClose);
  popupAuthor.querySelector('.popup__overlay').addEventListener('click', popupAuthorOpenClose);
  document.addEventListener('keydown', popupEscClose);
}
//удаляет слушатели попапа редактирования профиля
function popupAuthorListenersDelete () {
  popupAuthorForm.removeEventListener('submit', formSubmitHandler);
  popupAuthorCloseButton.removeEventListener('click', popupAuthorOpenClose);
  popupAuthor.querySelector('.popup__overlay').removeEventListener('click', popupAuthorOpenClose);
  document.removeEventListener('keydown', popupEscClose);
}

function popupAuthorReadString () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupAuthorOpenClose ();
}
//редактирует профиль
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popupAuthorOpenClose ();
}


//функции карточек
//открывает/закрывает попап добавления карточек
function popupCardOpenClose () {
  if (!popupCard.classList.contains('popup_opened')) {
    popupCardListenersAdd ();
    popupCard.classList.toggle('popup_opened');
  }
  else {
    popupCard.classList.toggle('popup_opened');
    popupCardListenersDelete ();
  }
}
//вешает слушатели на попап добавления карточек
function popupCardListenersAdd () {
  popupCardForm.addEventListener('submit', addCard);
  popupCardCloseButton.addEventListener('click', popupCardOpenClose);
  popupCard.querySelector('.popup__overlay').addEventListener('click', popupCardOpenClose);
  document.addEventListener('keydown', popupEscClose);
}
//удаляет слушатели попапа добавления карточки
function popupCardListenersDelete () {
  popupCardForm.removeEventListener('submit', addCard);
  popupCardCloseButton.removeEventListener('click', popupCardOpenClose);
  popupCard.querySelector('.popup__overlay').removeEventListener('click', popupCardOpenClose);
  document.removeEventListener('keydown', popupEscClose);
}
//создаёт
function createCard(cardTitle, cardSource) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').alt = cardTitle;
  cardElement.querySelector('.element__text').textContent = cardTitle;
  cardElement.querySelector('.element__image').src = cardSource;
  cardContainer.prepend (cardElement);
  titleInput.value = '';
  sourceInput.value = '';
}
//добавляет карточку
function addCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  cardTitle = titleInput.value;
  cardSource = sourceInput.value;
  createCard(cardTitle, cardSource);
}
//лайк карточки
function cardLike (evt) {
  evt.target.classList.toggle('element__like-button_active');
}
//удаление карточки
function cardDelete (evt) {
  evt.target.parentElement.remove(evt);
}
//вешает на карточку слушатели
function addCardListeners (evt) {
  if (evt.target.classList.contains('element__like-button')) {
    cardLike(evt);
  }
  if (evt.target.classList.contains('element__trash-button')) {
    cardDelete(evt);
  }
  if (evt.target.classList.contains('element__image')) {
    popupImageCard (evt);
    popupImageOpenClose(evt);
  }
}

//начальный вывод карточек
initialCards.forEach (function (item) {
  cardTitle = item.title;
  cardSource = item.source;
  createCard(cardTitle, cardSource);
})


//функции попапа пикч
function popupImageCard (evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__image-description').textContent = evt.target.alt;
  popupImageListeners (evt);
}
//вешает слушатели на попап изображений
function popupImageListeners () {
  popupImage.querySelector('.popup__close-button').addEventListener('click', popupImageOpenClose);
  popupImage.querySelector('.popup__overlay_for-image').addEventListener('click', popupImageOpenClose);
  document.addEventListener('keydown', popupEscClose);
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
//закрывает попап при клике Esc
function popupEscClose (evt) {
  if (evt.key === 'Escape') {
    if (popupImage.classList.contains('popup_opened')){
      popupImageOpenClose (evt);
    }
    else if (popupAuthor.classList.contains('popup_opened')){
      popupAuthorOpenClose (evt);
    }
    else if (popupCard.classList.contains('popup_opened')){
      popupCardOpenClose (evt);
    }
  }
}
//удаляет слушатели с попапа изображений
function popupImageListenersDelete () {
  popupImage.querySelector('.popup__close-button').removeEventListener('click', popupImageOpenClose);
  popupImage.querySelector('.popup__overlay_for-image').removeEventListener('click', popupImageOpenClose);
  document.removeEventListener('keydown', popupEscClose);
}


//слушатель открытия попапа автора
popupAuthorOpenButton.addEventListener('click', popupAuthorReadString);

//слушатель открытия попапа добавления карточек
popupCardOpenButton.addEventListener('click', popupCardOpenClose);

//слушатель открытия попапа изображений
cardContainer.addEventListener('click', addCardListeners);

