const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
};

disableButtonStop();
let timerId = null;

refs.buttonStart.addEventListener('click', onButtonStartClick);
refs.buttonStop.addEventListener('click', onButtonStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disableButtonStart() {
    refs.buttonStart.setAttribute('disabled', 'disabled');
}

function disableButtonStop() {
    refs.buttonStop.setAttribute('disabled', 'disabled');
}

function onButtonStartClick() {
    disableButtonStart();
    refs.buttonStop.removeAttribute('disabled');
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onButtonStopClick() {
    disableButtonStop();
    refs.buttonStart.removeAttribute('disabled');
    clearInterval(timerId);
}