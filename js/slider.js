new Swiper(`.swiper-container`, {
    loop: true,
    sliderPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    autoplay: {
        delay: 3000,
    },
    mousewheel: {
        invert: true,
    },
    grabCursor: true,
});