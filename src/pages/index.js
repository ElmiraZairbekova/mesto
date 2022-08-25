// import './index.css';
import {
  config,
  buttonEditAvatar,
  profileAvatarSelector,
  profileNameSelector,
  profileAboutSelector,
  buttonEditProfile,
  buttonAddCard,
  popupProfileSelector,
  popupNewPlaceSelector,
  popupViewerSelector,
  popupConfirmSelector,
  popupUpdateAvatarSelector,
  cardsContainerSelector,
  cardSelector,
}from '../utils/constants.js';

import Api from '../scripts/Api.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithConfirm from '../scripts/PopupWithConfirm.js';
import UserInfo from '../scripts/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'cbd1d19b-554f-435c-9a41-b799d284e240',
    'Content-Type': 'application/json'
  }
}); 

const userProfile = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });


api.getPageNeedData().then((responses) => {
  const [cardData, userData] = responses;
  userProfile.setUserInfo({ userName: userData.name, userDescription: userData.about });
  userProfile.setUserAvatar({ userAvatarLink: userData.avatar });
  userProfile.saveUserId(userData._id);
  cards.renderItems(cardData);
}).catch((err) => {
  console.error(err);
});

const cards = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item, cardSelector);
    cards.addItem(cardElement);
  },
}, cardsContainerSelector);


const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, (evt) => {
  evt.preventDefault();
  popupUpdateAvatar.isLoadingMessage(true);
  const formValues = popupUpdateAvatar.getFormValues();
  api.updateProfileAvatar({ avatar: formValues.url }).then((data) => {
    userProfile.setUserAvatar({ userAvatarLink: data.avatar });
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.isLoadingMessage(false);
  });
});
popupUpdateAvatar.setEventListener();

const popupUpdateAvatarValidator = new FormValidator(config, popupUpdateAvatar.getFormElement());
popupUpdateAvatarValidator.enableValidation();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  popupProfile.isLoadingMessage(true);
  const formValues = popupProfile.getFormValues();
  api.updateUserInfo({ name: formValues.name, about: formValues.description }).then((data) => {
    userProfile.setUserInfo({ userName: data.name, userDescription: data.about });
    popupProfile.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupProfile.isLoadingMessage(false);
  });
});
popupProfile.setEventListener();
const popupProfileValidator = new FormValidator(config, popupProfile.getFormElement());
popupProfileValidator.enableValidation();


const popupNewPlace = new PopupWithForm(popupNewPlaceSelector, (evt) => {
  evt.preventDefault();
  popupNewPlace.isLoadingMessage(true);
  const formValues = popupNewPlace.getFormValues();
  const item = { name: formValues.name, link: formValues.link };
  api.addNewCard(item).then((newCardItem) => {
    const cardElement = createNewCard(newCardItem, cardSelector);
    cards.addNewItem(cardElement);
    popupNewPlace.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupNewPlace.isLoadingMessage(false);
  });
});

popupNewPlace.setEventListener();


const popupNewPlaceValidator = new FormValidator(config, popupNewPlace.getFormElement());
popupNewPlaceValidator.enableValidation();


const popupConfirm = new PopupWithConfirm(popupConfirmSelector);
popupConfirm.setEventListener();


const popupImage = new PopupWithImage(popupViewerSelector);
popupImage.setEventListener();



function createNewCard(item, cardSelector) {
  const card = new Card({
    data: item, cardSelector, userId: userProfile.getUserId(),
    handleCardClick: () => {
      popupImage.open(item.link, item.name);
    },
    handleLikeButtonClick: () => {
      if (card.isLiked) {
        api.deleteCardLike(card.getCardId()).then((data) => {
          card.unsetLike();
          card.likesCounterUpdate(data.likes);
        }).catch((err) => {
          console.error(err);
        });
      } else {
        api.addCardLike(card.getCardId()).then((data) => {
          card.setLike();
          card.likesCounterUpdate(data.likes);
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    handleRemoveButtonClick: () => {
      const cardId = card.getCardId();
      popupConfirm.changeHandlerSubmitForm((evt) => {
        evt.preventDefault();
        api.removeCard(cardId).then(() => {
          card.removeCard();
          popupConfirm.close();
        }).catch((err) => {
          console.error(err);
        });
      });
      popupConfirm.open();
    },
  });
  return card.generateNewCard();
}

// Батоны
buttonEditProfile.addEventListener('click', () => {
  const userInfoData = userProfile.getUserInfo();
  const profileForm = popupProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName; 
  profileForm.elements.description.value = userInfoData.userDescription; 
  popupProfileValidator.resetValidation();
  popupProfile.open();
});


buttonAddCard.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupNewPlace.open();
});


buttonEditAvatar.addEventListener('click', () => {
  popupUpdateAvatarValidator.resetValidation();
  popupUpdateAvatar.open();
});
