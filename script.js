const placesList = document.querySelector('.places-list');

const newCardForm = document.forms.new;
const editUserForm = document.forms.user;
const buttonOpenPopup = document.querySelector('.user-info__button');
const buttonPopupEditUser = document.querySelector('.user-info__edit-button');
let buttonClosePopup = document.querySelectorAll('.popup__close');
const buttonAddCard = document.querySelector('.popup__button');
const newCardPopup = document.querySelector('#add-new-card');
const popupEditProfile = document.querySelector('#edit-user-info');
const popupBigImage = document.querySelector('#show-image');
const bigImage = document.querySelector('.popup__big-image');
const submitEditUser = popupEditProfile.querySelector('.popup__button');
const submitFormButton = newCardPopup.querySelector('.popup__button');

function editFormSubmit(event) {
    event.preventDefault();
    document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
    document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value;
    popupEditProfile.classList.remove('popup_is-opened');
  }

editUserForm.addEventListener('submit', editFormSubmit);
buttonPopupEditUser.addEventListener('click', openForm);
buttonClosePopup.forEach(elem => elem.addEventListener('click', closeForm));
editUserForm.addEventListener('input', validateEditProfile);