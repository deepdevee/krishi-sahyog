/**
 * KRISHI Sahyog - Core Application Shell Script
 * Handles navigation highlighting, online/offline indicators, font sizing, and accessibility features.
 */

(function () {
  'use strict';

  // 1. Text Size Controller (A-, A, A+)
  function initTextSizing() {
    const savedSize = localStorage.getItem('krishi_text_size') || 'md';
    applyTextSize(savedSize);

    document.querySelectorAll('[data-text-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const size = btn.getAttribute('data-text-size');
        applyTextSize(size);
      });
    });
  }

  function applyTextSize(size) {
    document.documentElement.classList.remove('text-size-sm', 'text-size-md', 'text-size-lg');
    document.documentElement.classList.add(`text-size-${size}`);
    localStorage.setItem('krishi_text_size', size);

    document.querySelectorAll('[data-text-size]').forEach((btn) => {
      if (btn.getAttribute('data-text-size') === size) {
        btn.classList.add('bg-surface-container', 'text-on-surface');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('bg-surface-container', 'text-on-surface');
        btn.classList.add('text-on-surface-variant');
      }
    });
  }

  // 2. Online / Offline Live Status Indicator
  function initNetworkStatus() {
    function updateStatus() {
      const isOnline = navigator.onLine;
      const chips = document.querySelectorAll('.offline-status-chip');
      const dots = document.querySelectorAll('.network-status-dot');

      chips.forEach((chip) => {
        const textSpan = chip.querySelector('.status-text') || chip;
        if (isOnline) {
          chip.classList.remove('bg-amber-100', 'text-amber-900', 'border-amber-300');
          chip.classList.add('bg-surface-container-lowest', 'text-on-surface-variant', 'border-outline-variant');
          if (window.KrishiLang) {
            textSpan.textContent = window.KrishiLang.t('status_offline_ready', 'Offline Ready');
          }
        } else {
          chip.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant', 'border-outline-variant');
          chip.classList.add('bg-amber-100', 'text-amber-900', 'border-amber-300');
          if (window.KrishiLang) {
            textSpan.textContent = window.KrishiLang.t('status_offline_active', 'You are offline (Using cached data)');
          }
        }
      });

      dots.forEach((dot) => {
        if (isOnline) {
          dot.className = 'w-2 h-2 rounded-full bg-primary-container animate-pulse network-status-dot';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-amber-500 network-status-dot';
        }
      });
    }

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    document.addEventListener('languageChanged', updateStatus);
    updateStatus();
  }

  // 3. Navigation Active State Highlighting
  function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a, .mobile-bottom-nav a');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPath = href.split('?')[0].split('#')[0];

      const isMatch =
        targetPath === currentPath ||
        (currentPath === '' && targetPath === 'index.html') ||
        (currentPath === 'scheme-detail.html' && targetPath === 'schemes.html');

      if (isMatch) {
        link.classList.add('bg-primary-container', 'text-on-primary', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('bg-primary-container', 'text-on-primary', 'font-bold');
        link.classList.add('text-on-surface-variant');
        link.removeAttribute('aria-current');
      }
    });
  }

  // 4. Farmer-Friendly Voice Readout (Web Speech API)
  function initVoiceReadout() {
    document.addEventListener('click', (e) => {
      const voiceBtn = e.target.closest('[data-voice-target], .btn-voice-read');
      if (!voiceBtn) return;

      if (!('speechSynthesis' in window)) {
        alert('Voice synthesis is not supported on this browser.');
        return;
      }

      // If already speaking, cancel
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.playing-audio').forEach((el) => el.classList.remove('playing-audio'));
        return;
      }

      let textToRead = '';
      const targetSelector = voiceBtn.getAttribute('data-voice-target');
      if (targetSelector) {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) textToRead = targetEl.innerText;
      } else {
        textToRead = voiceBtn.getAttribute('data-voice-text') || document.body.innerText;
      }

      if (!textToRead) return;

      const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 500));
      utterance.lang = (window.KrishiLang && window.KrishiLang.current === 'hi') ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;

      voiceBtn.classList.add('playing-audio');
      utterance.onend = () => voiceBtn.classList.remove('playing-audio');
      utterance.onerror = () => voiceBtn.classList.remove('playing-audio');

      window.speechSynthesis.speak(utterance);
    });
  }

  // 5. Account and Guest state
  function initUserSession() {
    const userPhone = localStorage.getItem('krishi_user_phone');
    const userBtn = document.querySelector('.header-user-btn');
    if (userBtn && userPhone) {
      userBtn.setAttribute('title', `Logged in: ${userPhone}`);
      const icon = userBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'verified_user';
    }
  }

  // 6. PWA Service Worker Registration
  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('service-worker.js')
          .then((reg) => console.log('[PWA] Service Worker registered with scope:', reg.scope))
          .catch((err) => console.warn('[PWA] Service Worker registration failed:', err));
      });
    }
  }

  // Initialize all shell scripts
  document.addEventListener('DOMContentLoaded', () => {
    initTextSizing();
    initNetworkStatus();
    initNavigation();
    initVoiceReadout();
    initUserSession();
    initServiceWorker();
  });
})();
