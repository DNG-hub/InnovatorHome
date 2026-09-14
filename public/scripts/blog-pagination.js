// Bind each control once, including when this shared script appears twice.
document.querySelectorAll('form[data-blog-pagination]').forEach((form) => {
  if (form.dataset.ready) return;
  form.dataset.ready = 'true';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[name="page"]');
    if (!input || !form.reportValidity()) return;
    const page = input.valueAsNumber;
    if (!Number.isInteger(page) || page < 1 || page > Number(input.max)) return;
    const base = form.dataset.base;
    window.location.assign((page === 1 ? base : `${base}page/${page}/`) + '#blog-pages-top');
  });
  form.hidden = false;
});
