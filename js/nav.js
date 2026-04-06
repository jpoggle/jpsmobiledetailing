/* ==========================================================================
   Navigation + Background Canvas Injector
   JP's Mobile Detailing LLC
   ========================================================================== */
(function () {

  /* ── Animated Background Canvas ──────────── */
  const bgHTML = `
    <div id="bg-canvas" aria-hidden="true">
      <div class="bg-blob" id="blob-1"></div>
      <div class="bg-blob" id="blob-2"></div>
      <div class="bg-blob" id="blob-3"></div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', bgHTML);

  /* ── Navigation HTML ─────────────────────── */
  const navHTML = `
    <nav class="glass-nav" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">

        <a href="index.html" class="nav-brand" aria-label="JP's Mobile Detailing — Home">
          <img
            src="Detaling%20photos/about%20page%20photos/Logo%20JP's%20Mobile%20Detailing%20IMPORTANT.jpg"
            alt="JP's Mobile Detailing LLC"
            class="nav-logo"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"
          />
          <span class="nav-brand-text" style="display:none;">JP's<span class="brand-dot">.</span></span>
        </a>

        <ul class="nav-links" id="navLinks" role="list">
          <li><a href="index.html"    data-page="index">Home</a></li>
          <li><a href="services.html" data-page="services">Services</a></li>
          <li><a href="gallery.html"  data-page="gallery">Gallery</a></li>
          <li><a href="about.html"    data-page="about">About</a></li>
          <li><a href="contact.html"  data-page="contact">Contact</a></li>
        </ul>

        <a href="booking.html" class="btn-glow" id="navQuoteBtn" role="button">
          Book Now
        </a>

        <button class="nav-toggle" id="navToggle"
          aria-label="Toggle navigation" aria-expanded="false" aria-controls="navMobile">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile dropdown -->
      <div class="nav-mobile" id="navMobile" role="menu">
        <a href="index.html"    data-page="index"    role="menuitem">Home</a>
        <a href="services.html" data-page="services"  role="menuitem">Services</a>
        <a href="gallery.html"  data-page="gallery"   role="menuitem">Gallery</a>
        <a href="about.html"    data-page="about"     role="menuitem">About</a>
        <a href="contact.html"  data-page="contact"   role="menuitem">Contact</a>
        <a href="booking.html"  data-page="booking"   role="menuitem">Book Now</a>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ── Active Link ─────────────────────────── */
  const page = document.body.dataset.page || 'index';
  document.querySelectorAll(`[data-page="${page}"]`).forEach(el => el.classList.add('active'));

  /* ── Mobile Toggle ───────────────────────── */
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');

  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.glass-nav')) {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });

  /* ── Quote Modal Trigger (in-page buttons only) ─────── */
  function openQuoteModal() { window.openModal && window.openModal(); }

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-open-quote]') || e.target.closest('[data-open-quote]')) {
      e.preventDefault();
      openQuoteModal();
    }
  });

})();
