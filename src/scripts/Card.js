// import {openPopup, popupImage, zoomPopupCardImage, zoomPopupCardTitle} from './index.js';
export default class Card {
    constructor(cardData, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._isLiked = false;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._link, this._name); 
    });

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__button-like_active');
    this._isLiked = !this._isLiked;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}