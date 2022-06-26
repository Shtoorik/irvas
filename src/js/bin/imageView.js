function image(imgsButtonsSelector,zoomModalClass, zoomModalContentClass) {

  /* imgs.forEach((item, i) => {
    const imgZoomModal = document.createElement('div');
    imgZoomModal.classList.add(`zoom_${i}`);
    imgZoomModal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(0, 0, 0, 0.75);
    `;
    imgZoomModal.innerHTML = `
      <img class="zoom_img" src="${item.getAttribute("href")}"  alt="#" style='
      position: fixed;
      top: 10%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      max-height: 80%;'>
    `;
    document.body.appendChild(imgZoomModal);
  }); */

  const imgs = document.querySelectorAll(imgsButtonsSelector);

  imgs.forEach(item => {
    const imgZoomModal = document.createElement('div');
    imgZoomModal.classList.add(`${zoomModalClass}`);
    imgZoomModal.innerHTML = `<img class="${zoomModalContentClass}" src="${item.getAttribute("href")}"  alt="#">`;

    document.body.appendChild(imgZoomModal);
  });

  let activeModalIndex = -1;
  const imgZoomModals = document.querySelectorAll('.' + zoomModalClass);

  imgs.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      imgZoomModals[i].classList.add('fadeIn', 'show_block');

      document.documentElement.style.overflow = 'hidden';
      activeModalIndex = i;
    });
  });

  document.addEventListener('click', (e) => {
    if (activeModalIndex != -1 && e.target && e.target == imgZoomModals[activeModalIndex]) {
      const activeModal = imgZoomModals[activeModalIndex];
      activeModalIndex = -1;

      activeModal.classList.add('fadeOut');
      activeModal.classList.remove('fadeIn');
      setTimeout(() => {
        activeModal.classList.remove('fadeOut', 'show_block');
        document.documentElement.style.overflow = 'overlay';
      }, 1200);
    }
  });
}
