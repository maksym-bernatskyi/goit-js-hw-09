import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]')
}

let selectedTime = 0;

disableButtonStart();
refs.buttonStart.addEventListener('click', onClickButtonStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return disableButtonStart();
    }
      refs.buttonStart.removeAttribute('disabled');
      selectedTime = selectedDates[0].getTime();
  },
};

flatpickr(refs.input, options);

function disableButtonStart() {
    refs.buttonStart.setAttribute('disabled', 'disabled');
}

function onClickButtonStart() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateClockFace(days, hours, minutes, seconds);

      if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) {
    clearInterval(intervalId);
  }
  }, 1000);
}

function updateClockFace(days, hours, minutes, seconds) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}