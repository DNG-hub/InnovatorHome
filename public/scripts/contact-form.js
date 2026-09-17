// Turnstile calls these globally once it finishes verifying (or a token expires/errors).
// The submit button stays disabled until a verified token actually exists.
window.avantiTurnstileReady = function () {
  document.querySelectorAll('[data-turnstile-gate]').forEach((btn) => { btn.disabled = false; });
};
window.avantiTurnstileExpired = function () {
  document.querySelectorAll('[data-turnstile-gate]').forEach((btn) => { btn.disabled = true; });
};

// If the Turnstile script itself fails to load (network/ad-blocker), don't leave the
// button disabled forever with no explanation — let the submit go through and the
// server will reject it with a clear "please try again" message instead.
const turnstileScript = document.getElementById('turnstile-script');
if (turnstileScript) {
  turnstileScript.addEventListener('error', () => {
    document.querySelectorAll('[data-turnstile-gate]').forEach((btn) => { btn.disabled = false; });
  });
}

// Bind each contact form once, including when this shared script appears twice.
document.querySelectorAll('form[data-contact-form]').forEach((form) => {
  if (form.dataset.ready) return;
  form.dataset.ready = 'true';
  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton.textContent;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;
    if (!form.reportValidity()) return;
    submitButton.disabled = true;
    submitButton.textContent = form.dataset.sending;
    status.hidden = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        form.reset();
        status.textContent = form.dataset.success;
        status.className = 'form-status form-status-ok';
      } else {
        status.textContent = data.error?.startsWith('turnstile_') ? form.dataset.errorTurnstile
          : data.error === 'rate_limited' ? form.dataset.errorRate
          : data.error === 'validation' ? form.dataset.errorValidation
          : form.dataset.errorGeneric;
        status.className = 'form-status form-status-error';
      }
    } catch {
      status.textContent = form.dataset.errorGeneric;
      status.className = 'form-status form-status-error';
    } finally {
      submitButton.textContent = submitLabel;
      status.hidden = false;
      // Each Turnstile token is single-use. Reset now; the button stays disabled
      // until avantiTurnstileReady fires again with a fresh token.
      if (window.turnstile) window.turnstile.reset();
    }
  });
});
