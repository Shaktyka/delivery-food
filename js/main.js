'use strict';

const cartButton = document.querySelector(`#cart-button`);
const modal = document.querySelector(`.modal`);
const close = document.querySelector(`.close`);
const authBtn = document.querySelector(`.button-auth`);
const modalAuth = document.querySelector(`.modal-auth`);
const closeAuth = modalAuth.querySelector(`.close-auth`);
const loginForm = modalAuth.querySelector(`#logInForm`);
const loginInput = modalAuth.querySelector(`#login`);
const passInput = modalAuth.querySelector(`#password`);
const buttonOut = document.querySelector(`.button-out`);
const userName = document.querySelector(`.user-name`);
let isAuth = false;
let login = localStorage.getItem('delivery');
let pass = '';

const toggleModal = () => {
    modal.classList.toggle(`is-open`);
};

cartButton.addEventListener(`click`, toggleModal);
close.addEventListener(`click`, toggleModal);

// Переключить модалку авторизации
const toggleModalAuth = (evt) => {
    modalAuth.classList.toggle(`is-open`);
    if (modalAuth.classList.contains(`is-open`)) {
        disableScroll();
        loginInput.focus();
    } else {
        enableScroll();
    }
};

// Закрываем модалку авторизации
const closeModalAuth = () => {
    modalAuth.classList.remove(`is-open`);
    enableScroll();
};

// Логаут
const logout = () => {
    localStorage.removeItem(`delivery`);
    authBtn.style.display = `block`;
    buttonOut.removeEventListener(`click`, logout);
    buttonOut.style.display = `none`;
    userName.textContent = '';
    userName.style.display = `none`;
    cartButton.style.display = `none`;
    isAuth = false;
    login = null;
    pass = '';
    checkAuth();
};

// Логин
const authorization = (evt) => {
    evt.preventDefault();
    login = loginInput.value.trim();
    pass = passInput.value.trim();

    if (!login || !pass) {
        alert(`Необходимо ввести логин и пароль`);
        return;
    }

    localStorage.setItem('delivery', login);

    isAuth = true;
    toggleModalAuth();
    loginForm.reset();

    authBtn.removeEventListener(`click`, toggleModalAuth);
    closeAuth.removeEventListener(`click`, closeModalAuth);
    loginForm.removeEventListener(`submit`, authorization);

    checkAuth();
};

const modalAuthClickHandler = (evt) => {
    if (evt.target.classList.contains(`is-open`)) {
        toggleModalAuth();
    }
};

// Пользователь НЕ авторизован
const isNotAuthorized = () => {
    console.log('Не авторизован');

    authBtn.addEventListener(`click`, toggleModalAuth);
    closeAuth.addEventListener(`click`, closeModalAuth);
    loginForm.addEventListener(`submit`, authorization);

    modalAuth.addEventListener(`click`, modalAuthClickHandler);
};

// Пользователь авторизован
const isAuthorized = () => {
    console.log('Авторизован');

    authBtn.style.display = `none`;
    buttonOut.style.display = `flex`;
    cartButton.style.display = `flex`;
    userName.textContent = login;
    userName.style.display = `inline`;

    buttonOut.addEventListener(`click`, logout);
};

// Проверка авторизации
const checkAuth = () => {
    if (isAuth) {
        isAuthorized();
    } else {
        isNotAuthorized();
    }
};

checkAuth();