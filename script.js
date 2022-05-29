let popup = document.querySelector('.popup');
let btnEditProfile = document.querySelector('.profile__edit-button');
let btnClosePopup = document.querySelector('.popup__close');
let profileEditForm = document.querySelector('.popup__submit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.popup__input-name');
let profileDescriptionInput = document.querySelector('.popup__input-description');

function popupOpen() {
    console.log("open");
    popup.classList.add('popup_active');
    profileNameInput.value = profileName.textContent.trim();
    profileDescriptionInput.value = profileDescription.textContent.trim();
}

function popupClose() {
    popup.classList.remove('popup_active');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    popupClose();
}

btnEditProfile.addEventListener('click', popupOpen);
btnClosePopup.addEventListener('click', popupClose);
profileEditForm.addEventListener('click', formSubmitHandler);