/* ==========================================================================
   "Get a Liquid Quote" -- Multi-Step Glass Modal
   JP's Mobile Detailing LLC -- Commerce Township, MI
   ==========================================================================

   EMAILJS SETUP (free, 200 emails/month):
   1. Sign up at https://www.emailjs.com
   2. Add a Gmail service -> copy the Service ID below.
   3. Create an email template. Use these template variables:
        {{from_name}}  {{phone}}  {{city}}
        {{service}}    {{addons}} {{vehicle}}
        {{vehicle_type}} {{condition}} {{notes}}
   4. Copy your Public Key from Account > API Keys.
   5. Replace the three placeholders below with your real values.
   ========================================================================== */
const EMAILJS_PUBLIC_KEY   = 'tvyTi4qQO8jcgerax';
const EMAILJS_SERVICE_ID   = 'service_hcxdjk5';
const EMAILJS_QUOTE_TMPL   = 'template_quote';
const EMAILJS_CONTACT_TMPL = 'template_quote';  // reuse same template until you create a separate contact one

/* Load EmailJS SDK dynamically -- no extra <script> tag needed */
(function loadEmailJS() {
  if (window.emailjs) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = () => {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  };
  document.head.appendChild(s);
})();

(function () {

  /* ── Modal HTML ──────────────────────────── */
  const modalHTML = `
  <div class="modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-panel" id="modalPanel">

      <!-- Modal header row: dots · step label · close -->
      <div class="modal-header">
        <div class="progress-dots" aria-hidden="true">
          <div class="progress-dot active" id="dot1"></div>
          <div class="progress-dot"        id="dot2"></div>
          <div class="progress-dot"        id="dot3"></div>
        </div>
        <span class="progress-label" id="progressLabel">Step 1 of 3</span>
        <button class="modal-close" id="modalClose" aria-label="Close quote form">✕</button>
      </div>

      <!-- ── STEP 1: Service Selection ─────── -->
      <div class="modal-step active" id="step1">
        <h3 id="modalTitle">What can we do for you?</h3>
        <p class="sub">Choose the service that fits — we'll build your custom quote.</p>

        <div class="service-options" role="group" aria-label="Select a service">

          <label class="service-option">
            <input type="radio" name="quoteService" value="Exterior Detail — $75+" />
            <div class="option-card">
              <span class="option-price">$75+</span>
              <span class="option-name">Exterior Detail</span>
            </div>
          </label>

          <label class="service-option">
            <input type="radio" name="quoteService" value="Interior Detail — $180+" />
            <div class="option-card">
              <span class="option-price">$180+</span>
              <span class="option-name">Interior Detail</span>
            </div>
          </label>

          <label class="service-option">
            <input type="radio" name="quoteService" value="Interior & Exterior — $250+" />
            <div class="option-card">
              <span class="option-price">$250+</span>
              <span class="option-name">Interior &amp; Exterior</span>
            </div>
          </label>

          <label class="service-option">
            <input type="radio" name="quoteService" value="Exterior + Hand Polish — $250+" />
            <div class="option-card">
              <span class="option-price">$250+</span>
              <span class="option-name">Exterior + Polish</span>
            </div>
          </label>

          <label class="service-option">
            <input type="radio" name="quoteService" value="Signature Package — $450+" />
            <div class="option-card">
              <span class="option-price">$450+</span>
              <span class="option-name">Signature Package</span>
            </div>
          </label>

          <label class="service-option">
            <input type="radio" name="quoteService" value="Ceramic Coating / Paint Correction — $800+" />
            <div class="option-card">
              <span class="option-price">$800+</span>
              <span class="option-name">Ceramic / Paint</span>
            </div>
          </label>

        </div>

        <div style="margin-bottom:var(--s-md);">
          <p style="font-size:0.78rem; color:var(--t-50); margin-bottom:8px;">Any add-ons? (optional)</p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-size:0.8rem; color:var(--t-70);">
              <input type="checkbox" name="addon" value="Headlight Restoration" style="accent-color:var(--cyan);" /> Headlight Restoration
            </label>
            <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-size:0.8rem; color:var(--t-70);">
              <input type="checkbox" name="addon" value="Pet Hair Removal" style="accent-color:var(--cyan);" /> Pet Hair Removal
            </label>
            <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-size:0.8rem; color:var(--t-70);">
              <input type="checkbox" name="addon" value="Trim Restoration" style="accent-color:var(--cyan);" /> Trim Restoration
            </label>
          </div>
        </div>

        <button class="btn-glow" style="width:100%;" id="step1Next">
          Next — Vehicle Info →
        </button>
        <p id="step1Error" style="color:#ff6b6b; font-size:0.8rem; margin-top:8px; display:none;">
          Please select a service to continue.
        </p>
      </div>

      <!-- ── STEP 2: Vehicle Info ───────────── -->
      <div class="modal-step" id="step2">
        <h3>Tell us about your vehicle</h3>
        <p class="sub">This helps us give you an accurate quote.</p>

        <div class="form-group">
          <label class="form-label" for="qVehicle">Year, Make &amp; Model</label>
          <input class="form-input" type="text" id="qVehicle" placeholder="e.g. 2022 Ford F-150" autocomplete="off" />
        </div>

        <div class="form-group">
          <label class="form-label">Vehicle Type</label>
          <div class="vehicle-type-group" role="group" aria-label="Select vehicle type">
            <button class="vehicle-type-btn" data-type="Sedan / Car" type="button">
              🚗 Sedan / Car
            </button>
            <button class="vehicle-type-btn" data-type="SUV (+$20–40)" type="button">
              🚙 SUV <span style="color:var(--cyan); font-size:0.72rem;">+$20–40</span>
            </button>
            <button class="vehicle-type-btn" data-type="Truck (+$30–50)" type="button">
              🛻 Truck <span style="color:var(--cyan); font-size:0.72rem;">+$30–50</span>
            </button>
            <button class="vehicle-type-btn" data-type="Van / Large" type="button">
              🚐 Van / Large
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="qCondition">Vehicle Condition</label>
          <select class="form-select" id="qCondition">
            <option value="">Select condition...</option>
            <option>Great — light cleaning needed</option>
            <option>Average — regular use, minor dirt</option>
            <option>Needs Work — heavy dirt, stains, or odors</option>
            <option>Neglected — significant buildup or damage</option>
          </select>
        </div>

        <div class="modal-nav">
          <button class="btn-glass" id="step2Back" type="button">← Back</button>
          <button class="btn-glow"  id="step2Next" type="button">Next — Contact →</button>
        </div>
        <p id="step2Error" style="color:#ff6b6b; font-size:0.8rem; margin-top:8px; display:none;">
          Please enter your vehicle and select a vehicle type.
        </p>
      </div>

      <!-- ── STEP 3: Contact Info ───────────── -->
      <div class="modal-step" id="step3">
        <h3>Almost there — how do we reach you?</h3>
        <p class="sub">JP personally reviews every quote request and responds within 2 hours.</p>

        <div class="form-group">
          <label class="form-label" for="qName">Your Name</label>
          <input class="form-input" type="text" id="qName" placeholder="First &amp; Last Name" autocomplete="name" />
        </div>

        <div class="form-group">
          <label class="form-label" for="qPhone">Phone Number</label>
          <input class="form-input" type="tel" id="qPhone" placeholder="(XXX) XXX-XXXX" autocomplete="tel" />
        </div>

        <div class="form-group">
          <label class="form-label" for="qCity">Your City</label>
          <input class="form-input" type="text" id="qCity" placeholder="e.g. Commerce Township, Walled Lake..." />
        </div>

        <div class="form-group">
          <label class="form-label" for="qNotes">Anything else? <span style="color:var(--t-50); font-weight:400; text-transform:none; letter-spacing:0;">(optional)</span></label>
          <textarea class="form-textarea" id="qNotes" style="min-height:80px;" placeholder="Preferred date, special requests, questions..."></textarea>
        </div>

        <!-- Requirements reminder -->
        <div style="background:rgba(0,150,199,0.07); border:1px solid rgba(0,180,216,0.18); border-radius:var(--r-md); padding:0.9rem 1rem; margin-bottom:var(--s-md); display:flex; gap:10px; align-items:flex-start;">
          <span style="font-size:1rem; flex-shrink:0;">💧</span>
          <p style="font-size:0.8rem; color:var(--t-50); line-height:1.6;">
            <strong style="color:var(--t-70);">Reminder:</strong> Access to a working water source and a standard power outlet is required at your service location.
          </p>
        </div>

        <div class="modal-nav">
          <button class="btn-glass" id="step3Back" type="button">← Back</button>
          <button class="btn-glow"  id="step3Submit" type="button">Send My Quote Request →</button>
        </div>
        <p id="step3Error" style="color:#ff6b6b; font-size:0.8rem; margin-top:8px; display:none;">
          Please enter your name and phone number.
        </p>
      </div>

      <!-- ── CONFIRMATION ────────────────────── -->
      <div class="modal-step" id="stepConfirm">
        <div class="confirm-icon">✓</div>
        <h3>Quote Request Sent!</h3>
        <p style="color:var(--t-70); margin-bottom:var(--s-md);">
          JP will call or text you within <strong style="color:var(--cyan);">2 hours</strong> with a personalized quote for your vehicle.
        </p>
        <div style="background:var(--g-xs); border:1px solid var(--g-border); border-radius:var(--r-md); padding:1rem; margin-bottom:var(--s-md);" id="confirmSummary"></div>

        <!-- Stripe / Apple Pay placeholder -->
        <div class="pay-panel" style="margin-bottom:var(--s-md);">
          <div class="pay-badge">🔒 Secure Deposit — Coming Soon</div>
          <p style="font-size:0.8rem; color:var(--t-50); margin-bottom:var(--s-md); line-height:1.6;">
            Online booking deposits are coming soon. For now, JP will confirm your appointment by phone.
          </p>
          <button class="btn-apple-pay" onclick="alert('Online payments coming soon! JP will contact you to confirm your appointment.');" type="button">
            <span class="pay-logo">󰉀</span>
            Pay Deposit — Coming Soon
          </button>
          <div class="pay-divider">or</div>
          <a href="tel:9807772919" class="btn-glass" style="width:100%; justify-content:center; display:flex;">
            📞 Confirm by Phone
          </a>
          <div class="pay-security-row">
            🔒 Payments will be secured by Stripe
          </div>
        </div>

        <button class="btn-glass" style="width:100%;" id="confirmClose">Close</button>
      </div>

    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  /* ── State ───────────────────────────────── */
  let currentStep = 1;
  let selectedVehicleType = '';

  const overlay  = document.getElementById('quoteModal');
  const panel    = document.getElementById('modalPanel');

  /* ── Open / Close ────────────────────────── */
  window.openModal = function () {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    goToStep(1);
  };

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('confirmClose').addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  /* ── Step Navigation ─────────────────────── */
  function goToStep(n) {
    document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-dot').forEach((d, i) => {
      d.classList.toggle('active', i < n);
    });

    const label = document.getElementById('progressLabel');
    if (n <= 3) {
      document.getElementById('step' + n).classList.add('active');
      label.textContent = `Step ${n} of 3`;
    } else {
      document.getElementById('stepConfirm').classList.add('active');
      label.textContent = 'Done!';
    }

    panel.scrollTop = 0;
    currentStep = n;

    // Hide errors
    ['step1Error','step2Error','step3Error'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  /* ── Vehicle Type Buttons ────────────────── */
  document.querySelectorAll('.vehicle-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vehicle-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedVehicleType = btn.dataset.type;
    });
  });

  /* ── Step 1 → 2 ──────────────────────────── */
  document.getElementById('step1Next').addEventListener('click', () => {
    const selected = document.querySelector('input[name="quoteService"]:checked');
    if (!selected) {
      document.getElementById('step1Error').style.display = 'block';
      return;
    }
    goToStep(2);
  });

  /* ── Step 2 navigation ───────────────────── */
  document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
  document.getElementById('step2Next').addEventListener('click', () => {
    const vehicle = document.getElementById('qVehicle').value.trim();
    if (!vehicle || !selectedVehicleType) {
      document.getElementById('step2Error').style.display = 'block';
      return;
    }
    goToStep(3);
  });

  /* ── Step 3 navigation ───────────────────── */
  document.getElementById('step3Back').addEventListener('click', () => goToStep(2));
  document.getElementById('step3Submit').addEventListener('click', () => {
    const name  = document.getElementById('qName').value.trim();
    const phone = document.getElementById('qPhone').value.trim();
    if (!name || !phone) {
      document.getElementById('step3Error').style.display = 'block';
      return;
    }
    submitQuote();
  });

  /* ── Submit ──────────────────────────────── */
  function submitQuote() {
    const service  = document.querySelector('input[name="quoteService"]:checked')?.value || '';
    const addons   = [...document.querySelectorAll('input[name="addon"]:checked')].map(c => c.value);
    const vehicle  = document.getElementById('qVehicle').value.trim();
    const condition= document.getElementById('qCondition').value;
    const name     = document.getElementById('qName').value.trim();
    const phone    = document.getElementById('qPhone').value.trim();
    const city     = document.getElementById('qCity').value.trim();
    const notes    = document.getElementById('qNotes').value.trim();

    // Build summary display
    const summary = document.getElementById('confirmSummary');
    summary.innerHTML = `
      <div style="display:grid; gap:6px; font-size:0.82rem; color:var(--t-70);">
        <div><strong style="color:var(--t-100);">Service:</strong> ${service}</div>
        ${addons.length ? `<div><strong style="color:var(--t-100);">Add-ons:</strong> ${addons.join(', ')}</div>` : ''}
        <div><strong style="color:var(--t-100);">Vehicle:</strong> ${vehicle} — ${selectedVehicleType}</div>
        ${condition ? `<div><strong style="color:var(--t-100);">Condition:</strong> ${condition}</div>` : ''}
        <div><strong style="color:var(--t-100);">Name:</strong> ${name}</div>
        <div><strong style="color:var(--t-100);">Phone:</strong> ${phone}</div>
        ${city ? `<div><strong style="color:var(--t-100);">City:</strong> ${city}</div>` : ''}
      </div>
    `;

    // Send via EmailJS -- fill in your keys at the top of this file
    const btn = document.getElementById('step3Submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const templateParams = {
      name:         name,           // EmailJS default field
      message:      `${service} — ${vehicle} (${selectedVehicleType})`,  // EmailJS default field
      from_name:    name,
      phone:        phone,
      city:         city || 'Not provided',
      service:      service,
      addons:       addons.length ? addons.join(', ') : 'None',
      vehicle:      vehicle,
      vehicle_type: selectedVehicleType,
      condition:    condition || 'Not specified',
      notes:        notes    || 'None',
    };

    function afterSend() {
      btn.textContent = 'Send My Quote Request ->';
      btn.disabled = false;
      goToStep(4);
    }

    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && window.emailjs) {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_QUOTE_TMPL, templateParams)
        .then(afterSend)
        .catch((err) => {
          console.error('EmailJS error:', err);
          afterSend(); // Still advance — don't block the user
        });
    } else {
      // Keys not configured yet -- still show confirmation
      console.log('Quote (EmailJS not yet configured):', templateParams);
      afterSend();
    }
  }

})();
