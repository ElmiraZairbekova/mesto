import {openPopup, popupImage, zoomPopupCardImage, zoomPopupCardTitle} from './index.js';
export default class Card {
    constructor(card, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = card.name;
    this._link = card.link;
    this._isLiked = false;

  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }


  createNewCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.element__image');
    this._titleElement = this._element.querySelector('.element__title');
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._imgElement.title = this._name;
    this._titleElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__button-like');
    this._deleteButton = this._element.querySelector('.element__button-trash');

    this._imgElement.addEventListener('click', () => {
      this._openPopupImage(this._cardImageLink, this._cardTitle);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _openPopupImage() {
    
    zoomPopupCardImage.src = this._link;
    zoomPopupCardTitle.alt = this._name;
    zoomPopupCardTitle.textContent = this._name;
    openPopup(popupImage);
  };

  _likeCard() {
    this._likeButton.classList.toggle('element__button-like_active');
    this._isLiked = !this._isLiked;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}