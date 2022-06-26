function setTextMonth(dateFieldSelector, deadlineString) {
  const deadline = new Date(deadlineString);

  const dateFiledHumanReadable = document.querySelector(dateFieldSelector);
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  dateFiledHumanReadable.textContent = deadline.getDate() + ' ' + monthNames[deadline.getMonth()];
}

function setTimer({
  deadlineString,
  timerSelector,
  daysFieldSelector,
  hoursFieldSelector,
  minutesFieldSelector,
  secondsFieldSelector,
  timerSectionSelector = false
}) {

  const deadline = new Date(deadlineString);

  const timer = document.querySelector(timerSelector);
  const daysField = timer.querySelector(daysFieldSelector);
  const hoursField = timer.querySelector(hoursFieldSelector);
  const minutesField = timer.querySelector(minutesFieldSelector);
  const secondsField = timer.querySelector(secondsFieldSelector);
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    let seconds = Math.floor((deadline - new Date()) / 1000);

    let ss = '0' + (seconds % 60);
    seconds = (seconds - ss) / 60;
    let mm = '0' + seconds % 60;
    seconds = (seconds - mm) / 60;
    let hh = '0' + seconds % 24;
    seconds = (seconds - hh) / 24;
    let dd = seconds;

    daysField.textContent = (dd.toString().length < 2) ? '0' + dd : dd;
    hoursField.textContent = hh.slice(-2);
    minutesField.textContent = mm.slice(-2);
    secondsField.textContent = ss.slice(-2);

    if (isNaN(seconds)) {
      clearInterval(timeInterval);

      daysField.textContent = '00';
      hoursField.textContent = '00';
      minutesField.textContent = '00';
      secondsField.textContent = '00';

      if (timerSectionSelector) {
        const timerSection = document.querySelector(timerSectionSelector);
        timerSection.classList.add('fadeOut', 'show_block');

        setTimeout(() => {
          document.body.removeChild(timerSection);
        }, 1500);
      }
    }
  }
}

export default setTimer;
export { setTimer, setTextMonth };