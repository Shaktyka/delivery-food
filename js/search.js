'use strict';

const searchInput = document.querySelector(`.input-search`);

searchInput.addEventListener(`keypress`, (evt) => {
    const code = evt.charCode;

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
                            // Выводим карточки
                        });
                });
            });

    }
});