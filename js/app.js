/**
 * GAPTHREAD - Cross-Domain Performance Governance for Multi-Site Hospitality
 * Frontend-Only Application Script
 * British English | LocalStorage Persistence
 */

function initAll() {
  initNavigation();
  initFaqAccordion();
  initPilotForms();
  initModal();
  initMockupInteractivity();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ==========================================================================
   Navigation & Mobile Drawer
   ========================================================================== */

function initNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close drawer when a link is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll & active state
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* ==========================================================================
   FAQ Accordion Component
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherTrigger = other.querySelector('.faq-trigger');
            const otherPanel = other.querySelector('.faq-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   LocalStorage & Pilot Request Form
   ========================================================================== */

const STORAGE_KEY = "gapthreadPilotSubmissions";

/**
 * Saves a new pilot submission into localStorage without overwriting existing entries.
 * Exactly adheres to the required GapThread specification.
 */
function savePilotRequest(data) {
  let existingSubmissions = [];

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (Array.isArray(parsedData)) {
        existingSubmissions = parsedData;
      }
    }
  } catch (error) {
    console.error("Unable to read stored pilot submissions:", error);
    existingSubmissions = [];
  }

  const newSubmission = {
    fullName: data.fullName.trim(),
    phoneNumber: data.phoneNumber.trim(),
    emailAddress: data.emailAddress.trim(),
    organisationName: data.organisationName.trim(),
    submissionDateTime: new Date().toISOString()
  };

  existingSubmissions.push(newSubmission);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(existingSubmissions)
  );

  return newSubmission;
}

/**
 * Form field validation helpers
 */
function validateFullName(name) {
  if (!name || name.trim().length < 2) {
    return "Please enter your full name.";
  }
  return null;
}

function validateEmail(email) {
  if (!email || !email.trim()) {
    return "Please enter a valid email address.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return "Please enter a valid phone number.";
  }
  // Allow +, spaces, hyphens, brackets, digits; minimum 7 digits/characters
  const phoneClean = phone.replace(/[\s\-\(\)\+]/g, '');
  if (phoneClean.length < 7 || !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
    return "Please enter a valid phone number.";
  }
  return null;
}

function validateOrganisation(org) {
  if (!org || org.trim().length < 2) {
    return "Please enter your organisation name.";
  }
  return null;
}

function bindFormHandling(formElement, successBannerElement) {
  if (!formElement) return;

  const fullNameInput = formElement.querySelector('[name="fullName"]');
  const phoneInput = formElement.querySelector('[name="phoneNumber"]');
  const emailInput = formElement.querySelector('[name="emailAddress"]');
  const orgInput = formElement.querySelector('[name="organisationName"]');

  const fullNameError = formElement.querySelector('#nameError, .name-error');
  const phoneError = formElement.querySelector('#phoneError, .phone-error');
  const emailError = formElement.querySelector('#emailError, .email-error');
  const orgError = formElement.querySelector('#orgError, .org-error');

  function clearErrors() {
    [fullNameInput, phoneInput, emailInput, orgInput].forEach(inp => {
      if (inp) inp.classList.remove('input-error');
    });
    [fullNameError, phoneError, emailError, orgError].forEach(err => {
      if (err) err.textContent = '';
    });
  }

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const nameVal = fullNameInput ? fullNameInput.value : '';
    const phoneVal = phoneInput ? phoneInput.value : '';
    const emailVal = emailInput ? emailInput.value : '';
    const orgVal = orgInput ? orgInput.value : '';

    let hasError = false;

    const nameErr = validateFullName(nameVal);
    if (nameErr) {
      if (fullNameError) fullNameError.textContent = nameErr;
      if (fullNameInput) fullNameInput.classList.add('input-error');
      hasError = true;
    }

    const phoneErr = validatePhone(phoneVal);
    if (phoneErr) {
      if (phoneError) phoneError.textContent = phoneErr;
      if (phoneInput) phoneInput.classList.add('input-error');
      hasError = true;
    }

    const emailErr = validateEmail(emailVal);
    if (emailErr) {
      if (emailError) emailError.textContent = emailErr;
      if (emailInput) emailInput.classList.add('input-error');
      hasError = true;
    }

    const orgErr = validateOrganisation(orgVal);
    if (orgErr) {
      if (orgError) orgError.textContent = orgErr;
      if (orgInput) orgInput.classList.add('input-error');
      hasError = true;
    }

    if (hasError) return;

    // Save into localStorage
    savePilotRequest({
      fullName: nameVal,
      phoneNumber: phoneVal,
      emailAddress: emailVal,
      organisationName: orgVal
    });

    // Reset form fields
    formElement.reset();

    // Show success feedback
    if (successBannerElement) {
      successBannerElement.classList.add('active');
      successBannerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => {
        // Keeps banner visible, or optionally stays until user navigates
      }, 5000);
    }
  });

  // Clear error upon typing
  [fullNameInput, phoneInput, emailInput, orgInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        inp.classList.remove('input-error');
        const errSpan = inp.parentElement.querySelector('.field-error-msg');
        if (errSpan) errSpan.textContent = '';
      });
    }
  });
}

function initPilotForms() {
  const inPageForm = document.getElementById('inPagePilotForm');
  const inPageSuccess = document.getElementById('inPageSuccessBanner');
  bindFormHandling(inPageForm, inPageSuccess);

  const modalForm = document.getElementById('modalPilotForm');
  const modalSuccess = document.getElementById('modalSuccessBanner');
  bindFormHandling(modalForm, modalSuccess);
}

/* ==========================================================================
   Pilot Modal Controller
   ========================================================================== */

function initModal() {
  const modalOverlay = document.getElementById('pilotModal');
  const openButtons = document.querySelectorAll('[data-open-pilot-modal]');
  const closeButtons = document.querySelectorAll('[data-close-pilot-modal]');

  if (!modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = modalOverlay.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Close when clicking overlay backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Hero Mockup Interactive Preview
   ========================================================================== */

function initMockupInteractivity() {
  const toggleWastage = document.getElementById('mockupToggleWastage');
  const toggleLabour = document.getElementById('mockupToggleLabour');
  const heroCard = document.getElementById('heroInteractiveCard');

  if (!toggleWastage || !toggleLabour || !heroCard) return;

  const labourData = {
    category: "Labour Operations",
    kpi: "Labour Cost %",
    target: "29.0%",
    actual: "32.4%",
    variance: "+3.4%",
    varianceClass: "variance",
    statusBadge: "Needs Review",
    badgeClass: "badge-review",
    rootCause: "Unexpected staff absence",
    action: "Standing cover arrangement",
    owner: "Site Manager",
    nextReview: "7 days",
    verification: "Pending"
  };

  const wastageData = {
    category: "Inventory & Food Cost",
    kpi: "Wastage %",
    target: "2.5%",
    actual: "2.8%",
    variance: "+0.3%",
    varianceClass: "variance",
    statusBadge: "Improving",
    badgeClass: "badge-resolved",
    rootCause: "Supplier delay caused over-preparation",
    action: "Adjust delivery-buffer process",
    owner: "Stock Lead",
    nextReview: "7 days",
    verification: "Partially Resolved"
  };

  function updateMockup(data) {
    const catEl = heroCard.querySelector('.kpi-category');
    const nameEl = heroCard.querySelector('.kpi-name');
    const targetEl = heroCard.querySelector('#mockTarget');
    const actualEl = heroCard.querySelector('#mockActual');
    const varEl = heroCard.querySelector('#mockVariance');
    const badgeEl = heroCard.querySelector('#mockStatusBadge');
    const causeEl = heroCard.querySelector('#mockRootCause');
    const actionEl = heroCard.querySelector('#mockAction');
    const ownerEl = heroCard.querySelector('#mockOwner');
    const nextReviewEl = heroCard.querySelector('#mockNextReview');
    const verifEl = heroCard.querySelector('#mockVerification');

    if (catEl) catEl.textContent = data.category;
    if (nameEl) nameEl.textContent = data.kpi;
    if (targetEl) targetEl.textContent = data.target;
    if (actualEl) actualEl.textContent = data.actual;
    if (varEl) {
      varEl.textContent = data.variance;
      varEl.className = `kpi-metric-val ${data.varianceClass}`;
    }
    if (badgeEl) {
      badgeEl.textContent = data.statusBadge;
      badgeEl.className = `badge ${data.badgeClass}`;
    }
    if (causeEl) causeEl.textContent = data.rootCause;
    if (actionEl) actionEl.textContent = data.action;
    if (ownerEl) ownerEl.textContent = data.owner;
    if (nextReviewEl) nextReviewEl.textContent = data.nextReview;
    if (verifEl) verifEl.textContent = data.verification;
  }

  toggleWastage.addEventListener('click', () => {
    updateMockup(wastageData);
    toggleWastage.style.borderColor = 'var(--color-accent-gold)';
    toggleLabour.style.borderColor = 'var(--color-border-subtle)';
  });

  toggleLabour.addEventListener('click', () => {
    updateMockup(labourData);
    toggleLabour.style.borderColor = 'var(--color-accent-gold)';
    toggleWastage.style.borderColor = 'var(--color-border-subtle)';
  });
}
