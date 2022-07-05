const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__input-error_visible');
}

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
}

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)){
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit')

    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(buttonElement, inputList);
    });
    })
    toggleButtonState(buttonElement, inputList);
};

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach (formElement => {
    setEventListeners (formElement, restConfig)
})
};