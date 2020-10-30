'use strict';

const searchInput = document.querySelector(`.input-search`);

const renderSearchProducts = (array) => {
    renderPizzaCards(array);
};

searchInput.addEventListener(`keypress`, (evt) => {
    const code = evt.charCode;

    if (code === 13) {
        const searchValue = evt.target.value.trim();
        if (!searchValue) {
            evt.target.style.outline = `2px solid red`;
            evt.target.value = `Введите запрос`;
            setTimeout(() => {
                evt.target.style.outline = `none`;
                evt.target.value = ``;
            }, 1500);
            return;
        }

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
                            const searchResult = data.filter((item) => {
                                const itemName = item.name.toLowerCase();
                                const searchStr = searchValue.toLowerCase();
                                return itemName.includes(searchStr);
                            });

                            // Показываем нужные блоки
                            containerPromo.classList.add(`hide`);
                            restaurants.classList.add(`hide`);
                            menu.classList.remove(`hide`);
                            // Изменить содержимое блока, где выводились данные ресторана
                            sectionHeading.querySelector(`.restaurant-title`).textContent = `Результаты поиска`;
                            sectionHeading.querySelector(`.rating`).textContent = ``;
                            sectionHeading.querySelector(`.price`).textContent = `Любая цена`;
                            sectionHeading.querySelector(`.category`).textContent = `Любая кухня`;
                            // Рендерим результат поиска
                            renderSearchProducts(searchResult);
                        });
                });
            });

    }
});