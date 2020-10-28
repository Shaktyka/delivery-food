const cardsRestaurants = document.querySelector(`.cards-restaurants`);
const containerPromo = document.querySelector(`.container-promo`);
const restaurants = document.querySelector(`.restaurants`);
const menu = document.querySelector(`.menu`);
const logo = document.querySelector(`.logo`);

const openGoods = (evt) => {
    const target = evt.target;
    const restaurant = target.closest(`.card-restaurant`);

    if (restaurant) {
        containerPromo.classList.add(`hide`);
        restaurants.classList.add(`hide`);
        menu.classList.remove(`hide`);
    }
};

// Добавляет карточку товара
const createCardsRestaurant = () => {
    const card = `
      <a class="card card-restaurant">
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
      </a>
    `;

    cardsRestaurants.insertAdjacentHTML(`beforeend`, card);
};

createCardsRestaurant();

// Создание карточки пиццы
const createCard = () => {
    const card = `<div class="card">
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

const logoClickHandler = () => {
    containerPromo.classList.remove(`hide`);
    restaurants.classList.remove(`hide`);
    menu.classList.add(`hide`);
};

cardsRestaurants.addEventListener(`click`, openGoods);
logo.addEventListener(`click`, logoClickHandler);