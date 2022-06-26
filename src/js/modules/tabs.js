const tabs = (headerSelector, tabSelector, contentSelector, tabActiveClasses, contentActiveClasses, firstActiveTabNumber) => { // jshint ignore:line

  //обертка, кнопка с детьми (не потомками) на которую надо нажимать, вкладки с контентом, класс активности для таба
  // (для контента можно сделать), а также первый открытый таб, если не указан то ничего не открыто

  const header = document.querySelector(headerSelector),
    tabsButtons = document.querySelectorAll(tabSelector),
    contents = document.querySelectorAll(contentSelector);

  let previousTab = -1;

  contentActiveClasses = contentActiveClasses.split(' ');
  tabActiveClasses = tabActiveClasses.split(' ');

  function showTabContent(i) {
    contents[i].classList.add(...contentActiveClasses);
    tabsButtons[i].classList.add(...tabActiveClasses);

    previousTab = i;
  }
  function hidePrevTabContent() {
    contents[previousTab].classList.remove(...contentActiveClasses);
    tabsButtons[previousTab].classList.remove(...tabActiveClasses);
  }

  header.addEventListener('click', (e) => {
    const target = e.target;
    if (previousTab == -1 && target && target.closest(tabSelector)) {
      showTabContent(Array.prototype.indexOf.call(tabsButtons, target.closest(tabSelector)));
    } else if (target && target.closest(tabSelector) && target.closest(tabSelector) != tabsButtons[previousTab]) {
      hidePrevTabContent();
      showTabContent(Array.prototype.indexOf.call(tabsButtons, target.closest(tabSelector)));
    }
  });

  if (firstActiveTabNumber != undefined) {
    showTabContent(firstActiveTabNumber);
  }
};

export default tabs;





























