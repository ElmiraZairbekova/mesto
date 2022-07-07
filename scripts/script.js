const popupContainerEdit = document.querySelector(".popup_type_edit"); //по нему ищем детей
const profileContainer = document.querySelector(".profile__container"); //по нему ищем детей
const popupProfile = document.querySelector(".popup_type_edit"); //по нему ищем детей
const popupImage = document.querySelector(".popup_type_view"); //по нему ищем детей
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
const templateElement = document.querySelector("#templateElement").content;
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonDelete = document.querySelector(".element__button-trash");
const buttonDisabled = document.getElementById("button-disabled");

const zoomPopupCardImage = popupImage.querySelector(".popup__image");
const zoomPopupCardTitle = popupImage.querySelector(".popup__description");
const buttonCloseImage = popupImage.querySelector(".popup__close_image");

const cardItemsElement = document.querySelector(".elements");
const getCardElementByEvent = (evt) => evt.currentTarget.closest(".element");

const formElementList = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorTextClass: "popup__input-error",
};

function openPopup(popup) {
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

function handleAddFormCard(evt) {
  evt.preventDefault();
  const card = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  addElement(card);
  closePopup(popupCard);
  cardEditForm.reset();
  buttonDisabled.setAttribute("disabled", true);
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("element__button-like_active");
}

function createCard({ name, link, alt }) {
  const cardElement = templateElement.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  cardImage.addEventListener("click", (evt) => {
    openPopupImage(evt);
  });

  cardImage.src = link;
  cardImage.alt = alt;
  cardElement.querySelector(".element__title").textContent = name;

  cardElement
    .querySelector(".element__button-like")
    .addEventListener("click", handleLikeClick);

  cardElement
    .querySelector(".element__button-trash")
    .addEventListener("click", (evt) => {
      cardElement.remove(evt);
    });
  return cardElement;
}

function addElement(cardElement) {
  const elementCard = createCard(cardElement);
  cardItemsElement.prepend(elementCard);
}

initialCards.forEach(addElement);

function openPopupImage(evt) {
  const imageElement = getCardElementByEvent(evt);
  zoomPopupCardImage.src = imageElement.querySelector(".element__image").src;
  zoomPopupCardTitle.textContent =
    imageElement.querySelector(".element__title").textContent;
  zoomPopupCardImage.alt = imageElement.querySelector(".element__image").alt;
  openPopup(popupImage);
}

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonClosePopup.addEventListener("click", () => closePopup(popupProfile));
buttonCloseImage.addEventListener("click", () => closePopup(popupImage));
buttonCloseCard.addEventListener("click", () => closePopup(popupCard));
buttonAddCard.addEventListener("click", () => openPopup(popupCard));
popupProfile.addEventListener("submit", formSubmitProfile);
popupCard.addEventListener("submit", handleAddFormCard);

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_visible",
};

enableValidation(config);