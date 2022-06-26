const modals = (state) => {

  // bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  // bindModal('.phone_link', '.popup', '.popup .popup_close');
  // bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', undefined);//1 кнопка на 1 модальное окно
  // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, '.popup_calc_content', { type: 'tabs', classActive: 'ActiveClass', prop: 'form', class: 'class' },'height',{type:'select', prop:'aaa'});//1 кнопка на 2 модальное окно
  // bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, '.popup_calc_profile_content'); //1 кнопка на 3 модальное окно
  bindModal({
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close',
    modalContentSelectorForIncrease: '.form',
    increaseHeightNum: 38
  });
  bindModal({
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close',
    modalContentSelectorForIncrease: '.form',
    increaseHeightNum: 38
  });
  // bindModal({
  //   triggerSelector: '.popup_calc_btn',
  //   modalSelector: '.popup_calc',
  //   closeSelector: '.popup_calc_close',
  //   modalContentSelectorForIncrease: '.popup_calc_content',

  // });
  bindModal({
    modalSelector: '.popup_calc',
    triggerSelector: '.popup_calc_btn',
    closeSelector: '.popup_calc_close',
    modalContentSelectorForIncrease: '.popup_calc_content',
    requiredProperties: {
      width: "Пожалуйста, введите ширину",
      height: "Пожалуйста, введите высоту",//requiredProperties нужен обязательно modalContentSelectorForIncrease
      modalContentSelectorForAppend: '.popup_calc_content'
    },
    defaultProperties: {
      form: {
        type: 'tabs',
        tabSelector: '.balcon_icons_img',
        tabActiveSelector: '.do_image_more'
      }
    },
    clearFields: {
      inputs: '#width #height'
    }
  });
  bindModal({
    modalSelector: '.popup_calc_profile',
    triggerSelector: '.popup_calc_button',
    closeSelector: '.popup_calc_profile_close',
    closeClickOverlay: false,
    modalContentSelectorForIncrease: '.popup_calc_profile_content',
    requiredProperties: {
      profile: "Пожалуйста, выберите профиль",
      modalContentSelectorForAppend: '.popup_calc_profile_content'
    },
    defaultProperties: {
      type: {
        type: 'list',
        listSelector: '#view_type'
      }
    },
    clearFields: {
      lists: '#view_type',
      checkboxes: '.checkbox'
    }
  });
  bindModal({
    modalSelector: '.popup_calc_end',
    triggerSelector: '.popup_calc_profile_button',
    closeSelector: '.popup_calc_end_close',
    closeClickOverlay: false,
    modalContentSelectorForIncrease: '.form',
    increaseHeightNum: 38,
  });
  // bindModal({
  //   triggerSelector: '.popup_calc_button',
  //   modalSelector: '.popup_calc_profile',
  //   closeSelector: '.popup_calc_profile_close',
  //   closeClickOverlay: false,
  //   modalContentSelectorForIncrease: '.popup_calc_profile_content',
  //   // modalContentSelectorForIncrease:'.popup_calc_content',
  //   // properties: ['1', {}]
  //   requiredPropertiesForOpen: {
  //     width: "Пожалуйста, введите ширину",
  //     height: "Пожалуйста, введите высоту"
  //   }
  // bindModal({
  //   triggerSelector: '.popup_calc_button',
  //   modalSelector: '.popup_calc_profile',
  //   closeSelector: '.popup_calc_profile_close',
  //   closeClickOverlay: false,
  //   modalContentSelectorForIncrease: '.popup_calc_profile_content',
  //   // modalContentSelectorForIncrease:'.popup_calc_content',
  //   // properties: ['1', {}]
  //   requiredPropertiesForOpen: {
  //     width: "Пожалуйста, введите ширину",
  //     height: "Пожалуйста, введите высоту"
  //   }

  // });
  // bindModal({
  //   modalSelector: '.popup_calc_end',
  //   triggerSelector: '.popup_calc_profile_button',
  //   closeSelector: '.popup_calc_end_close',
  //   closeClickOverlay: false,
  //   modalContentSelectorForIncrease: '.form',
  //   increaseHeightNum: 38,
  //   // modalContentSelectorForIncrease: '.popup_calc_profile_content',
  //   requiredPropertiesForOpen: {
  //     profile: "Пожалуйста, выберите профиль"
  //   }
  // });
  // showModalByTime('.popup', 60000, 'cancelByAnyModal');
  // showModalByScroll('.popup', 'cancelByAnyModal');
  // 1) Cancel if such a window was called cancelBySuchModal
  // 2) Cancel if any window was called cancelByAnyModal
  // 3) Не отменять в любом случае doNotCancel (по умолчанию)

  let autoOpenData, scrollOpenData, openModalCurrent, modalBunch, activeInterval;

  let previousRequiredProperties;
  //previousModalContentSelectorForIncrease;

  function openModal(modalSelector, isAnimate = true) {

    openModalCurrent = modalSelector;

    if (autoOpenData) {
      switch (autoOpenData.mode) {
        case 'cancelByAnyModal':
          clearTimeout(autoOpenData.timeOut);
          autoOpenData = null;
          break;

        case 'cancelBySuchModal':
          if (autoOpenData.modalSelector == modalSelector) {
            clearTimeout(autoOpenData.timeOut);
            autoOpenData = null;
          }
          break;
      }
    }

    if (scrollOpenData) {
      switch (scrollOpenData.mode) {
        case 'cancelByAnyModal':
          scrollOpenData = null;
          break;

        case 'cancelBySuchModal':
          if (scrollOpenData.modalSelector == modalSelector) {
            scrollOpenData = null;
          }
          break;
      }
    }

    const modal = document.querySelector(modalSelector);

    if (isAnimate) {
      modal.classList.add('fadeIn', 'show_block');
    } else {
      modal.classList.add('show');
    }

    document.documentElement.style.overflow = 'hidden';
  }

  function closeModal(modalSelector, endBunch = true) {
    openModalCurrent = 0;
    const modal = document.querySelector(modalSelector);
    if (endBunch) {
      if (modalBunch) {
        toggleModalAnimation(modalSelector);
      }
      modalBunch = false;
    }
    if (modal.classList.contains('show_block')) {
      modal.classList.add('fadeOut');
      modal.classList.remove('fadeIn');

      setTimeout(() => {
        modal.classList.remove('fadeOut', 'show_block');
        document.documentElement.style.overflow = 'overlay';
      }, 1500);
    } else {
      modal.classList.remove('show');
      document.documentElement.style.overflow = 'overlay';
    }

  }

  function toggleModalAnimation(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('show');
    modal.classList.toggle('fadeIn');
    modal.classList.toggle('show_block');
  }

  function showModalByTime(modalSelector, time, option) {

    autoOpenData = {
      mode: option || 'doNotCancel'
    };

    if (option == 'cancelBySuchModal') {
      autoOpenData.modalSelector = modalSelector;
    }

    autoOpenData.timeOut = setTimeout(function () {
      if (document.documentElement.style.overflow == 'hidden') {
        //!!!!!!!!!!!!!!!!
        let delayModal = setInterval(() => {
          if (document.documentElement.style.overflow != 'hidden') {
            openModal(modalSelector);
            autoOpenData = null;
            clearInterval(delayModal);
          }
        }, 1700);

      } else {
        openModal(modalSelector);
        autoOpenData = null;
      }
    }, time);
  }

  function showModalByScroll(modalSelector, option) {

    scrollOpenData = {
      mode: option || 'doNotCancel'
    };

    if (option == 'cancelBySuchModal') {
      scrollOpenData.modalSelector = modalSelector;
    }

    window.addEventListener('scroll', function _scrollListener() {

      if (!scrollOpenData) {
        window.removeEventListener("scroll", _scrollListener);
      }

      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal(modalSelector);
        scrollOpenData = null;
      }

    });
  }

  function showValidationMessage(modalContentSelector, validationAlert, property) {

    const message = document.createElement('div');
    message.classList.add('status');
    message.textContent = validationAlert;

    document.querySelector(modalContentSelector).appendChild(message);
    console.log(document.querySelector(modalContentSelector));
    activeInterval = true;
    let validationCheck = setInterval(() => {
      if (state[property] && state[property] != '') {
        console.log(state[property]);
        message.remove();
        activeInterval = false;
        clearInterval(validationCheck);
      }
    }, 250);

  }

  function openNextModalInBunch(modalSelector) {
    if (!modalBunch) {
      toggleModalAnimation(openModalCurrent);
      modalBunch = true;
    }
    closeModal(openModalCurrent, false);
    openModal(modalSelector, false);
  }

  function initializeProperties(objectProperties) {


    for (const [key, value] of Object.entries(objectProperties)) {
      if (typeof (value) === 'object') {
        switch (value.type) {
          case 'tabs':
            const tabActive = document.querySelector(value.tabSelector + value.tabActiveSelector);
            state[key] = Array.prototype.indexOf.call(document.querySelectorAll(value.tabSelector), tabActive);
            break;

          case 'list':
            const select = document.querySelector(value.listSelector);
            state[key] = select.options[select.selectedIndex].value;
            break;
        }
      } else {
        state[key] = value;
      }
    }

  }

  function clearInterface(objectFields) {
    for (const [key, value] of Object.entries(objectFields)) {

      value.split(' ').forEach(item => {
        switch (key) {
          case 'inputs':
            document.querySelector(item).value = '';
            break;
          case 'lists':
            document.querySelector(item).querySelectorAll('option')[0].selected = 'selected';
            break;
          case 'checkboxes':
            document.querySelectorAll(item).forEach((box) => {
              box.checked = false;
            });
            break;
        }
      });
    }
  }

  function bindModal({
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
    modalContentSelectorForIncrease=false,
    increaseHeightNum = 20,
    requiredProperties=false,
    defaultProperties=false,
    clearFields=false
  }) {
    // console.log(properties);

    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector);

    if (modalContentSelectorForIncrease) {
      // console.log(modalSelector + modalContentSelectorForIncrease);
      const item = document.querySelector(modalSelector + ' ' + modalContentSelectorForIncrease);
      item.style.height = parseInt(getComputedStyle(item).height, 10) + increaseHeightNum + 'px';
    }

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (openModalCurrent && previousRequiredProperties) {
          let validationPassed = true;
          for (const item in previousRequiredProperties) {
            if (item != 'modalContentSelectorForAppend' && (!(item in state) || state[item] == '')) {
              if (!activeInterval) {
                showValidationMessage(previousRequiredProperties.modalContentSelectorForAppend, previousRequiredProperties[item], item);
              }
              validationPassed = false;
              break;
            }
          }


          if (validationPassed) {
            openNextModalInBunch(modalSelector);
            previousRequiredProperties = requiredProperties;
            if (defaultProperties) {
              initializeProperties(defaultProperties);
            }
            if (clearFields) {
              clearInterface(clearFields);
            }
            // previousModalContentSelectorForIncrease = modalContentSelectorForIncrease;
          }
          console.log(validationPassed);
        } else if (openModalCurrent) {
          openNextModalInBunch(modalSelector);
          previousRequiredProperties = requiredProperties;
          if (defaultProperties) {
            initializeProperties(defaultProperties);
          }
          if (clearFields) {
            clearInterface(clearFields);
          }

          // previousModalContentSelectorForIncrease = modalContentSelectorForIncrease;
        } else {
          openModal(modalSelector);
          previousRequiredProperties = requiredProperties;
          if (defaultProperties) {
            initializeProperties(defaultProperties);
          }
          if (clearFields) {
            clearInterface(clearFields); ////!!!!!!!!
          }

          // previousModalContentSelectorForIncrease = modalContentSelectorForIncrease;
        }



        /* if (openModalCurrent && requiredPropertiesForOpen) {
          let validationPassed = true;
          for (const item in requiredPropertiesForOpen) {
            if (!(item in state) || state[item] == '') {
              if (!activeInterval) {
                showValidationMessage(modalContentSelectorForIncrease, requiredPropertiesForOpen[item], item);
              }
              validationPassed = false;
              break;
            }
          }
          
          if (validationPassed) {
            openNextModalInBunch(modalSelector);
          }
          console.log(validationPassed);
        } else if (openModalCurrent) {
          openNextModalInBunch(modalSelector);
        } else {
          openModal(modalSelector);
        } */
        // if (openModalCurrent && item.hasAttribute('data-required')) {

        //   const required = item.getAttribute('data-required').split(' ');
        //   const requiredText = item.getAttribute('data-required-text').split('-');
        //   const validationNotPassed = required.some((item, i) => {
        //     if (!(item in state) || state[item] == '') {
        //       if (!activeInterval) {
        //         showValidationMessage(modalContentSelectorForIncrease, requiredText[i], item);
        //       }
        //       // console.log(required);
        //       // console.log(item);
        //       // console.log(i);
        //       return true;
        //     }
        //   });
        //   if (!validationNotPassed) {
        //     openNextModalInBunch(modalSelector);
        //   }
        //   console.log(validationNotPassed);
        // } else if (openModalCurrent) {
        //   openNextModalInBunch(modalSelector);
        // } else {
        //   openModal(modalSelector);
        // }

      });
    });


    close.addEventListener('click', () => {
      closeModal(modalSelector);
      for (var key in state) {
        delete state[key];
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeModal(modalSelector);
        for (var key in state) {
          delete state[key];
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show_block') && closeClickOverlay) {
        closeModal(modalSelector);
        for (var key in state) {
          delete state[key];
        }
      }
    });
  }

};














// modal('data-to', 'data-close-modal', 60000, '.popup');

// function openModal(modalSelector) {
//   if (autoOpenData) {
//     clearInterval(autoOpenData);
//   }

//   const modal = document.querySelector(modalSelector);
//   openModalNow = modalSelector;

//   modal.classList.add('fadeIn', 'show');
//   document.documentElement.style.overflow = 'hidden';
// }

// function closeModal() {
//   if (!openModalNow) {
//     return;
//   }
//   const modal = document.querySelector(openModalNow);
//   openModalNow = '';

//   modal.classList.add('fadeOut');
//   modal.classList.remove('fadeIn');

//   setTimeout(() => {
//     document.documentElement.style.overflow = 'overlay';
//     modal.classList.remove('fadeOut', 'show');
//   }, 1500);
// }

// let openModalNow, autoOpenData;

// function modal(openAttribute, closeAttribute, autoOpenMilSec, autoOpenModalSelector) {

//   // Кнопкам открытия назначается дата атрибут, который отвечает какое модальное окно должна открыть кнопка
//   // В значении дата атрибута - класс модального окна
//   // Кнопкам закрытия назначается дата атрибут без значения, который отвечает, что кнопка закрывает
//   // текущее модальное окно
//   // Код можно упростить если содержимое кнопки закрытие уникальное в модальном окне
//   // Например, крест в теге strong. В этом случае можно не назначать дата атрибуты
//   // кнопкам закрытия и не получать эти элементы, а просто проверить на совпадение уникальному классу
//   // Используются анимации animate.css

//   const openModalBtns = document.querySelectorAll(`[${openAttribute}]`);
//   const closeModalBtns = document.querySelectorAll(`[${closeAttribute}]`);

//   document.addEventListener('click', (e) => {
//     if (openModalNow && e.target == document.querySelector(openModalNow)) {
//       closeModal();
//     }
//   });

//   document.addEventListener('keydown', (e) => {
//     if (e.code === 'Escape' && openModalNow) {
//       closeModal();
//     }
//   });

//   closeModalBtns.forEach(item => {
//     item.addEventListener('click', () => {
//       closeModal();
//     });
//   });

//   openModalBtns.forEach(item => {
//     item.addEventListener('click', (e) => {
//       e.preventDefault();
//       openModal(item.getAttribute(openAttribute));
//     });
//   });

//   if (autoOpenMilSec) {
//     autoOpenData = setTimeout(() => {
//       openModal(autoOpenModalSelector);
//     }, autoOpenMilSec);
//   }
// }

// export default modal;
// export { openModalNow };
// export { closeModal, openModal };





// if (!item.hasAttribute('data-required')) {
//   if (openModalCurrent) {
//     if (!modalBunch) {
//       toggleModalAnimation(openModalCurrent);
//       modalBunch = true;
//     }
//     closeModal(openModalCurrent, false);
//     openModal(modalSelector, false);
//   } else {
//     openModal(modalSelector);
//   }
// }