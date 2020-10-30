'use strict';

const PARTNERS_LINK = `./db/partners.json`;

const cardsRestaurants = document.querySelector(`.cards-restaurants`);
const containerPromo = document.querySelector(`.container-promo`);
const restaurants = document.querySelector(`.restaurants`);
const menu = document.querySelector(`.menu`);
const logo = document.querySelector(`.logo`);
const cardsMenu = document.querySelector(`.cards-menu`);
const sectionHeading = document.querySelector(`.menu .section-heading`);

let restaurantList = []; // Список ресторанов
let productsList = []; // Список продуктов
let cartList = []; // Корзина

// Создание карточки пиццы
const renderPizzaCard = (data) => {
    const { id, description, image, name, price } = data;

    return `<div class="card" id="${id}">
      <img src="${image}" alt="image" class="card-image" />
      <div class="card-text">
          <div class="card-heading">
              <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
              <div class="ingredients">
                ${description}
              </div>
          </div>
          <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price card-price-bold">${price} ₽</strong>
          </div>
      </div>
    </div>`;
};

// Рендерим все карточки пиццы
const renderPizzaCards = (productsData) => {
    cardsMenu.innerHTML = '';

    productsData.forEach((prodObj) => {
        const pizzaCard = renderPizzaCard(prodObj);
        cardsMenu.insertAdjacentHTML(`beforeend`, pizzaCard);
    });
};

// Добавляет карточку товара
const renderRestaurantCard = (data) => {
    const { image, name, time_of_delivery: deliveryTime, kitchen, price, stars, products } = data;

    return `<a class="card card-restaurant" data-products="${products}">
        <img src="${image}" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${deliveryTime} мин</span>
            </div>
            <div class="card-info">
                <div class="rating">
                    ${stars}
                </div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        </div>
      </a>`;
};

// Прописываем данные ресторана в заголовок списка продуктов
const setRestaurantData = (restaurantObj) => {
    const { name, kitchen, price, stars } = restaurantObj;

    sectionHeading.querySelector(`.restaurant-title`).textContent = name;
    sectionHeading.querySelector(`.rating`).textContent = stars;
    sectionHeading.querySelector(`.price`).textContent = `От ${price} ₽`;
    sectionHeading.querySelector(`.category`).textContent = kitchen;
};

// Получаем объект с данными ресторана из массива
const getRestaurantObject = (restName) => {
    return restaurantList.find((item) => item.name === restName) || ``;
};

// Показать товары
const openGoods = (evt) => {

    const target = evt.target;
    const restaurant = target.closest(`.card-restaurant`);

    if (restaurant) {
        // Проверяем авторизацию
        if (!isAuth) {
            toggleModalAuth();
            return;
        }

        // Прячем/показываем нужные модули
        containerPromo.classList.add(`hide`);
        restaurants.classList.add(`hide`);

        // Получаем данные о продуктах по ссылке
        const productsLink = `./db/${restaurant.dataset.products}`;
        getData(productsLink)
            .then((res) => {
                productsList = res; // Сохраняем список продуктов
                renderPizzaCards(res); // Рендерим список пиццы
            });

        // Передаём данные ресторана для записи в заголовок списка продуктов
        const restName = restaurant.querySelector(`.card-title`).textContent;
        setRestaurantData(getRestaurantObject(restName));

        menu.classList.remove(`hide`);
    }
};

// Рендерит все карточки ресторанов
const renderRestaurantCards = (restaurantsData) => {
    restaurantsData.forEach((dataObj) => {
        const restaurantCard = renderRestaurantCard(dataObj);
        cardsRestaurants.insertAdjacentHTML(`beforeend`, restaurantCard);
    });
};

// Клик по логотипу
const logoClickHandler = () => {
    containerPromo.classList.remove(`hide`);
    restaurants.classList.remove(`hide`);
    menu.classList.add(`hide`);
};

// Клик по карточке в меню
const addToCart = (evt) => {
    const card = evt.target.closest(`.card`);

    if (card) {
        // const title = card.querySelector(`.card-title`).textContent;
        // const price = card.querySelector(`.card-price`).textContent;

        const productId = card.id;

        // Ищем в корзине объект с id = id продукта
        const food = cartList.find((item) => {
            return item.id === productId;
        });

        if (food) {
            food.count += 1;
        } else {
            // Иначе находим данные в массиве продуктов и записываем объект в массив корзины
            const productObj = productsList.find((item) => item.id === productId);
            const productToCart = {...productObj, count: 1 };
            cartList.push(productToCart);
        }
    }
};

// Стартовая функция рендеринга контента
const start = () => {
    getData(PARTNERS_LINK)
        .then((res) => {
            restaurantList = res;
            renderRestaurantCards(res); // Рендерит карточки ресторанов
        });

    cardsRestaurants.addEventListener(`click`, openGoods);
    logo.addEventListener(`click`, logoClickHandler);
    cardsMenu.addEventListener(`click`, addToCart);
};

start();