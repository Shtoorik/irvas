let state;

// функция работает как блокнот, можно записывать данные из разных связок окон, но по итогу
// будет все равно связка с одного окна, так как при закрытии очищаем
// в forms отправляем с дополнительными данными если они есть

function setState(modalState) {
  state = modalState;
}

function bindActionToElements(event, itemSelector, prop) {
  const elements = document.querySelectorAll(itemSelector); //может быть и один

  elements.forEach((item, i) => {
    item.addEventListener(event, () => {
      switch (item.nodeName) {
        case 'SPAN':
          state[prop] = i;
          break;

        case 'INPUT':
          if (item.getAttribute('type') === 'checkbox') {
            state[prop] = (i === 0) ? "Холодное" : "Теплое";

            elements.forEach((box, j) => {
              box.checked = false;
              if (i == j) {
                box.checked = true;
              }
            });
          } else {
            state[prop] = item.value;
          }
          break;

        case 'SELECT':
          state[prop] = item.value;
          break;
      }
    });
  });
}

export default bindActionToElements;
export { bindActionToElements, setState };