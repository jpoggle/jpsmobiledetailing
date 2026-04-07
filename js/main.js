/* ==========================================================================
   JP's Mobile Detailing LLC — Main JavaScript
   Scroll reveal · Counters · FAQ accordion · Contact form
   ========================================================================== */

/* ── Scroll Reveal ────────────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── Animated Counters ────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  const suffix = el.dataset.suffix || '';
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const v = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(v * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.count));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

/* ── FAQ Accordion ────────────────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── EmailJS helpers ───────────────────────────────────────────────────
   modal.js (loaded first) sets EMAILJS_PUBLIC_KEY / SERVICE_ID / templates.
   ----------------------------------------------------------------------- */
function getEmailJSConfig() {
  return {
    publicKey:  typeof EMAILJS_PUBLIC_KEY   !== 'undefined' ? EMAILJS_PUBLIC_KEY   : null,
    serviceId:  typeof EMAILJS_SERVICE_ID   !== 'undefined' ? EMAILJS_SERVICE_ID   : null,
    templateId: typeof EMAILJS_QUOTE_TMPL   !== 'undefined' ? EMAILJS_QUOTE_TMPL   : null,
  };
}

function sendEmail(params, onDone) {
  const cfg = getEmailJSConfig();
  if (cfg.publicKey && cfg.publicKey !== 'YOUR_PUBLIC_KEY' && window.emailjs) {
    emailjs.send(cfg.serviceId, cfg.templateId, params)
      .then(() => onDone(true))
      .catch((err) => { console.error('EmailJS error:', err); onDone(false); });
  } else {
    console.log('EmailJS not configured — form data:', params);
    onDone(true);
  }
}

/* ── Contact Form ──────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const params = {
      from_name: (form.querySelector('[name="name"]')    || form.querySelector('#cName'))?.value    || '',
      phone:     (form.querySelector('[name="phone"]')   || form.querySelector('#cPhone'))?.value   || '',
      service:   (form.querySelector('[name="service"]') || form.querySelector('#cService'))?.value || '',
      notes:     (form.querySelector('[name="message"]') || form.querySelector('#cMessage'))?.value || '',
      vehicle: 'N/A', vehicle_type: 'N/A', condition: 'N/A', addons: 'N/A', city: 'N/A',
    };

    function onDone(success) {
      btn.textContent = success ? '✓ Message Sent!' : '✓ Sent!';
      btn.style.background = 'linear-gradient(135deg, #0d9e7a, #14c99a)';
      btn.style.animation  = 'none';
      setTimeout(() => {
        btn.textContent      = orig;
        btn.disabled         = false;
        btn.style.background = '';
        btn.style.animation  = '';
        form.reset();
      }, 4000);
    }

    sendEmail(params, onDone);
  });
}

/* ── Init ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initFAQ();
  initContactForm();
});
