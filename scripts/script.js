const popup = document.querySelector('.popup');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnClosePopup = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');
const profileEditForm = document.querySelector('.popup__form_edit');

const popupCard = document.querySelector('.popup_type_add');
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const btnCloseCard = document.querySelector('.popup__close_card');
const cardEditForm = document.querySelector('.popup__form_add');
const templateCard = document.querySelector('#templateCard').content;
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__button-trash');

const zoomPopupCardImage = document.querySelector('.popup__image');
const zoomPopupCardTitle = document.querySelector('.popup__description');
const popupImage = document.querySelector('.popup_type_view');
const btnCloseImage = document.querySelector('.popup__close_image');


const cardItemsElement = document.querySelector('.elements');
const getElementByEvent = evt => evt.currentTarget.closest('.element');




function openPopup(popup) {
    popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

function openPopupProfile() {
  profileNameInput.value = profileName.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(popupProfile);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    profileEditForm.reset();
    closePopup(popupProfile);
}


function addFormCard (evt) {
  evt.preventDefault();
  const card = { 
    name: cardTitleInput.value, 
    link: cardLinkInput.value 
  }; 
  addElement(card);
  cardEditForm.reset();
  closePopup(popupCard);
};

function likeButton(evt) {
  evt.target.classList.toggle('element__button-like_active');
  };


  
function createCard ({name, link}) {
  const cardElement = templateCard.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.addEventListener('click', evt => {openPopupImage(evt)});

  cardImage.src = link;
  cardElement.querySelector('.element__title').textContent = name;

  cardElement.querySelector('.element__button-like').addEventListener('click', likeButton);

  cardElement.querySelector('.element__button-trash').addEventListener('click', evt => {
    cardElement.remove();
  });
    return cardElement;
}

function addElement(cardElement) {
const elementCard = createCard(cardElement);
cardItemsElement.prepend(elementCard);
};

initialCards.forEach(addElement);




function openPopupImage(evt){
const element = getElementByEvent(evt);
zoomPopupCardImage.src = element.querySelector('.element__image').src;
zoomPopupCardTitle.textContent = element.querySelector('.element__title').textContent;
openPopup(popupImage);
}

btnEditProfile.addEventListener('click',() => openPopup(popupProfile));
btnClosePopup.addEventListener('click', () => closePopup(popupProfile));
btnCloseImage.addEventListener('click', () => closePopup(popupImage));
btnCloseCard.addEventListener('click', () => closePopup(popupCard));
btnAddCard.addEventListener('click',() => openPopup(popupCard));
popupProfile.addEventListener('submit', formSubmitHandler);
popupCard.addEventListener('submit', addFormCard);