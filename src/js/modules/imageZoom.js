const imageZoom = (sectionSelector, previewClass, modalClass, modalContentClass, sourceAttributeOnParent = false) => {

  let readyToClose = false;

  const modal = document.createElement('div');
  modal.classList.add(modalClass);

  const bigImage = document.createElement('img');
  bigImage.classList.add(modalContentClass);

  modal.appendChild(bigImage);

  const workSection = document.querySelector(sectionSelector);
  workSection.appendChild(modal);

  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains(previewClass)) {

      modal.classList.add('fadeIn', 'show_block');
      document.documentElement.style.overflow = 'hidden';

      if (sourceAttributeOnParent) {
        bigImage.setAttribute('src', target.parentNode.getAttribute(sourceAttributeOnParent));
      } else {
        bigImage.setAttribute('src', target.getAttribute('src'));
      }

      setTimeout(() => {
        readyToClose = true;
      }, 1200);
    }

    if (readyToClose && target && target.classList.contains(modalClass)) {
      readyToClose = false;
      modal.classList.add('fadeOut');
      modal.classList.remove('fadeIn');
      setTimeout(() => {
        modal.classList.remove('fadeOut', 'show_block');
        document.documentElement.style.overflow = 'overlay';
      }, 1200);
    }
  });
};

export default imageZoom;