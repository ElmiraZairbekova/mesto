// import "./index.css";

// Импорт классов
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';

import {
  buttonEditProfile,
  // buttonClosePopup,
  // profileNameSelector,
  // profileAboutSelector,
  profileNameInput,
  profileDescriptionInput,
  // popupProfileSelector,
  // cardTitleInput,
  // cardLinkInput,
  // buttonCloseCard,
  // cardEditForm,
  buttonAddCard,
  // buttonDisabled,
  // cardItemsElement,
  config,
  formValidation,
  initialCards
} from "../utils/constants.js";


//  Создание Popup карточки
const popupImage = new PopupWithImage('.popup_type_view');
popupImage.setEventListeners();

//  Открытие Popup картинки
const handleCardClick = (link, name) => {
  popupImage.open(link, name);
};

function createCard (cardElement) {
    const card = new Card(cardElement, '#templateElement', handleCardClick);
    console.log (cardElement)
    return card.createNewCard(); 
  };

//  Создаем секции под карточку
const cardSection = new Section( 
  {
    items: initialCards,
    renderer: (cardElement) => {
      cardSection.addItem(createCard(cardElement));
    }
  },
  '.elements'
);

cardSection.renderItems(initialCards);

//  Клик сохранения новой карточки
const handleFormAddCardSubmit = (cardElement) => {
  cardSection.addItem(createCard(cardElement));
  popupAddCard.close();
};

//  Popup добавления карточик
const popupAddCard = new PopupWithForm('.popup_type_add', handleFormAddCardSubmit);
popupAddCard.setEventListeners();


// UserInfo с данными профиля
const profileInfo = new UserInfo('.profile__name', '.profile__description');



// Сохранение днных профиля
const handleFormProfileSubmit = (userInfo) => {
  profileInfo.setUserInfo(userInfo);
  popupProfile.close();
  console.log(userInfo);
};

// Создание popup профиля
const popupProfile = new PopupWithForm('.popup_type_edit', handleFormProfileSubmit);
popupProfile.setEventListeners();

// Вкл валидацию
const activateValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidation[formName] = validator;
    validator.enableValidation();
  });
};

// Слушатели на кнопки
buttonEditProfile.addEventListener("click", () => {
  const userInfo = profileInfo.getUserInfo();
  console.log(userInfo);
  profileNameInput.value = userInfo.name;
  profileDescriptionInput.value = userInfo.description;
  
  formValidation["editProfile"].resetValidation();
  popupProfile.open();
});


buttonAddCard.addEventListener("click", () => {
  formValidation["addCard"].resetValidation();
  popupAddCard.open();
});




// вызов валидации

activateValidation();
