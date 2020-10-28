window.disableScroll = () => {
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
      position: fixed;
      top: ${-window.scrollY}px;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    `;
};

window.enableScroll = () => {
    document.body.style.cssText = ``;
    window.scroll({ top: document.body.dbScrollY });
};