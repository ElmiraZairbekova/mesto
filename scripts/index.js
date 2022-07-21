import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const popupContainerEdit = document.querySelector(".popup_type_edit"); //по нему ищем детей
const profileContainer = document.querySelector(".profile__container"); //по нему ищем детей
const popupProfile = document.querySelector(".popup_type_edit"); //по нему ищем детей
export const popupImage = document.querySelector(".popup_type_view"); //по нему ищем детей
const popupCard = document.querySelector(".popup_type_add"); //по нему ищем детей

const buttonEditProfile = profileContainer.querySelector(
  ".profile__edit-button"
);
const buttonClosePopup = popupContainerEdit.querySelector(".popup__close_edit");
const profileName = profileContainer.querySelector(".profile__name");
const profileDescription = profileContainer.querySelector(
  ".profile__description"
);
const profileNameInput = popupContainerEdit.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = popupContainerEdit.querySelector(
  ".popup__input_type_description"
);
const profileEditForm = popupContainerEdit.querySelector(".popup__form_edit");

const cardTitleInput = popupCard.querySelector(".popup__input_type_title");
const cardLinkInput = popupCard.querySelector(".popup__input_type_link");
const buttonCloseCard = popupCard.querySelector(".popup__close_card");
const cardEditForm = popupCard.querySelector(".popup__form_add");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonDisabled = document.getElementById("button-disabled");

export const zoomPopupCardImage = popupImage.querySelector(".popup__image");
export const zoomPopupCardTitle = popupImage.querySelector(".popup__description");
const buttonCloseImage = popupImage.querySelector(".popup__close_image");

const cardItemsElement = document.querySelector(".elements");

const initialCards = [
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

const formElementList = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorTextClass: "popup__input-error",
};

export function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_active");
    closePopup(popupActive);
  }
}

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

function openPopupProfile() {
  profileNameInput.value = profileName.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(popupProfile);
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditForm.reset();
  closePopup(popupProfile);
}

function setDisabledButton (submitButton) {
submitButton.setAttribute("disabled", true);
}

function handleAddFormCard(evt) {
  evt.preventDefault();
  const card = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  addElement(card);
  closePopup(popupCard);
  cardEditForm.reset();
  setDisabledButton(buttonDisabled);
}


function addElement(cardElement) {
  const elementCard = generateCard(cardElement);
  cardItemsElement.prepend(elementCard);
}

initialCards.forEach(addElement);

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonClosePopup.addEventListener("click", () => closePopup(popupProfile));
buttonCloseImage.addEventListener("click", () => closePopup(popupImage));
buttonCloseCard.addEventListener("click", () => closePopup(popupCard));
buttonAddCard.addEventListener("click", () => openPopup(popupCard));
popupProfile.addEventListener("submit", formSubmitProfile);
popupCard.addEventListener("submit", handleAddFormCard);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_visible'
};

const profileEditValidator = new FormValidator(config, profileEditForm);
profileEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, popupCard);
formAddValidator.enableValidation();

function generateCard (cardElement) {
  const card = new Card(cardElement, '#templateElement');
  return card.createNewCard(); //ok
};

