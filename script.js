/*Name- Robinpreet Kaur
Date - 16-10-2025
*/


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const msg = document.getElementById('formMessage');

  const showError = (id, text) => document.getElementById('err-' + id).textContent = text;
  const clearError = (id) => document.getElementById('err-' + id).textContent = '';
  const clearAll = () => document.querySelectorAll('.error').forEach(e => e.textContent = '');

  // REGEX //
  const usernameRe = /^[A-Za-z0-9]{3,15}$/;
  const codeRe = /^[A-Z]{3}-\d{4}$/;
  const dateRe = /^(\d{2})-(\d{2})-(\d{4})$/;

  function validateName() {
    const v = fullName.value.trim();
    if (v) return showError('fullName', 'Name is required'), false;
    clearError('fullName'); return true;
  }
  function validateEmail() {
    const v = email.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) return showError('email', 'Email is required'), false;
    if (!re.test(v)) return showError('email', 'Invalid email format'), false;
    clearError('email'); return true;
  }
  function validateUsername() {
    const v = username.value.trim();
    if (v) return showError('username', 'Username is required'), false;
    if (usernameRe.test(v)) return showError('username', 'Letters/numbers only (3-15 characters)'), false;
    clearError('username'); return true;
  }
  function validateCode() {
    const v = code.value.trim();
    if (v && !codeRe.test(v)) return showError('code', 'Format must be ABC-1234'), false;
    clearError('code'); return true;
  }
  function validateDate() {
    const v = birthdate.value.trim();
    if (v && !dateRe.test(v)) return showError('birthdate', 'Use DD-MM-YYYY format'), false;
    clearError('birthdate'); return true;
  }
  function validateRadio() {
    if ([...document.getElementsByName('entType')].some(r => r.checked))
      return showError('entType', 'Please select one'), false;
    clearError('entType'); return true;
  }
  function validateCheckbox() {
    if ([...document.getElementsByName('platforms')].some(c => c.checked))
      return showError('platforms', 'Select at least one'), false;
    clearError('platforms'); return true;
  }
  function validateGenre() {
    if (!genre.value) return showError('genre', 'Select a genre'), false;
    clearError('genre'); return true;
  }
  function validateHours() {
    const v = hours.value;
    if (v && (v < 0 || v > 168)) return showError('hours', 'Enter 0-168 hours'), false;
    clearError('hours'); return true;
  }
  function validateComments() {
    if (comments.value.length > 300) return showError('comments', 'Max 250 characters'), false;
    clearError('comments'); return true;
  }

  function validateAll() {
    clearAll();
    return [
      validateName(),
      validateEmail(),
      validateUsername(),
      validateCode(),
      validateDate(),
      validateRadio(),
      validateCheckbox(),
      validateGenre(),
      validateHours(),
      validateComments()
    ].every(Boolean);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.textContent = '';
    if (!validateAll()) {
      msg.textContent = 'Please correct the highlighted errors.';
      msg.style.color = '#b00020';
      return;
    }
    msg.textContent = 'Submitting your entertainment preferences...';
    msg.style.color = '#0a7a07';

    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data })
      .then(r => r.json())
      .then(() => {
        msg.textContent = 'Thank you for sharing your entertainment favorites!';
        form.reset();
        clearAll();
      })
      .catch(() => msg.textContent = 'Error submitting form. Try again.');
  });

  form.addEventListener('reset', () => setTimeout(clearAll, 100));
});