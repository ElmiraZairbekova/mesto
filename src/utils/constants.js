export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonClosePopup = document.querySelector(".popup__close_edit");

export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__description';

export const profileNameInput = document.querySelector(
  ".popup__input_type_name"
);
export const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
export const popupProfileSelector = document.querySelector(".popup__form_edit");

export const cardTitleInput = document.querySelector(".popup__input_type_title");
export const cardLinkInput = document.querySelector(".popup__input_type_link");
export const buttonCloseCard = document.querySelector(".popup__close_card");
export const cardEditForm = document.querySelector(".popup__form_add");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const buttonDisabled = document.getElementById("button-disabled");

export const cardItemsElement = document.querySelector(".elements");


export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_visible'
};

export const formValidation = {};


export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

