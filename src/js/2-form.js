const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  try {
    formData = JSON.parse(savedData);

    if (formData.email) {
      form.elements.email.value = formData.email;
    }

    if (formData.message) {
      form.elements.message.value = formData.message;
    }
  } catch (e) {
    console.error('Error parsing saved form data', e);
  }
}
