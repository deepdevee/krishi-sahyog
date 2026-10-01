/**
 * KRISHI Sahyog - Schemes Repository & Detail Engine
 * Powers scheme catalogue search, category filter chips, offline filter, and dynamic scheme-detail rendering.
 */

(function () {
  'use strict';

  let schemesData = [];

  async function fetchSchemes() {
    if (schemesData.length > 0) return schemesData;
    try {
      const response = await fetch('data/schemes.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      schemesData = await response.json();
      return schemesData;
    } catch (err) {
      console.error('[Schemes] Failed to load schemes dataset', err);
      return [];
    }
  }

  // Helper to extract language-specific field
  function getLangField(item, fieldPrefix) {
    const lang = (window.KrishiLang && window.KrishiLang.current === 'hi') ? 'hi' : 'en';
    return item[`${fieldPrefix}_${lang}`] || item[`${fieldPrefix}_en`] || item[fieldPrefix] || '';
  }

  // --- SCHEMES CATALOGUE (schemes.html) ---
  function initSchemesPage() {
    const container = document.getElementById('schemes-grid');
    if (!container) return;

    const searchInput = document.getElementById('scheme-search-input');
    const countDisplay = document.getElementById('schemes-count-display');
    const offlineOnlyToggle = document.getElementById('filter-offline-only');
    const filterChips = document.querySelectorAll('[data-category-filter]');

    let activeCategory = 'all';
    let searchQuery = '';
    let offlineOnly = false;

    // Read query parameter if user arrived from homepage search bar (e.g. ?q=tractor)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
      searchQuery = urlParams.get('q');
      if (searchInput) searchInput.value = searchQuery;
    }
    if (urlParams.has('category')) {
      activeCategory = urlParams.get('category');
    }

    function renderList() {
      const lang = (window.KrishiLang && window.KrishiLang.current === 'hi') ? 'hi' : 'en';

      const filtered = schemesData.filter((scheme) => {
        const matchesCategory = activeCategory === 'all' || scheme.category === activeCategory;
        const matchesOffline = !offlineOnly || scheme.is_offline_cached;

        const name = (getLangField(scheme, 'name') + ' ' + scheme.name_en + ' ' + scheme.name_hi).toLowerCase();
        const benefit = (getLangField(scheme, 'benefit_amount') + ' ' + getLangField(scheme, 'tagline')).toLowerCase();
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || name.includes(q) || benefit.includes(q) || scheme.category.includes(q);

        return matchesCategory && matchesOffline && matchesSearch;
      });

      // Update count text
      if (countDisplay) {
        const template = (window.KrishiLang && window.KrishiLang.t('schemes_showing_count')) || 'Showing {count} schemes';
        countDisplay.textContent = template.replace('{count}', filtered.length);
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-16 text-center bg-surface-container-low rounded-2xl border border-outline-variant p-8">
            <span class="material-symbols-outlined text-[48px] text-outline mb-2">search_off</span>
            <p class="font-headline-md text-headline-md text-on-surface mb-2" data-i18n="schemes_empty">
              ${(window.KrishiLang && window.KrishiLang.t('schemes_empty')) || 'No matching schemes found.'}
            </p>
            <p class="font-body-md text-on-surface-variant">Try searching for "PM Kisan", "Solar Pump", or "KCC".</p>
          </div>
        `;
        return;
      }

      const readText = (window.KrishiLang && window.KrishiLang.t('popular_schemes_read_guide')) || 'Read Simple Guide';
      const listenText = (window.KrishiLang && window.KrishiLang.t('hero_voice_btn')) || 'Listen';

      container.innerHTML = filtered
        .map((scheme) => {
          const name = getLangField(scheme, 'name');
          const badge = getLangField(scheme, 'badge');
          const tagline = getLangField(scheme, 'tagline');
          const benefitAmount = getLangField(scheme, 'benefit_amount');
          const benefitDetail = getLangField(scheme, 'benefit_detail');

          return `
          <article class="flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all overflow-hidden p-6 justify-between group">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[12px] font-bold">
                  <span class="material-symbols-outlined text-[15px] mr-1">verified</span>
                  ${badge}
                </span>
                ${
                  scheme.is_offline_cached
                    ? `<span class="inline-flex items-center text-[12px] text-outline gap-1 font-label-sm">
                        <span class="material-symbols-outlined text-[14px]">offline_pin</span>
                        Offline
                       </span>`
                    : ''
                }
              </div>

              <h2 class="font-headline-md text-headline-md text-on-surface font-bold mb-2 group-hover:text-primary transition-colors">
                <a href="scheme-detail.html?id=${scheme.id}" class="hover:underline">
                  ${name}
                </a>
              </h2>

              <p class="font-body-md text-body-md text-on-surface-variant text-[14px] leading-relaxed mb-4">
                ${tagline}
              </p>

              <!-- Benefit Callout Box -->
              <div class="bg-surface-container-low rounded-xl p-3.5 mb-4 border border-outline-variant/50">
                <div class="font-label-sm text-[12px] text-outline font-bold uppercase tracking-wider mb-0.5">
                  Core Benefit
                </div>
                <div class="font-headline-md text-[20px] font-bold text-primary mb-1">
                  ${benefitAmount}
                </div>
                <p class="text-[13px] text-on-surface-variant leading-snug">
                  ${benefitDetail}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-4 border-t border-surface-container-high">
              <a href="scheme-detail.html?id=${scheme.id}" class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm min-h-[44px]">
                <span>${readText}</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <button type="button" class="btn-voice-read px-3 py-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-colors flex items-center justify-center min-h-[44px] min-w-[44px] shadow-sm" data-voice-text="${name}. Benefit: ${benefitAmount}. ${benefitDetail}" title="${listenText}">
                <span class="material-symbols-outlined text-[20px] text-tertiary">volume_up</span>
              </button>
            </div>
          </article>
        `;
        })
        .join('');
    }

    // Attach search listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderList();
      });
    }

    // Attach category filter listener
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        activeCategory = chip.getAttribute('data-category-filter');
        filterChips.forEach((c) => {
          c.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
          c.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
        });
        chip.classList.add('bg-primary', 'text-on-primary', 'font-bold');
        chip.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');
        renderList();
      });
    });

    // Offline filter
    if (offlineOnlyToggle) {
      offlineOnlyToggle.addEventListener('change', (e) => {
        offlineOnly = e.target.checked;
        renderList();
      });
    }

    // Re-render when language changes
    document.addEventListener('languageChanged', renderList);

    // Initial render
    renderList();
  }

  // --- SCHEME DETAIL PAGE (scheme-detail.html) ---
  function initDetailPage() {
    const detailContainer = document.getElementById('scheme-detail-container');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const schemeId = urlParams.get('id') || 'pm-kisan';

    function renderDetail() {
      const scheme = schemesData.find((s) => s.id === schemeId) || schemesData[0];
      if (!scheme) return;

      const lang = (window.KrishiLang && window.KrishiLang.current === 'hi') ? 'hi' : 'en';

      const name = getLangField(scheme, 'name');
      const badge = getLangField(scheme, 'badge');
      const benefitAmount = getLangField(scheme, 'benefit_amount');
      const benefitDetail = getLangField(scheme, 'benefit_detail');
      const eligibilityList = (lang === 'hi' ? scheme.eligibility_hi : scheme.eligibility_en) || [];
      const ineligibilityList = (lang === 'hi' ? scheme.ineligible_hi : scheme.ineligible_en) || [];
      const documentsList = (lang === 'hi' ? scheme.documents_hi : scheme.documents_en) || [];
      const stepsList = (lang === 'hi' ? scheme.how_to_apply_hi : scheme.how_to_apply_en) || [];
      const faqsList = (lang === 'hi' ? scheme.faqs_hi : scheme.faqs_en) || [];

      // Update document title
      document.title = `${name} | KRISHI Sahyog`;

      // Update scheme title & badges
      const titleEl = document.getElementById('detail-scheme-name');
      if (titleEl) titleEl.textContent = name;

      const badgeEl = document.getElementById('detail-scheme-badge');
      if (badgeEl) badgeEl.textContent = badge;

      const benefitAmountEl = document.getElementById('detail-benefit-amount');
      if (benefitAmountEl) benefitAmountEl.textContent = benefitAmount;

      const benefitDetailEl = document.getElementById('detail-benefit-detail');
      if (benefitDetailEl) benefitDetailEl.textContent = benefitDetail;

      // Update voice button text
      const voiceBtn = document.getElementById('detail-audio-btn');
      if (voiceBtn) {
        voiceBtn.setAttribute(
          'data-voice-text',
          `${name}. ${benefitAmount}. ${benefitDetail}`
        );
      }

      // Update Eligibility Lists
      const eligibleContainer = document.getElementById('detail-eligibility-list');
      if (eligibleContainer) {
        eligibleContainer.innerHTML = eligibilityList
          .map(
            (item) => `
          <li class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">check_circle</span>
            <span class="text-on-surface font-body-md text-[15px] leading-relaxed">${item}</span>
          </li>`
          )
          .join('');
      }

      const ineligibleContainer = document.getElementById('detail-ineligible-list');
      if (ineligibleContainer) {
        ineligibleContainer.innerHTML = ineligibilityList
          .map(
            (item) => `
          <li class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-error text-[20px] flex-shrink-0 mt-0.5">cancel</span>
            <span class="text-on-surface font-body-md text-[15px] leading-relaxed">${item}</span>
          </li>`
          )
          .join('');
      }

      // Update Documents Checklist
      const docsContainer = document.getElementById('detail-documents-grid');
      if (docsContainer) {
        docsContainer.innerHTML = documentsList
          .map(
            (doc, idx) => `
          <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center">
                  ${idx + 1}
                </span>
                ${
                  doc.mandatory
                    ? `<span class="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Mandatory</span>`
                    : ''
                }
              </div>
              <h4 class="font-label-lg text-label-lg font-bold text-on-surface mb-1">${doc.title}</h4>
              <p class="font-body-md text-on-surface-variant text-[13px] leading-relaxed">${doc.detail}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-outline-variant/30 flex items-center gap-1.5 text-primary text-xs font-bold">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>Official requirement</span>
            </div>
          </div>`
          )
          .join('');
      }

      // Update How to Apply 4-Step Guide
      const stepsContainer = document.getElementById('detail-steps-grid');
      if (stepsContainer) {
        stepsContainer.innerHTML = stepsList
          .map(
            (step) => `
          <div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm flex flex-col">
            <div class="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-sm flex items-center justify-center mb-3">
              ${step.step}
            </div>
            <h4 class="font-headline-md text-[16px] font-bold text-on-surface mb-1.5">${step.title}</h4>
            <p class="font-body-md text-on-surface-variant text-[13px] leading-relaxed">${step.desc}</p>
          </div>`
          )
          .join('');
      }

      // Update Helplines
      const helplineContainer = document.getElementById('detail-helpline-grid');
      if (hellineContainer && scheme.helplines) {
        hellineContainer.innerHTML = scheme.helplines
          .map((hl) => {
            const title = (lang === 'hi' ? hl.title_hi : hl.title_en) || hl.title_en;
            return `
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-between">
              <div>
                <span class="text-xs text-on-surface-variant font-medium block">${title}</span>
                <span class="font-bold text-primary text-[16px]">${hl.value}</span>
              </div>
              <a href="${hl.link}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">open_in_new</span>
              </a>
            </div>`;
          })
          .join('');
      }

      // Update FAQs Accordion
      const faqContainer = document.getElementById('detail-faq-list');
      if (faqContainer && faqsList.length > 0) {
        faqContainer.innerHTML = faqsList
          .map(
            (faq, idx) => `
          <details class="group bg-surface-container-low rounded-xl border border-outline-variant/60 p-4 transition-all" ${idx === 0 ? 'open' : ''}>
            <summary class="font-label-lg text-label-lg text-on-surface font-bold cursor-pointer list-none flex items-center justify-between gap-2">
              <span>Q: ${faq.q}</span>
              <span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div class="mt-3 pt-3 border-t border-outline-variant/40 text-[14px] text-on-surface-variant leading-relaxed">
              ${faq.a}
            </div>
          </details>`
          )
          .join('');
      }

      // Update Official External Link
      const officialLinkBtn = document.getElementById('detail-official-link-btn');
      if (officialLinkBtn && scheme.official_link) {
        officialLinkBtn.setAttribute('href', scheme.official_link);
      }
    }

    document.addEventListener('languageChanged', renderDetail);
    renderDetail();
  }

  // Auto-init on page load
  document.addEventListener('DOMContentLoaded', async () => {
    await fetchSchemes();
    initSchemesPage();
    initDetailPage();
  });
})();
