import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const THROTTLE_TIME = 500;

FeedbackForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, THROTTLE_TIME));

function onFormSubmit(e) {
  e.preventDefault();
  const { email, message } = e.target.elements;
  if (email.value && message.value !== '') {
    console.log({ email: email.value, message: message.value });
    e.target.reset();
    localStorage.removeItem(FEEDBACK_KEY);
  } else {
    alert('enter the data');
  }
}

function onInputData(e) {
  let data = localStorage.getItem(FEEDBACK_KEY);
  data = data ? JSON.parse(data) : {};
  let { email, message } = form.elements;
  data = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
}

function FeedbackForm() {
  let data = localStorage.getItem(FEEDBACK_KEY);
  if (data) {
    data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
      form.elements[name].value = value ?? '';
    });
  }
}
