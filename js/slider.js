new Swiper(`.swiper-container`, {
    loop: true,
    sliderPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
    },
    mousewheel: {
        invert: true,
    },
    grabCursor: true,
});