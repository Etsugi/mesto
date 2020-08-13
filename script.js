let popup = document.querySelector('.popup');

// открытие, закрытие попапа
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);

function popupOpenClose () {
  popup.classList.toggle('popup_opened');
}

// начало работы с формой ввода попапа
let popupForm = document.querySelector('.popup__form');

// считываем начальное значение строк формы из разметки
let profileName = document.querySelector ('.profile__name');
let profileDescription = document.querySelector ('.profile__description');

// Находим поля формы в DOM
let nameInput =  popupForm.querySelector('.popup__field-name');
let jobInput =  popupForm.querySelector('.popup__field-description');

// задаём значение строк для первого открытия попапа
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    ///считываем значение строки формы
    nameInput =  popupForm.querySelector('.popup__field-name');
    jobInput =  popupForm.querySelector('.popup__field-description');

    // присваиваем новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    //закрываем попап
    popup.classList.toggle('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
let popupSaveButton = document.querySelector('.popup__save-button');
popupSaveButton.addEventListener('click', formSubmitHandler);

//честно говоря не понял зачем здесь submit
//popupSaveButton.addEventListener('submit', formSubmitHandler);
