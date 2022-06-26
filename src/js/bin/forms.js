// import postDataJSON from "../services/services";

const forms = (formSelector, loadingImgPath, state) => {
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
          // for (var key in state) {
          //   delete state[key];
          // }
          form.reset();
          alert.remove();
          form.appendChild(result);
          setTimeout(() => {
            result.remove();
          }, 6000);
        });
    });
  }
  // import postData from "../services/services";
  // // import { closeModal, openModal, openModalNow } from "./modals";

  // const forms = (formSelector, firstModalInLayoutSelector, replaceElementInFirstModalInLayoutSelector) => {
  //   const formsElements = document.querySelectorAll(formSelector);

  //   const message = {
  //     loading: 'assets/img/spinner.svg',
  //     success: 'Спасибо! Скоро мы с вами свяжемся',
  //     failure: 'Что-то пошло не так...'
  //   };
  //   formsElements.forEach(item => {
  //     bindPostData(item);
  //   });

  //   function bindPostData(form) {
  //     form.addEventListener('submit', (e) => {
  //       /* if (!form.hasAttribute('data-valid')) {
  //         return;
  //       } */
  //       e.preventDefault();

  //       const alert = document.createElement('img');
  //       alert.src = message.loading;
  //       alert.style.cssText = `
  //         display: block;
  //         margin: 14px auto;
  //         `;

  //       const replaceElement = document.querySelector((openModalNow || firstModalInLayoutSelector) + ' ' + replaceElementInFirstModalInLayoutSelector);// jshint ignore:line
  //       replaceElement.style.display = 'none';
  //       replaceElement.insertAdjacentElement('beforebegin', alert);

  //       if (!openModalNow) {
  //         openModal(firstModalInLayoutSelector);
  //       }

  //       const result = document.createElement('div');
  //       result.style.margin = '14px 0';

  //       const json = JSON.stringify(Object.fromEntries(new FormData(form)));

  //       postData('http://localhost:3000/requests', json)
  //         .then(() => {
  //           result.textContent = message.success;
  //         }).catch(() => {
  //           result.textContent = message.failure;
  //         }).finally(() => {
  //           form.reset();
  //           alert.remove();
  //           replaceElement.insertAdjacentElement('beforebegin', result);

  //           const closeThanksModal = setTimeout(() => {
  //             setTimeout(() => {
  //               result.remove();
  //               replaceElement.removeAttribute("style");
  //             }, 1550);
  //             closeModal();
  //             clearInterval(checkIfAlreadyClosed);
  //           }, 4000);

  //           const checkIfAlreadyClosed = setInterval(() => {
  //             if (!openModalNow) {
  //               setTimeout(() => {
  //                 result.remove();
  //                 replaceElement.removeAttribute("style");
  //               }, 1550);
  //               clearInterval(checkIfAlreadyClosed);
  //               clearInterval(closeThanksModal);
  //             }
  //           }, 4);
  //         });
  //     });
  //   }
  // function showThanksModal(message) {
  //   const result = document.createElement('div');
  //   result.textContent = message;
  //   result.style.margin = '14px 0';
  //   console.log((openModalNow || firstModalInLayoutSelector) + replaceElementInFirstModalInLayoutSelector);
  //   replaceElement.style.display = 'none';
  //   replaceElement.insertAdjacentElement('beforebegin', result);
  //   console.log(replaceElement);
  //   if (!openModalNow) {
  //     openModal(firstModalInLayoutSelector);
  //   }
  //   const closeThanksModal = setTimeout(() => {
  //     closeModal(openModalNow);
  //     clearInterval(checkIfAlreadyClosed);
  //   }, 4000);
  //   const checkIfAlreadyClosed = setInterval(() => {
  //     if (!openModalNow) {
  //       setTimeout(() => {
  //         result.remove();
  //         replaceElement.removeAttribute("style");
  //       }, 1525);
  //       clearInterval(checkIfAlreadyClosed);
  //       clearInterval(closeThanksModal);
  //     }
  //   }, 10);
  //   setTimeout(() => {
  //     result.remove();
  //     replaceElement.removeAttribute("style");
  //   }, 5525);
  // }
};

// export default forms; //services