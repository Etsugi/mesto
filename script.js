let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');//кнопка открытия попапа
let popupCloseButton = document.querySelector('.popup__close-button');//кнопка закрытия попапа
let popupSaveButton = document.querySelector('.popup__save-button');//кнопка сохранения попапа
let popupForm = document.querySelector('.popup__form');//форма
let profileName = document.querySelector ('.profile__name');//значение имени
let profileDescription = document.querySelector ('.profile__description');//значение описания
let nameInput =  popupForm.querySelector('.popup__input_name');//поле имени формы
let jobInput =  popupForm.querySelector('.popup__input_description');//поле описания формы
let popupFirstOpenCount = 0;

//функция открытия/закрытия попапа
function popupOpenClose () {
  popup.classList.toggle('popup_opened');
}

//функция считывания значений строк при первом открытии попапа
function popupFirstOpen () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupOpenClose ();
}

//Функция для вычисления первого открытия попапа
function popupOpenCheckCount () {
  if (popupFirstOpenCount < 1) {
    popupFirstOpen ();
    popupFirstOpenCount++;
  }
  else {
    popupOpenClose ();
  }
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

//popupSaveButton.addEventListener('click', formSubmitHandler);
popupForm.addEventListener('submit', formSubmitHandler);

//честно говоря не понял зачем здесь submit
//popupSaveButton.addEventListener('submit', formSubmitHandler);


popupOpenButton.addEventListener('click', popupOpenCheckCount);//вызов функции открытия/закрытия попапа
popupCloseButton.addEventListener('click', popupOpenClose);//вызов функции открытия/закрытия попапа
