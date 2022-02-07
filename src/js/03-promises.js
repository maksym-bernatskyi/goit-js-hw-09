import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submit: document.querySelector('button[type="submit"]')
}

refs.submit.addEventListener('click', onClickSubmitButton);

function onClickSubmitButton(evt) {
  evt.preventDefault();

  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  
  for (let i = 1; i < amount; i += 1) {
    if (i > 1) {
      delay += step;
    }
  
    createPromise(i, delay)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${refs.delay.value}ms`);
    })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${refs.delay.value}ms`);
    });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}