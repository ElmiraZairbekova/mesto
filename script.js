// Находим в DOM попап и его элементы, присваиваем константам

let popup = document.querySelector('.popup');
let btnEditProfile = document.querySelector('.profile__edit-button');
let btnClosePopup = document.querySelector('.popup__close');
let profileEditForm = document.forms['profileEdit'];
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.popup__input-name');
let profileDescriptionInput = document.querySelector('.popup__input-description');

// добавляем модификатор, чтобы попап открывался 
// Подставляем в поля текущие значения со страницы, убирая пробелы 

function popupOpen() {
    console.log("open");
    popup.classList.add('popup_active');
    profileNameInput.value = profileName.textContent.trim();
    profileDescriptionInput.value = profileDescription.textContent.trim();
}

// чтобы закрыть попап, удаляем модификатор 

function popupClose() {
    popup.classList.remove('popup_active');
}

// добавляем обработчик, не забыв про отключение дефолта
// по сабмиту возвращаем значения, введенные в форме 

function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log(profileNameInput.value);
    profileName.textContent = profileNameInput.value;
    console.log(profileDescriptionInput.value);
    profileDescription.textContent = profileDescriptionInput.value;
    popupClose();
}

// добавляем вызов функций через подписку на click и submit  

btnEditProfile.addEventListener('click', popupOpen);
btnClosePopup.addEventListener('click', popupClose);
profileEditForm.addEventListener('submit', formSubmitHandler);