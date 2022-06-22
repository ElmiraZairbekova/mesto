const popup = document.querySelector('.popup');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnClosePopup = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup_form_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');


const popupCard = document.querySelector('.popup__form_add');
const cardTitle = document.querySelector('.element__title');
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const formElementCard = document.querySelector('.popup_place_edit');


const imagePopup = document.querySelector('.popup_view');
const templateCard = document.querySelector('#templateCard').content;
//const cardEditForm = document.querySelector('.popup__form_add');
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__button-trash');
const cardItemsElement = document.querySelector('.elements');
//const addCardForm = document.querySelector('.popup__form-add');
const getCardByEvent = evt => evt.currentTarget.closest('.element');

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

//работает Popup и PopupEdit
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


// черновик popup card
// function popupAddCard() {
  // popupOpen();
 // cardTitleInput.value = cardTitle.trim();
 // bigImage.src = element.link;
//}

// function formSubmitHandlerAdd (evt) {
  //  evt.preventDefault();
  //  cardTitle.textContent = cardTitleInput.value;
  //  element.link = bigImage.src;
  //  popupClose();
//}

//popup card не работает
function popupAddCard (evt) {
  evt.preventDefault()
    const newCard = {
    name: cardTitle.value,
    link: cardLink.value
  };
  createCard (newCard);
  formElementCard.reset();
  popupClose (popupCard);
}

//Like работает, но неправильно. Мне кажется, что мешает hover в стиле
function handleLikeButton(evt) {
  evt.target.classList.toggle('element__button-like_active');
  };

//Работает
function createCard (element) {
  const cardElement = templateCard.querySelector('.element').cloneNode(true);
  const bigImage = cardElement.querySelector('.element__image');
  bigImage.addEventListener('click', ()=> openCard(cardElement));

  bigImage.src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;

  cardElement.querySelector('.element__button-like').addEventListener('click', handleLikeButton);

  cardElement.querySelector('.element__button-trash').addEventListener('click', evt => {
    const card = getCardByEvent(evt);
    card.remove();
  });

  cardItemsElement.prepend(cardElement);
}

initialCards.forEach(createCard); 

//popup Big Image не работает
function openCard(cardElement) {
  imagePopup.querySelector('.popup__image').src = cardElement.querySelector('.element__image').src;
  imagePopup.querySelector('.popup__description').textContent = cardElement.querySelector('.element__title').textContent;
  popupOpen(imagePopup)
}

// работает
btnEditProfile.addEventListener('click',() => popupOpen(popupProfile));
btnClosePopup.addEventListener('click', () => popupClose(popupProfile));
popupProfile.addEventListener('submit', formSubmitHandler);
//не работает
btnAddCard.addEventListener('click',() => popupOpen(popupCard));
popupCard.addEventListener('submit', popupAddCard);