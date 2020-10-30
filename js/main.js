'use strict';

const cartButton = document.querySelector(`#cart-button`);
const modal = document.querySelector(`.modal`);
const closeCartBtn = modal.querySelector(`.close`);
const clearCartBtn = modal.querySelector(`.clear-cart`);
const sendCartBtn = modal.querySelector(`.send-cart`);
const cartBody = modal.querySelector(`.modal-body`);

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

// Закрытие модалки корзины
const closeCart = () => {
    modal.classList.remove(`is-open`);
    closeCartBtn.removeEventListener(`click`, closeCart);
    clearCartBtn.removeEventListener(`click`, clearCart);
};

// Очистка корзины
const clearCart = () => {
    closeCart();
};

// Рендеринг 1 строки корзины
const renderCartRow = (data) => {
    const { id, name, price, count } = data;

    return `<div class="food-row" id="${id}">
      <span class="food-name">${name}</span>
      <strong class="food-price">${price} ₽</strong>
      <div class="food-counter">
        <button class="counter-button">-</button>
        <span class="counter">${count}</span>
        <button class="counter-button">+</button>
      </div>
    </div>`.trim();
};

// Рендеринг корзины
const renderCart = () => {
    cartBody.innerHTML = ``;
    console.log(cartList);

    if (cartList.length > 0) {
        cartList.forEach((item) => {
            const cartRow = renderCartRow(item);
            cartBody.insertAdjacentHTML(`beforeend`, cartRow);
        });
    }
};

// Открытие модалки корзины
const openCart = () => {
    renderCart();
    modal.classList.add(`is-open`);
    closeCartBtn.addEventListener(`click`, closeCart);
    clearCartBtn.addEventListener(`click`, clearCart);
};

cartButton.addEventListener(`click`, openCart);
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