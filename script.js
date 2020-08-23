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
const nameInput =  popupAuthorForm.querySelector('.popup__input_name');
const jobInput =  popupAuthorForm.querySelector('.popup__input_description');

//карточки
const popupCard = document.querySelector('#add-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const cardTitle = document.querySelector ('.element__text');
const cardSource = document.querySelector ('.element__image');
const titleInput =  popupCardForm.querySelector('.popup__input_title');
const sourceInput =  popupCardForm.querySelector('.popup__input_source');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

//картинки
const popupImage = document.querySelector('#image-popup');

//функции попапа автора
function popupAuthorOpenClose () {
  popupAuthor.classList.toggle('popup_opened');
}

function popupAuthorReadString () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupAuthorOpenClose ();
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupAuthorOpenClose ();
}

//функции карточек
function popupCardOpenClose () {
  popupCard.classList.toggle('popup_opened');
}

function addElement(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').alt = titleInput.value;
  cardElement.querySelector('.element__text').textContent = titleInput.value;
  cardElement.querySelector('.element__image').src = sourceInput.value;

  cardLike(cardElement);
  cardDelete (cardElement);

  cardContainer.prepend (cardElement);
  titleInput.value = '';
  sourceInput.value = '';
  popupCardOpenClose ();
}

function cardLike (cardElement) {
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  })
}

function cardDelete (cardElement) {
  cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove(evt);
  })
}

//картинки
function popupImageOpenClose (cardElement) {
  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = evt.target.alt;
    popupImage.querySelector('.popup__image-description').textContent = evt.target.alt;
    popupImage.querySelector('.popup__close-button').addEventListener('click', function (evt) {
      popupImage.classList.remove('popup_opened');
      console.log (evt);
    })
  })
}

//начальный вывод карточек
initialCards.forEach (function (item) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').alt = item.title;
  cardElement.querySelector('.element__text').textContent = item.title;
  cardElement.querySelector('.element__image').src = item.source;

  cardLike(cardElement);
  cardDelete (cardElement);
  popupImageOpenClose (cardElement);

  cardContainer.append (cardElement);
})


//реакции на попап автора
popupAuthorForm.addEventListener('submit', formSubmitHandler);
popupAuthorOpenButton.addEventListener('click', popupAuthorReadString);
popupAuthorCloseButton.addEventListener('click', popupAuthorOpenClose);

//реакции на попап карточек
popupCardForm.addEventListener('submit', addElement);
popupCardOpenButton.addEventListener('click', popupCardOpenClose);
popupCardCloseButton.addEventListener('click', popupCardOpenClose);

