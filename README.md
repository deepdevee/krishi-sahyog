# KRISHI Sahyog (कृषि सहयोग) - Farmer Support Platform Frontend

> **Digital empowerment, verified government schemes, and localized agro-weather intelligence for Indian farmers.**

---

## 1. Project Overview

**KRISHI Sahyog** is a mobile-first, high-accessibility web platform designed specifically for rural Indian farmers, agricultural laborers, and Farmer Producer Organizations (FPOs). 

Many rural farmers face critical friction when seeking government assistance:
1. **Misinformation & Fake Schemes:** Fraudulent websites and scam social media messages deceive farmers with false promises of free tractors, equipment, or direct cash transfers.
2. **Connectivity Constraints:** Rural fields and village clusters frequently suffer from 2G/3G speeds or total loss of connectivity.
3. **Language Barriers & Digital Illiteracy:** Complex bureaucratic terminology, bilingual clutter, and small fonts prevent easy understanding.

### Core Value Proposition
- **Genuine Scheme Repository:** Verified database of central and state agricultural schemes with simple criteria, step-by-step application instructions, and required document checklists.
- **Scam & Scheme Authenticity Verification Tool:** Real-time search engine and fuzzy matching algorithm to instantly identify fake schemes, predatory links, and official portals.
- **Localized Weather & Agro-Advisories:** Wardha (Vidarbha) district weather updates, dry spell forecasts, and actionable crop directives (e.g., Soybean, Cotton).
- **Offline PWA Architecture:** Works without active internet via Service Worker and pre-cached JSON data.
- **Accessibility by Design:** Text sizing (`A- / A / A+`), high-contrast sunlight mode, Text-to-Speech (read-aloud), and pure single-language toggling (`English` / `हिन्दी`).

---

## 2. Page Inventory

All 14 Google Stitch design export folders have been consolidated into 9 modular, interconnected pages:

| Page URL | Google Stitch Source Folder(s) | Primary Purpose & Key Features |
| :--- | :--- | :--- |
| **`index.html`** | `krishi_sahyog_home`<br>`krishi_sahyog_home_hindi` | **Home Dashboard**: Hero search, emergency squall weather alert banner, quick category navigation chips, 3 platform feature highlights, popular verified scheme cards, offline vault notice, and 24/7 Kisan Call Center helpline card. |
| **`schemes.html`** | `government_scheme_repository` | **Schemes Directory**: Live search filtering, category tabs (*All, Financial Support, Crop Insurance, Irrigation & Water, Credit & Loans, Organic Farming*), dynamic grid rendering from `data/schemes.json`, active scheme count, and safety verification badge. |
| **`scheme-detail.html`** | `scheme_detail_pm_kisan` | **Dynamic Scheme Detail**: URL query reader (`?id=pm-kisan`, `?id=pmfby`, etc.), 6 interactive accordions (Overview, Eligibility, Documents Checklist, 4-step Application Guide, Helplines, and FAQs), official portal links, offline cache toggle, and 1-click WhatsApp sharing. |
| **`weather.html`** | `hyperlocal_weather_forecast` | **Agro-Weather Intelligence**: Live Wardha district weather, severe squall & storm warnings, 7-day temperature/rain forecast, 4-week rainfall & dry spell outlook bar chart, crop-specific advisory directives (Soybean, Cotton), and KVK scientist hotline. |
| **`check-scheme.html`** | `scheme_verification`<br>`krishi_sahyog_hindi_1` | **Scam & Scheme Verifier**: 3 interactive tabs (*Genuine Scheme, Scam Alert, Similar Name Warning*), client-side fuzzy search verifying user-entered scheme names against known genuine and blacklisted schemes, and reporting form for fraudulent WhatsApp links. |
| **`login.html`** | `login_english`<br>`krishi_sahyog_hindi_2` | **Farmer Authentication**: 10-digit Indian mobile number validation (`/^[6-9]\d{9}$/`), state and language selection, "Continue as Guest" bypass, and session storage management. |
| **`otp.html`** | `otp_verification` | **OTP Verification**: 6-box input with auto-advance, backspace navigation, paste handling, 30s resend timer, mock code (`123456`), and interactive prototype state switcher (*Default, Wrong OTP, Expired, Locked*). |
| **`settings.html`** | `offline_and_storage_settings` | **Storage & Accessibility Controls**: Cache manager breakdown (Schemes: 2.1 MB, Weather: 0.8 MB, Shell: 0.5 MB), 1-click cache update and clear buttons, font size selector (`A-`, `A`, `A+`), theme mode toggles (*Normal, High Contrast Sunlight, Dark Mode*), and language selector. |
| **`language.html`** | `krishi_sahyog_language_selection` | **First-Time Language Selection**: Visual language cards with radio indicators (English & हिन्दी), audio readout hint, and persistent selection saved to `localStorage`. |

---

## 3. How to Run Locally

Because this project is built with vanilla web standards and relies on `fetch()` to load local JSON files (`data/schemes.json`, `data/weather.json`, `lang/*.json`), it must be served via any local HTTP server (browsers block `file://` fetch requests due to CORS security policies).

### Option A: Using Python 3 (Built-in, Recommended)
```bash
# Navigate to the frontend directory
cd krishi-sahyog-frontend

# Start the server on port 8000
python -m http.server 8000
```
Open your browser and navigate to: **`http://localhost:8000`**

### Option B: Using Node.js / npx
```bash
cd krishi-sahyog-frontend
npx serve .
# Or: npx http-server -p 8000
```

### Option C: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 4. Architecture & Design Decisions

### 1. Plain HTML, CSS, and Vanilla JavaScript (No Frameworks)
- **Zero build step required:** No `npm install`, Webpack, Vite, or Babel needed.
- **Ultra-lightweight:** Loads instantly on 2G/3G mobile networks in rural India.
- **Direct DOM Manipulation:** Small footprint, easy to audit, inspect, and maintain.

### 2. Standalone Tailwind CSS
- Uses a local, standalone Tailwind runtime (`js/tailwind.js`, 407 KB) pre-cached by the service worker.
- Provides utility classes matching the Google Stitch designs while working **100% offline** without calling external CDNs (`cdn.tailwindcss.com`).

### 3. Single-Language Engine (`js/language.js`)
- Unlike many bilingual portals that clutter the UI with `Scheme Name / योजना का नाम`, KRISHI Sahyog strictly follows a **Single-Language Mode**:
  - The UI renders **either** pure English **or** pure Hindi at any given time.
  - The language toggle button (`EN` / `हिं`) dynamically updates all elements possessing `data-i18n` or `data-i18n-placeholder` attributes.
  - Selected language is persisted in `localStorage` under `krishi_language` and synchronizes the HTML root attribute: `<html lang="en">` or `<html lang="hi">`.
  - When in Hindi mode, the font automatically shifts to **Noto Sans Devanagari** for crisp native typography.

### 4. 100% Offline PWA & Self-Contained Assets
- **Web Fonts:** Material Symbols Outlined (`css/fonts/material-symbols.woff2`) and Noto Sans Devanagari are served locally via `css/fonts/fonts.css`.
- **Service Worker (`service-worker.js`):** Employs a stale-while-revalidate cache strategy caching all HTML, JS, CSS, JSON datasets, fonts, and images.
- **Web App Manifest (`manifest.json`):** Allows farmers to "Install App" or "Add to Home Screen" on Android devices.
- **Live Connection Monitor:** A pill indicator in the header and storage settings dynamically shows `Online` (green) or `Offline Mode` (amber) via `navigator.onLine` and `window.addEventListener('online'/'offline')`.

### 5. Accessibility & Rural Usability Features
- **Adjustable Font Sizing (`A-`, `A`, `A+`):** Modifies the root font-size (`text-size-sm`: 87.5%, `text-size-md`: 100%, `text-size-lg`: 112.5%).
- **Sunlight Mode:** High-contrast color scheme optimized for outdoor phone viewing in direct sunlight.
- **Voice Readout:** Built-in Web Speech API helper (`window.speechSynthesis`) to read critical scheme instructions and weather warnings aloud for low-literacy users.

---

## 5. Dummy Data vs Real Backend Implementation

To ensure frontend autonomy, all features currently utilize mock JSON or client-side storage. Below is the mapping for backend engineers to integrate real production APIs:

| Feature / UI Component | Current Dummy Data Location | Target API Endpoint | HTTP Method | Request Payload / Query Params | Expected Response Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Schemes List** | `data/schemes.json` | `/api/v1/schemes` | `GET` | `?category=finance&lang=hi&search=kisan` | `[ { "id": "pm-kisan", "title": { "en": "...", "hi": "..." }, "category": "finance", ... } ]` |
| **Scheme Detail** | `data/schemes.json` (filtered by `?id=`) | `/api/v1/schemes/:id` | `GET` | `id` in route path (e.g. `/api/v1/schemes/pm-kisan`) | Single scheme object with complete criteria, document checklists, and FAQs |
| **Weather & Advisories** | `data/weather.json` | `/api/v1/weather/forecast` | `GET` | `?lat=20.7453&lon=78.6022` or `?district=wardha` | `{ "district": "Wardha", "temperature": 29, "alert": { ... }, "forecast": [ ... ], "advisories": [ ... ] }` |
| **Scheme Verification** | `js/check-scheme.js` (client fuzzy matcher) | `/api/v1/schemes/verify` | `POST` | `{ "query": "PM Kisan Free Tractor", "source": "whatsapp" }` | `{ "status": "scam" \| "genuine" \| "warning", "confidence": 0.95, "matchedScheme": { ... }, "advisory": "..." }` |
| **Report Scam Link** | `js/check-scheme.js` (mock alert) | `/api/v1/scams/report` | `POST` | `{ "url": "http://pm-kisan-free.xyz", "reportedBy": "9876543210", "notes": "..." }` | `{ "success": true, "ticketId": "SCAM-9281" }` |
| **Send OTP** | `js/login.js` (simulated delay & console log) | `/api/v1/auth/send-otp` | `POST` | `{ "mobile": "9876543210", "state": "Maharashtra" }` | `{ "success": true, "expiresInSeconds": 30 }` |
| **Verify OTP** | `js/otp.js` (matches `"123456"`) | `/api/v1/auth/verify-otp` | `POST` | `{ "mobile": "9876543210", "otp": "123456" }` | `{ "token": "jwt_token_xyz", "user": { "id": "usr_123", "mobile": "9876543210", "name": "Kisan" } }` |
| **Sync Offline Cache** | `data/schemes.json`, `data/weather.json` | `/api/v1/sync/diff` | `GET` | `?lastSyncTimestamp=1727800000` | `{ "updatedSchemes": [ ... ], "deletedSchemeIds": [ ... ], "currentWeather": { ... } }` |

---

## 6. Browser & Device Compatibility

- **Mobile First:** Optimized for viewport widths from 320px (budget Indian smartphones like JioPhone Next, Redmi, Samsung Galaxy M) up to 4K desktops.
- **Tested Browsers:**
  - Google Chrome / Chromium Mobile (Android 7.0+)
  - Mozilla Firefox / Firefox for Android
  - Apple Safari (iOS 14+)
  - Microsoft Edge & Opera Mobile
- **Progressive Degradation:**
  - If Web Speech API is unsupported, the voice readout button fails gracefully without crashing.
  - If Service Worker is blocked (e.g. private browsing), standard network fetch operations continue to work seamlessly.

---

## 7. Developer & Team Integration Notes

1. **Plugging In API Calls:**
   - In `js/schemes.js`, replace the `fetch('data/schemes.json')` call with a configurable API URL constant (e.g., `const API_BASE = window.ENV?.API_BASE || '/api/v1'`).
   - In `js/otp.js`, replace the mock condition `if (code === '123456')` with an asynchronous `fetch('/api/v1/auth/verify-otp', { method: 'POST', body: ... })`.
2. **Adding Translations:**
   - Add new translation strings to both `lang/en.json` and `lang/hi.json` with matching keys.
   - Run `python audit_check.py` to ensure key parity and verify that all HTML elements use valid keys.
3. **Updating Design & Icons:**
   - All icons use standard Material Symbols Outlined glyph names (e.g., `verified`, `shield_check`, `wb_sunny`, `cloud`).
   - Avoid adding external CSS or JavaScript dependencies to maintain ultra-fast load times.

---

## 8. License & Attribution

- Built as part of the **KRISHI Sahyog** farmer empowerment initiative.
- Designed from Google Stitch UI/UX specifications.
- Data referenced from official Indian Government repositories: [pmkisan.gov.in](https://pmkisan.gov.in), [pmfby.gov.in](https://pmfby.gov.in), [mausam.imd.gov.in](https://mausam.imd.gov.in).
