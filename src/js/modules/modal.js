let autoOpenData, scrollOpenData;
let state, openModalCurrent, modalBunch, activeInterval;
let previousRequiredProperties, previousModalContentSelectorForAppend;

function setStateForModals(modalState) {
  state = modalState;
}

function bindModal({
  triggerSelector,
  modalSelector,
  closeSelector,
  closeClickOverlay = true,
  modalContentSelectorForIncrease = false,
  modalContentSelectorForAppend = false,
  increaseHeightNum = 20,
  requiredProperties = false,
  defaultProperties = false,
  clearFields = false
}) {

  const trigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    close = document.querySelector(closeSelector);

  if (modalContentSelectorForIncrease) {
    if (!modalContentSelectorForAppend && requiredProperties) {
      modalContentSelectorForAppend = modalContentSelectorForIncrease;
    }
    const item = document.querySelector(modalSelector + ' ' + modalContentSelectorForIncrease);
    item.style.height = parseInt(getComputedStyle(item).height, 10) + increaseHeightNum + 'px';
  }

  trigger.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault();
      }

      let goingToOpenModal = true;
      if (openModalCurrent && previousRequiredProperties) {
        for (const item in previousRequiredProperties) {
          if (!(item in state) || state[item] == '') {
            if (!activeInterval) {
              showValidationMessage(previousModalContentSelectorForAppend, previousRequiredProperties[item], item);
            }
            goingToOpenModal = false;
            break;
          }
        }

        if (goingToOpenModal) {
          openNextModalInBunch(modalSelector);
        }
        console.log(goingToOpenModal);
      } else if (openModalCurrent) {
        openNextModalInBunch(modalSelector);
      } else {
        openModal(modalSelector);
      }

      if (goingToOpenModal) {
        previousRequiredProperties = requiredProperties;
        previousModalContentSelectorForAppend = modalContentSelectorForAppend;
        if (defaultProperties) {
          initializeProperties(defaultProperties);
        }
        if (clearFields) {
          clearInterface(clearFields);
        }
      }
    });
  });

  close.addEventListener('click', () => {
    closeModal(modalSelector);
    if (state) {
      for (var key in state) {
        delete state[key];
      }
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal && closeClickOverlay) {
      closeModal(modalSelector);
      if (state) {
        for (var key in state) {
          delete state[key];
        }
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show_block') && closeClickOverlay) {
      closeModal(modalSelector);
      if (state) {
        for (var key in state) {
          delete state[key];
        }
      }
    }
  });
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

  if (endBunch) {
    if (modalBunch) {
      toggleModalAnimation(modalSelector);
    }
    modalBunch = false;
  }

  const modal = document.querySelector(modalSelector);

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

function showValidationMessage(modalContentSelector, validationAlert, property) {

  const message = document.createElement('div');
  message.classList.add('status');
  message.textContent = validationAlert;

  console.log(modalContentSelector);
  console.log(document.querySelector(modalContentSelector));
  document.querySelector(modalContentSelector).appendChild(message);
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

export default bindModal;
export { bindModal, showModalByTime, showModalByScroll, setStateForModals };
export { openModalCurrent, openModal, closeModal };
