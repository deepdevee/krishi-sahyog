/**
 * KRISHI Sahyog - Single-Language Switch Engine (EN / हिं)
 * Manages JSON dictionary loading, DOM translation updates, and localStorage persistence.
 */

(function () {
  'use strict';

  let currentLang = localStorage.getItem('krishi_lang') || 'en';
  let translations = {};

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load lang/${lang}.json: HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[i18n] Could not load dictionary for ${lang}, falling back to defaults`, err);
      return {};
    }
  }

  function applyTranslations() {
    // 1. Text content replacement
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] !== undefined) {
        // If element contains child tags we don't want to wipe, check for span/strong or set textContent
        el.textContent = translations[key];
      }
    });

    // 2. Placeholder replacement
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] !== undefined) {
        el.setAttribute('placeholder', translations[key]);
      }
    });

    // 3. Title attribute replacement
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (translations[key] !== undefined) {
        el.setAttribute('title', translations[key]);
      }
    });

    // 4. Update Document lang and fonts
    document.documentElement.lang = currentLang;
    if (currentLang === 'hi') {
      document.documentElement.style.fontFamily = "'Noto Sans Devanagari', 'Noto Sans', system-ui, sans-serif";
    } else {
      document.documentElement.style.fontFamily = "'Noto Sans', system-ui, sans-serif";
    }

    // 5. Update Header EN / हिं toggle UI states
    updateToggleButtons();

    // 6. Broadcast event for dynamic modules (schemes, weather)
    document.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: { lang: currentLang, translations }
      })
    );
  }

  function updateToggleButtons() {
    const enBtns = document.querySelectorAll('.lang-toggle-en, [data-lang-switch="en"]');
    const hiBtns = document.querySelectorAll('.lang-toggle-hi, [data-lang-switch="hi"]');

    if (currentLang === 'en') {
      enBtns.forEach((btn) => {
        btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');
        btn.classList.remove('text-on-surface-variant', 'font-semibold');
        btn.setAttribute('aria-pressed', 'true');
      });
      hiBtns.forEach((btn) => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
        btn.classList.add('text-on-surface-variant', 'font-semibold');
        btn.setAttribute('aria-pressed', 'false');
      });
    } else {
      hiBtns.forEach((btn) => {
        btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');
        btn.classList.remove('text-on-surface-variant', 'font-semibold');
        btn.setAttribute('aria-pressed', 'true');
      });
      enBtns.forEach((btn) => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
        btn.classList.add('text-on-surface-variant', 'font-semibold');
        btn.setAttribute('aria-pressed', 'false');
      });
    }
  }

  async function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'hi') lang = 'en';
    currentLang = lang;
    localStorage.setItem('krishi_lang', lang);
    translations = await loadTranslations(lang);
    applyTranslations();
  }

  function t(key, fallback = '') {
    return translations[key] !== undefined ? translations[key] : fallback;
  }

  // Expose global i18n API
  window.KrishiLang = {
    get current() {
      return currentLang;
    },
    set: setLanguage,
    t: t,
    init: async function () {
      translations = await loadTranslations(currentLang);
      applyTranslations();

      // Bind all toggle buttons
      document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('[data-lang-switch], .lang-toggle-en, .lang-toggle-hi');
        if (!toggleBtn) return;
        
        let targetLang = toggleBtn.getAttribute('data-lang-switch');
        if (!targetLang) {
          if (toggleBtn.classList.contains('lang-toggle-en')) targetLang = 'en';
          if (toggleBtn.classList.contains('lang-toggle-hi')) targetLang = 'hi';
        }
        if (targetLang && targetLang !== currentLang) {
          setLanguage(targetLang);
        }
      });
    }
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.KrishiLang.init());
  } else {
    window.KrishiLang.init();
  }
})();
