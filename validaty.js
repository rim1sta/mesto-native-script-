const formAddCard = document.forms.addForm;
const formUser = document.forms.editForm;

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
  wrongPattern: 'Введите данные в верном формате',
}

// Функция проверки поля на ошибки
function isValidate(input) {

  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }


  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  }

  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }

  return input.checkValidity();
}

// Функция добавления/удаления ошибки с инпута
function isFieldValid(input) {
  const errorElem = input.closest('.popup__form').querySelector(`#${input.id}-error`);
  const valid = isValidate(input);
  errorElem.textContent = input.validationMessage;
  return valid;
}

// функция удаления ошибок
// Отлично!
function deleteErrors(popup) {
  const errorElements = popup.querySelectorAll('.error');
  errorElements.forEach((span) => { span.textContent = '' });
};

// Функци активации и деактивации кнопки
function setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add('popup__button_valid');
    button.classList.remove('popup__button_invalid');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_invalid');
    button.classList.remove('popup__button_valid');
  }
}

// Фунция слушатель события на input
function handlerInputForm(evt) {
  const currentForm = evt.currentTarget;
  const submit = evt.currentTarget.querySelector('.button');

  isFieldValid(evt.target);
  if (currentForm.checkValidity()) {
    setSubmitButtonState(submit, true)
  } else {
    setSubmitButtonState(submit, false)
  }
}



formAddCard.addEventListener('input', handlerInputForm, true);

formUser.addEventListener('input', handlerInputForm, true);
