import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

FeedbackForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

function onFormSubmit(e) {
  e.preventDefault();
  const { email, message } = e.target.elements;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(FEEDBACK_KEY);
  e.target.reset();
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
