import postDataJSON from "../services/services";
import { closeModal, openModal, openModalCurrent } from "./modal";

const formsWithoutModal = (formSelector, loadingImgPath, loadingImgHeightNumber, state = false) => {
  const formsElements = document.querySelectorAll(formSelector);

  const message = {
    loading: loadingImgPath,
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };

  const alert = document.createElement('img');
  alert.src = message.loading;
  alert.style.cssText = `
        display: block;
        margin: 0 auto;
  `;

  const result = document.createElement('div');
  result.classList.add('status');

  formsElements.forEach(item => {
    bindPostData(item);
    item.style.height = parseInt(getComputedStyle(item).height, 10) + loadingImgHeightNumber + 'px';
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {

      e.preventDefault();
      form.appendChild(alert);

      const formData = new FormData(form);

      for (let key in state) {
        formData.append(key, state[key]);
      }
      console.log(state);
      console.log(Object.fromEntries(formData));

      postDataJSON('http://localhost:3000/requests', JSON.stringify(Object.fromEntries(formData)))
        .then(() => {
          result.textContent = message.success;
        }).catch(() => {
          result.textContent = message.failure;
        }).finally(() => {
          form.reset();
          alert.remove();
          form.appendChild(result);
          setTimeout(() => {
            result.remove();
          }, 6000);
        });
    });
  }

};

const formsWithModal = (formSelector, anyModalSelector, replaceElementModalSelector, loadingImgPath, state = false) => {
  const formsElements = document.querySelectorAll(formSelector);

  const message = {
    loading: loadingImgPath,
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  formsElements.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {

      e.preventDefault();

      const alert = document.createElement('img');
      alert.src = message.loading;
      alert.style.cssText = `
      display: block;
      margin: 14px auto;
      `;

      const replaceElement = document.querySelector((openModalCurrent || anyModalSelector) + ' ' + replaceElementModalSelector);// jshint ignore:line
      replaceElement.style.display = 'none';
      replaceElement.insertAdjacentElement('beforebegin', alert);

      if (!openModalCurrent) {
        openModal(anyModalSelector);
      }

      const result = document.createElement('div');
      result.style.margin = '14px 0';

      const formData = new FormData(form);

      for (let key in state) {
        formData.append(key, state[key]);
      }

      const json = JSON.stringify(Object.fromEntries(formData));

      postDataJSON('http://localhost:3000/requests', json)
        .then(() => {
          result.textContent = message.success;
        }).catch(() => {
          result.textContent = message.failure;
        }).finally(() => {
          form.reset();
          alert.remove();
          replaceElement.insertAdjacentElement('beforebegin', result);

          const closeThanksModal = setTimeout(() => {
            setTimeout(() => {
              result.remove();
              replaceElement.removeAttribute("style");
            }, 1550);
            closeModal(openModalCurrent);
            clearInterval(checkIfAlreadyClosed);
          }, 4000);

          const checkIfAlreadyClosed = setInterval(() => {
            if (!openModalCurrent) {
              setTimeout(() => {
                result.remove();
                replaceElement.removeAttribute("style");
              }, 1550);
              clearInterval(checkIfAlreadyClosed);
              clearInterval(closeThanksModal);
            }
          }, 4);
        });
    });
  }

};

export default formsWithoutModal;
export { formsWithoutModal, formsWithModal };