/**
 * KRISHI Sahyog - Agro-Meteorological Weather Engine
 * Renders live farm weather, severe weather alerts, 7-day forecast cards, and agricultural advisories.
 * Built with modular fetch API wrapper ready for live IMD / Open-Meteo backend integration.
 */

(function () {
  'use strict';

  let cachedWeatherData = null;

  /**
   * Primary Weather Data Fetcher
   * TODO: Swap the local JSON URL with real IMD or weather API endpoint:
   * e.g., return fetch(`https://api.weather.gov.in/v1/forecast?lat=${lat}&lon=${lon}`).then(res => res.json());
   */
  async function fetchWeatherData() {
    if (cachedWeatherData) return cachedWeatherData;
    try {
      const response = await fetch('data/weather.json');
      if (!response.ok) throw new Error(`Weather fetch HTTP ${response.status}`);
      cachedWeatherData = await response.json();
      return cachedWeatherData;
    } catch (err) {
      console.error('[Weather] Failed to fetch weather data', err);
      return null;
    }
  }

  function getLang() {
    return (window.KrishiLang && window.KrishiLang.current === 'hi') ? 'hi' : 'en';
  }

  function renderWeatherUI(data) {
    if (!data) return;
    const lang = getLang();

    // 1. Location Header
    const locText = document.getElementById('weather-location-name');
    if (locText) {
      const dist = lang === 'hi' ? data.location.district_hi : data.location.district_en;
      const state = lang === 'hi' ? data.location.state_hi : data.location.state_en;
      locText.textContent = `${dist}, ${state}`;
    }

    const updatedText = document.getElementById('weather-updated-text');
    if (updatedText) {
      updatedText.textContent = lang === 'hi' ? data.location.updated_ago_hi : data.location.updated_ago_en;
    }

    // 2. Severe Alert Banner
    const alertBox = document.getElementById('weather-severe-alert');
    if (alertBox) {
      if (data.severe_alert && data.severe_alert.active) {
        alertBox.classList.remove('hidden');
        const alertTitle = alertBox.querySelector('.alert-title');
        const alertDesc = alertBox.querySelector('.alert-desc');
        if (alertTitle) alertTitle.textContent = lang === 'hi' ? data.severe_alert.title_hi : data.severe_alert.title_en;
        if (alertDesc) alertDesc.textContent = lang === 'hi' ? data.severe_alert.desc_hi : data.severe_alert.desc_en;
      } else {
        alertBox.classList.add('hidden');
      }
    }

    // 3. Current Weather Overview
    const tempEl = document.getElementById('weather-current-temp');
    if (tempEl) tempEl.textContent = `${data.current.temp}°`;

    const conditionEl = document.getElementById('weather-condition-title');
    if (conditionEl) {
      conditionEl.textContent = lang === 'hi' ? data.current.condition_hi : data.current.condition_en;
    }

    const conditionDescEl = document.getElementById('weather-condition-desc');
    if (conditionDescEl) {
      conditionDescEl.textContent = lang === 'hi' ? data.current.condition_desc_hi : data.current.condition_desc_en;
    }

    const rainChanceEl = document.getElementById('weather-rain-chance');
    if (rainChanceEl) rainChanceEl.textContent = `${data.current.rain_chance}%`;

    const soilMoistureEl = document.getElementById('weather-soil-moisture');
    if (soilMoistureEl) soilMoistureEl.textContent = `${data.current.soil_moisture}%`;

    const soilStatusEl = document.getElementById('weather-soil-status');
    if (soilStatusEl) {
      soilStatusEl.textContent = lang === 'hi' ? data.current.soil_moisture_status_hi : data.current.soil_moisture_status_en;
    }

    const humidityEl = document.getElementById('weather-humidity');
    if (humidityEl) humidityEl.textContent = `${data.current.air_humidity}%`;

    const windSpeedEl = document.getElementById('weather-wind-speed');
    if (windSpeedEl) windSpeedEl.textContent = `${data.current.wind_speed} km/h`;

    const fieldworkStatusEl = document.getElementById('weather-fieldwork-status');
    if (fieldworkStatusEl) {
      fieldworkStatusEl.textContent = lang === 'hi' ? data.current.fieldwork_status_hi : data.current.fieldwork_status_en;
    }

    const fieldworkDescEl = document.getElementById('weather-fieldwork-desc');
    if (fieldworkDescEl) {
      fieldworkDescEl.textContent = lang === 'hi' ? data.current.fieldwork_desc_hi : data.current.fieldwork_desc_en;
    }

    // 4. 7-Day Day-by-Day Forecast Cards
    const forecastGrid = document.getElementById('weather-7day-grid');
    if (forecastGrid && data.forecast_7day) {
      forecastGrid.innerHTML = data.forecast_7day
        .map((day) => {
          const dayName = lang === 'hi' ? day.day_hi : day.day_en;
          const advisoryBadge = lang === 'hi' ? day.advisory_badge_hi : day.advisory_badge_en;
          const advisoryText = lang === 'hi' ? day.advisory_hi : day.advisory_en;

          let badgeColor = 'bg-primary/10 text-primary border-primary/20';
          let borderAccent = 'border-outline-variant';
          if (day.status_class === 'danger') {
            badgeColor = 'bg-error-container text-on-error-container border-error/30 font-bold';
            borderAccent = 'border-error/40 bg-error-container/10';
          } else if (day.status_class === 'warning') {
            badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
          }

          return `
          <div class="flex flex-col bg-surface-container-lowest rounded-xl border ${borderAccent} p-3.5 shadow-sm justify-between transition-all hover:shadow-md">
            <div class="flex items-center justify-between mb-2">
              <span class="font-label-md font-bold text-[14px] ${day.status_class === 'danger' ? 'text-error font-extrabold' : 'text-on-surface'}">
                ${dayName}
              </span>
              <span class="text-xs text-outline font-medium">${day.date}</span>
            </div>

            <div class="flex items-center justify-center my-3">
              <span class="material-symbols-outlined text-[36px] ${day.status_class === 'danger' ? 'text-error' : 'text-primary'}">
                ${day.icon}
              </span>
            </div>

            <div class="text-center mb-2">
              <div class="font-headline-md text-[18px] font-bold text-on-surface">
                ${day.temp_max}° <span class="text-[13px] text-outline font-normal">/ ${day.temp_min}°</span>
              </div>
              <div class="text-[12px] font-semibold text-primary mt-0.5 flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-[14px]">water_drop</span>
                ${day.rain_prob}% rain
              </div>
            </div>

            <div class="mt-2 pt-2 border-t border-outline-variant/40">
              <span class="inline-block w-full text-center text-[11px] px-1.5 py-0.5 rounded border mb-1.5 truncate ${badgeColor}">
                ${advisoryBadge}
              </span>
              <p class="text-[11px] text-on-surface-variant leading-tight text-center">
                ${advisoryText}
              </p>
            </div>
          </div>`;
        })
        .join('');
    }

    // 5. 4-Week Outlook Grid
    const outlookGrid = document.getElementById('weather-4week-grid');
    if (outlookGrid && data.rainfall_outlook_4weeks) {
      outlookGrid.innerHTML = data.rainfall_outlook_4weeks
        .map((week) => {
          const period = lang === 'hi' ? week.period_hi : week.period_en;
          const title = lang === 'hi' ? week.title_hi : week.title_en;
          const badge = lang === 'hi' ? week.badge_hi : week.badge_en;
          const desc = lang === 'hi' ? week.desc_hi : week.desc_en;

          // Compute relative visual bar height (max 60mm)
          const barHeight = Math.min(100, Math.max(15, (week.amount_mm / 55) * 80));

          return `
          <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs text-outline font-bold uppercase tracking-wider">${period}</span>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full ${week.amount_mm > 20 ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface'}">
                  ${badge}
                </span>
              </div>
              <h4 class="font-headline-md text-[15px] font-bold text-on-surface mb-2">${title}</h4>
            </div>

            <!-- Visual Bar -->
            <div class="w-full bg-surface-container-highest rounded-lg h-20 flex items-end p-2 mb-3">
              <div class="w-full rounded-md transition-all ${week.amount_mm > 20 ? 'bg-primary' : 'bg-secondary'}" style="height: ${barHeight}%;"></div>
            </div>

            <p class="text-[12px] text-on-surface-variant leading-relaxed">
              ${desc}
            </p>
          </div>`;
        })
        .join('');
    }

    // 6. Actionable Crop Directives
    const directivesGrid = document.getElementById('weather-directives-grid');
    if (directivesGrid && data.actionable_advisories) {
      directivesGrid.innerHTML = data.actionable_advisories
        .map((advisory) => {
          const cat = lang === 'hi' ? advisory.category_hi : advisory.category_en;
          const sub = lang === 'hi' ? advisory.sub_hi : advisory.sub_en;
          const badge = lang === 'hi' ? advisory.badge_hi : advisory.badge_en;
          const priority = lang === 'hi' ? advisory.priority_hi : advisory.priority_en;
          const advice = lang === 'hi' ? advisory.advice_hi : advisory.advice_en;

          let badgeClass = 'bg-primary text-on-primary';
          if (advisory.badge_color === 'red') badgeClass = 'bg-error text-on-error';
          if (advisory.badge_color === 'amber') badgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed';
          if (advisory.badge_color === 'blue') badgeClass = 'bg-blue-600 text-white';

          return `
          <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 class="font-headline-md text-[16px] font-bold text-on-surface leading-tight">${cat}</h3>
                  <span class="text-xs text-outline font-medium">${sub}</span>
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${badgeClass}">
                  ${badge}
                </span>
              </div>
              <p class="font-body-md text-on-surface text-[14px] leading-relaxed my-3">
                ${advice}
              </p>
            </div>
            <div class="pt-3 border-t border-surface-container-high flex items-center justify-between text-xs text-outline font-bold">
              <span>${priority}</span>
              <span class="text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">verified</span>
                Verified by KVK
              </span>
            </div>
          </div>`;
        })
        .join('');
    }
  }

  // Initialize weather module
  document.addEventListener('DOMContentLoaded', async () => {
    if (!document.getElementById('weather-current-temp')) return;
    const data = await fetchWeatherData();
    renderWeatherUI(data);

    document.addEventListener('languageChanged', () => {
      renderWeatherUI(cachedWeatherData);
    });
  });
})();
