'use strict';

const searchInput = document.querySelector(`.input-search`);

const renderSearchProducts = (array) => {
    renderPizzaCards(array);
};

searchInput.addEventListener(`keypress`, (evt) => {
    const code = evt.charCode;
    let products = [];

    if (code === 13) {
        getData(PARTNERS_LINK)
            .then((data) => {
                return data.map((partner) => {
                    return partner.products;
                });
            })
            .then((linksArr) => {
                cardsMenu.innerHTML = ``;

                linksArr.forEach((link) => {
                    getData(`./db/${link}`)
                        .then((data) => {
                            // Показываем нужные блоки
                            containerPromo.classList.add(`hide`);
                            restaurants.classList.add(`hide`);
                            menu.classList.remove(`hide`);
                            // Изменить содержимое блока, где выводились данные ресторана
                            sectionHeading.querySelector(`.restaurant-title`).textContent = `Результаты поиска`;
                            sectionHeading.querySelector(`.rating`).textContent = ``;
                            sectionHeading.querySelector(`.price`).textContent = `Любая цена`;
                            sectionHeading.querySelector(`.category`).textContent = `Любая кухня`;
                            // Рендерим карточки
                            products = [...products, ...data];
                            renderSearchProducts(products);
                        });
                });
            });

    }
});