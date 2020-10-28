'use strict';

const cardsRestaurants = document.querySelector(`.cards-restaurants`);
const containerPromo = document.querySelector(`.container-promo`);
const restaurants = document.querySelector(`.restaurants`);
const menu = document.querySelector(`.menu`);
const logo = document.querySelector(`.logo`);
const cardsMenu = document.querySelector(`.cards-menu`);

// Создание карточки пиццы
const renderPizzaCard = () => {
    return `<div class="card">
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
      <div class="card-text">
          <div class="card-heading">
              <h3 class="card-title card-title-reg">Пицца Классика</h3>
          </div>
          <div class="card-info">
              <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.
              </div>
          </div>
          <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">510 ₽</strong>
          </div>
      </div>
    </div>`;
};

// Рендерим все карточки пиццы
const renderPizzaCards = () => {
    cardsMenu.innerHTML = '';

    const pizzaCard = renderPizzaCard();

    cardsMenu.insertAdjacentHTML(`beforeend`, pizzaCard);
    cardsMenu.insertAdjacentHTML(`beforeend`, pizzaCard);
    cardsMenu.insertAdjacentHTML(`beforeend`, pizzaCard);
};

// Показать товары
const openGoods = (evt) => {
    const target = evt.target;
    const restaurant = target.closest(`.card-restaurant`);

    if (restaurant) {
        // Прячем/показываем нужные модули
        containerPromo.classList.add(`hide`);
        restaurants.classList.add(`hide`);
        menu.classList.remove(`hide`);

        renderPizzaCards(); // Рендерим список пиццы
    }
};

// Добавляет карточку товара
const renderRestaurantCard = () => {
    return `<a class="card card-restaurant">
        <img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">Тануки</h3>
                <span class="card-tag tag">60 мин</span>
            </div>
            <div class="card-info">
                <div class="rating">
                    4.5
                </div>
                <div class="price">От 1 200 ₽</div>
                <div class="category">Суши, роллы</div>
            </div>
        </div>
      </a>`;
};

// Рендерит все карточки ресторанов
const renderRestaurantCards = () => {
    const restaurantCard = renderRestaurantCard();

    cardsRestaurants.insertAdjacentHTML(`beforeend`, restaurantCard);
    cardsRestaurants.insertAdjacentHTML(`beforeend`, restaurantCard);
    cardsRestaurants.insertAdjacentHTML(`beforeend`, restaurantCard);
};

// Клик по логотипу
const logoClickHandler = () => {
    containerPromo.classList.remove(`hide`);
    restaurants.classList.remove(`hide`);
    menu.classList.add(`hide`);
};

// Стартовая функция рендеринга контента
const start = () => {
    renderRestaurantCards(); // Рендерит карточки ресторанов

    cardsRestaurants.addEventListener(`click`, openGoods);
    logo.addEventListener(`click`, logoClickHandler);
};

start();