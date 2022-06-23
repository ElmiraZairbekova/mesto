const popup = document.querySelector('.popup');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnClosePopup = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');


const popupCard = document.querySelector('.popup_type_add');
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const elements = document.querySelector('.elements');
const btnCloseCard = document.querySelector('.popup__close_card');
const cardEditForm = document.querySelector('.popup__form_add');

const btnCloseImage = document.querySelector('.popup__close_image');
const imagePopup = document.querySelector('.popup_view');
const templateCard = document.querySelector('#templateCard').content;
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__button-trash');
const cardItemsElement = document.querySelector('.elements');
const getCardByEvent = evt => evt.currentTarget.closest('.element');
const getElementByEvent = evt => evt.currentTarget.closest('.element');

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

function popupOpen(popup) {
    popup.classList.add('popup_active');
    profileNameInput.value = profileName.textContent.trim();
    profileDescriptionInput.value = profileDescription.textContent.trim();
}

function popupClose(popup) {
  popup.classList.remove('popup_active');
}

function openPopupProfile() {
  profileNameInput.value = profileName.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  popupOpen(popupProfile);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    popupClose(popupProfile);
}


function addFormCard (evt) {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  createCard(newCard);
  cardEditForm.reset();
  popupClose(popupCard);
}

//Like работает, но неправильно. Мне кажется, что мешает hover в стиле
function LikeButton(evt) {
  evt.target.classList.toggle('element__button-like_active');
  };
  
function createCard (element) {
  const cardElement = templateCard.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.addEventListener('click', evt => {openPopupImage(evt)});

  cardImage.src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;

  cardElement.querySelector('.element__button-like').addEventListener('click', LikeButton);

  cardElement.querySelector('.element__button-trash').addEventListener('click', evt => {
    const card = getCardByEvent(evt);
    card.remove();
  });

  cardItemsElement.prepend(cardElement);
}

initialCards.forEach(createCard); 

const popupImage = document.querySelector('.popup_view');
function openPopupImage(evt){
const element = getElementByEvent(evt);
popupImage.querySelector('.popup__image').src = element.querySelector('.element__image').src;
popupImage.querySelector('.popup__description').textContent = element.querySelector('.element__title').textContent;
popupOpen(popupImage);
}

btnEditProfile.addEventListener('click',() => popupOpen(popupProfile));
btnClosePopup.addEventListener('click', () => popupClose(popupProfile));
btnCloseImage.addEventListener('click', () => popupClose(popupImage));
btnCloseCard.addEventListener('click', () => popupClose(popupCard));
btnAddCard.addEventListener('click',() => popupOpen(popupCard));
popupProfile.addEventListener('submit', formSubmitHandler);
popupCard.addEventListener('submit', addFormCard);