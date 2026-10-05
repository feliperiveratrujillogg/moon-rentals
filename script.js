// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Item checkboxes enable their qty field
document.querySelectorAll('[data-item]').forEach(cb => {
  const qty = cb.closest('.item-row').querySelector('.qty');
  cb.addEventListener('change', () => {
    qty.disabled = !cb.checked;
    if (cb.checked) { qty.value = qty.value || 1; qty.focus(); } else { qty.value = ''; }
  });
});

// Date min = today
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];

// Form submit (AJAX to Formspree so the user stays on the page)
const form = document.getElementById('inquiryForm');
const msg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = 'form-msg';
  msg.textContent = '';

  // Validate required fields
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    const bad = !el.value || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
    el.classList.toggle('invalid', bad);
    if (bad) valid = false;
  });
  const items = form.querySelector('.items');
  const anyItem = [...form.querySelectorAll('[data-item]')].some(cb => cb.checked);
  items.classList.toggle('invalid', !anyItem);
  if (!anyItem) valid = false;

  if (!valid) {
    msg.className = 'form-msg err';
    msg.textContent = 'Please fill in the required fields and pick at least one item.';
    form.querySelector('.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const data = new FormData(form);
    // Drop empty qty fields so the email stays clean
    [...data.keys()].forEach(k => { if (k.includes('(qty)') && !data.get(k)) data.delete(k); });
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    form.querySelectorAll('.qty').forEach(q => { q.disabled = true; });
    msg.className = 'form-msg ok';
    msg.textContent = "Request sent! We'll get back to you shortly with availability and pricing.";
  } catch (err) {
    msg.className = 'form-msg err';
    msg.textContent = 'Something went wrong. Please call or text us at (912) 477-6959.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Request';
  }
});
