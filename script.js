let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');//кнопка открытия попапа
let popupCloseButton = document.querySelector('.popup__close-button');//кнопка закрытия попапа
let popupForm = document.querySelector('.popup__form');//форма
let profileName = document.querySelector ('.profile__name');//значение имени
let profileDescription = document.querySelector ('.profile__description');//значение описания
let nameInput =  popupForm.querySelector('.popup__input_name');//поле имени формы
let jobInput =  popupForm.querySelector('.popup__input_description');//поле описания формы

//функция открытия/закрытия попапа
function popupOpenClose () {
  popup.classList.toggle('popup_opened');
}

//функция считывания значений строк при открытии попапа
function popupReadString () {
  nameInput.value = profileName.textContent;//считываем данные из строки
  jobInput.value = profileDescription.textContent;//считываем данные из строки
  popupOpenClose ();//закрываем попап
}

//функция редактирования строк формы
function formSubmitHandler (evt) {

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    profileName.textContent = nameInput.value;//присваиваем новые значения с помощью textContent
    profileDescription.textContent = jobInput.value;//присваиваем новые значения с помощью textContent

    popupOpenClose ();//закрываем попап
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupReadString);//вызов функции открытия/закрытия попапа
popupCloseButton.addEventListener('click', popupOpenClose);//вызов функции открытия/закрытия попапа
