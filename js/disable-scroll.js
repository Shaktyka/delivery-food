window.disableScroll = () => {

    const scrollWidth = window.innerWidth - document.body.offsetWidth;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
      position: fixed;
      top: ${-window.scrollY}px;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      padding-right: ${scrollWidth}px;
    `;
};

window.enableScroll = () => {
    document.body.style.cssText = ``;
    window.scroll({ top: document.body.dbScrollY });
};