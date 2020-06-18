
const cardTemplate = document.querySelector('#place-template').content.querySelector('.place-card');
const placesList = document.querySelector('.places-list');
const popupOpenButton = document.querySelector('.button');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCloseAddButton = document.querySelector('.popup__close-add');
const popupCloseImgButton = document.querySelector('.popup__close-img');
const popupCloseEditButton = document.querySelector('.popup__close-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link-url');
const newCardForm = document.querySelector('.popup__form');
const buttonEdit = document.querySelector('.button-edit');
const name = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const authorInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
const formEdit = document.forms.editForm;
const formAdd = document.forms.addForm;
const popupImage = document.querySelector('.popup__image');
const popupImg = document.querySelector('.popup_img');

// функция открытия попапа с картнкой
function openImg(evt) {
  if (evt.target.classList.contains('place-card__image')) {
    popupImg.classList.toggle('popup_is-opened');
    popupImage.src = evt.target.dataset.url
  }
}

function createCards() {
  initialCards.forEach((item) => { placesList.append(createCard(item)) });
}

// открытие закрытие
function popupOpen(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
}

function popupClose(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
}

function setDefault(formElement) {
  const button = formElement.querySelector('.popup__button');
  if (formElement.name === 'addForm') {
    setSubmitButtonState(button, formElement.checkValidity())
  }
  if (formElement.name === 'editForm') {
    setSubmitButtonState(button, formElement.checkValidity())
  }
}

// ставим и убираем лайк
function likeOn(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};


// шаблон новой карточки
function createNewCard(event) {
  event.preventDefault();
  const userCard = {
    name: '',
    link: ''
  }
  userCard.name = nameInput.value;
  userCard.link = linkInput.value;

  placesList.append(createCard(userCard));
  popupClose(popupAdd)
  newCardForm.reset();
}


// фкнуция удаления карточки
function deleteCard(event) {
  event.preventDefault();
  const card = event.currentTarget;

  if (event.target.classList.contains('place-card__delete-icon')) {
    card.removeEventListener('click', deleteCard);
    card.removeEventListener('click', likeOn);
    card.removeEventListener('click', openImg);
    card.remove();
  }
}
// функция замены данных
function changeInfo(event) {

  event.preventDefault();
  name.textContent = authorInput.value;
  job.textContent = jobInput.value;
  editForm.reset();
  popupClose(popupEdit)
}
// функция создания карточки
function createCard(card) {
  // template -- отлично!
  const newPlaceCard = cardTemplate.cloneNode(true);
  newPlaceCard.querySelector('.place-card__name').textContent = card.name;
  const cardImage = newPlaceCard.querySelector('.place-card__image');
  cardImage.style.backgroundImage = `url(${card.link})`;
  // dataset -- хорошо!
  cardImage.dataset.url = `${card.link}`;

  newPlaceCard.addEventListener('click', deleteCard);
  newPlaceCard.addEventListener('click', openImg);
  newPlaceCard.addEventListener('click', likeOn);
  return newPlaceCard;
};


// Код первичной загрузки
createCards()


// слушатели
popupOpenButton.addEventListener('click', function () {
  const button = formAdd.querySelector('.popup__button');
  deleteErrors(popupAdd);
  setDefault(formAdd);
  setSubmitButtonState(button, formAdd.checkValidity());
  formAdd.reset();
  popupOpen(popupAdd);
});
popupCloseAddButton.addEventListener('click', () => {
  popupClose(popupAdd);
  setDefault(formAdd);
});
newCardForm.addEventListener('submit', createNewCard);
buttonEdit.addEventListener('click', function () {
  deleteErrors(popupEdit);
  authorInput.value = name.textContent;
  jobInput.value = job.textContent;
  setDefault(formEdit);
  popupOpen(popupEdit);
});

popupCloseEditButton.addEventListener('click', () => { popupClose(popupEdit) });

formEdit.addEventListener('submit', changeInfo)

popupCloseImgButton.addEventListener('click', () => { popupClose(popupImg) });

// Добрый день.
// Получился хороший код, открытие окон стало более простым и упорядочнным, код стал чище и проще к чтению.

// ## Итог:

// - Код работает, нет синтаксических и других ошибок
// - Добавлена кнопка Edit, по нажатию она открывает попап редактирования профиля
// - Форма редактирования профиля умеет редактировать соответствующие поля страницы — имя и о себе
// - По клику на картинку карточки, соответствующая фотография открывается в попапе
// - В формах редактирования профиля и добавления новой карточки кнопки сабмита должны заблокированы
//   если хотя бы одно из полей форм пустое
// - В форме редактирования профиля работает лайв-валидация
// - Валидация полей описана одной функцией
// - Форма и ошибки сбрасываются после отправки данных
// - Нарушение DRY (Дублирование больших фрагментов кода)
// - Функции, декларированные как `function functionName() {}` не вызываются до того, как были объявлены
// - Сделано дополнительное задание

// Работа принята, успехоа в учебе!

