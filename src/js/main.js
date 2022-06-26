import WOW from 'wowjs';
import Inputmask from "inputmask";
import './slider';
import tabs from './modules/tabs';
import checkNumInputs from './modules/checkNumInputs';
import imageZoom from './modules/imageZoom';
import { formsWithModal, formsWithoutModal } from './modules/forms';
import { bindActionToElements, setState } from './modules/changeModalState';
import { bindModal, showModalByTime, showModalByScroll, setStateForModals } from './modules/modal';
import { setTimer, setTextMonth } from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {

  new WOW.WOW({ live: false }).init();

  const modalState = {};

  Inputmask('+7 (999) 999-99-99').mask(document.querySelectorAll('input[type="tel"]'));

  formsWithoutModal('.main_form', 'assets/img/spinner.svg', 38, modalState);
  formsWithModal('.popup_form .form', '.popup', '.popup_form', 'assets/img/spinner.svg', modalState);

  imageZoom('.works', 'preview', 'zoom', 'zoom_img', 'href');

  checkNumInputs('#width');
  checkNumInputs('#height');

  showModalByTime('.popup', 60000, 'cancelBySuchModal');
  showModalByScroll('.popup', 'cancelByAnyModal');

  tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active', 'fadeIn show_block', 0);
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click', 'fadeIn show_block', 0);
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'fadeIn show_inline', 0);

  setTextMonth('.sale_subtitle > span', '2022-09-01T00:00:00');

  setState(modalState);

  bindActionToElements('click', '.balcon_icons_img', 'form');
  bindActionToElements('input', '#height', 'height');
  bindActionToElements('input', '#width', 'width');
  bindActionToElements('change', '#view_type', 'type');
  bindActionToElements('change', '.checkbox', 'profile');

  setTimer({
    deadlineString: '2022-09-01T00:00:00',
    timerSelector: '.timer1',
    daysFieldSelector: '.days',
    hoursFieldSelector: '.hours',
    minutesFieldSelector: '.minutes',
    secondsFieldSelector: '.seconds',
    timerSectionSelector: '.sale'
  });

  setStateForModals(modalState); //обязательно если работаем со state

  bindModal({
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close', //формы увеличиваю отдельно
  });

  bindModal({
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close',
  });

  bindModal({
    modalSelector: '.popup_calc',
    triggerSelector: '.popup_calc_btn',
    closeSelector: '.popup_calc_close',
    modalContentSelectorForIncrease: '.popup_calc_content',
    modalContentSelectorForAppend: '.popup_calc_content',
    requiredProperties: {
      width: "Пожалуйста, введите ширину",
      height: "Пожалуйста, введите высоту", // для requiredProperties нужен обязательно один из селекторов контента
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
    modalContentSelectorForAppend: '.popup_calc_profile_content',
    requiredProperties: {
      profile: "Пожалуйста, выберите профиль",
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
  });
});