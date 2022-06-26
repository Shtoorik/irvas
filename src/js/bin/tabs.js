// tabs('.glazing_block', '.glazing_content', 'activeContent', 'active', 'a');
// tabs('.decoration_item', '.decoration_content_card', 'activeContent', 'after_click', 'div');

// function tabsButtons(tabsSelector, tabsContentSelector, tabsContentActiveClass, tabsActiveClass, tabsClickTag) {
//   const tabsButtons = document.querySelectorAll(tabsSelector);
//   const tabsContent = document.querySelectorAll(tabsContentSelector);
//   // console.log(tabsButtons);
//   let prev = 0;
//   tabsButtons.forEach((item, i) => {
//     item.addEventListener('click', (e) => {
//       if (e.target === item || e.currentTarget == tabsButtons[prev]) {
//         return;
//       }
//       tabsContent[prev].classList.remove(tabsContentActiveClass, 'fadeIn', 'show');
//       tabsContent[i].classList.add(tabsContentActiveClass, 'fadeIn', 'show');
//       tabsButtons[prev].querySelector(tabsClickTag).classList.remove(tabsActiveClass);
//       tabsButtons[i].querySelector(tabsClickTag).classList.add(tabsActiveClass);
//       prev = i;
//     });
//   });
// }
// export default tabsButtons;