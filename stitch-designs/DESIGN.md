---
name: Krishi Sahyog
colors:
  surface: '#effcf9'
  surface-dim: '#cfddd9'
  surface-bright: '#effcf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7f3'
  surface-container: '#e3f1ed'
  surface-container-high: '#ddebe8'
  surface-container-highest: '#d8e5e2'
  on-surface: '#121e1c'
  on-surface-variant: '#40493d'
  inverse-surface: '#273331'
  inverse-on-surface: '#e6f4f0'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#79564b'
  on-secondary: '#ffffff'
  secondary-container: '#fed0c1'
  on-secondary-container: '#79574c'
  tertiary: '#774c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#986200'
  on-tertiary-container: '#ffeede'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#e9bdae'
  on-secondary-fixed: '#2d150d'
  on-secondary-fixed-variant: '#5e3f35'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb957'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#effcf9'
  on-background: '#121e1c'
  surface-variant: '#d8e5e2'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 30px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  subtext-bilingual:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.375rem
  space-sm: 0.625rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system is engineered for rural accessibility, high sunlight legibility, and uncompromising trust. It bridges formal government assistance and grassroots farming communities across India. The aesthetic blends **Tactile / Modern Civic** clarity with **High-Contrast Utilitarianism**, tailored specifically for low-end Android hardware, variable network connectivity, and low digital literacy.

### Personality & Emotional Tenets
- **Trustworthy & Authoritative (विश्वास):** Unambiguous verification badges and official scheme statuses clear up misinformation and prevent predatory scams.
- **Approachable & Grounded (सरल एवं सहज):** Organic, agricultural tones (leaf green, rich soil brown, harvest gold) evoke familiar physical landscapes rather than sterile bureaucratic software.
- **Empowering & Direct (आत्मनिर्भर):** Dual-script typography (English with contextual Devanagari Hindi support), prominent iconography, voice-first triggers, and unambiguous visual state indicators ensure no farmer is excluded by text complexity or literacy hurdles.

### Design Movement & Core Rules
- **Physicality over abstraction:** High-contrast 1.5px borders define every tappable boundary, mimicking physical ledger cards and stamp-verified credentials.
- **Multimodal reinforcement:** Every critical interactive element pairs a high-contrast icon, an English label, and a Devanagari translation or text-to-speech audio trigger.
- **Zero reliance on motion or pure opacity:** States are communicated via high-contrast fills, crisp glyphs, and distinct borders rather than subtle micro-interactions or blur effects that choke budget processors.

## Colors

The palette prioritizes outdoor glare performance (WCAG AAA contrast compliance wherever possible) and deep cultural resonance with agrarian ecosystems.

### Palette Architecture
- **Primary (`#2E7D32` Deep Leaf Green):** Core actions, confirmed verification markers, primary buttons, and official status containers. Represents fertility, security, and validated government records.
- **Secondary (`#6D4C41` Soil Earth Brown):** Secondary actions, metadata badges, soil advisory panels, and grounded structural frames.
- **Tertiary / Accent (`#F9A825` Warm Harvest Amber):** Alerts, urgent advisory notices, pending review badges, and audio-action highlights.
- **Neutral Primary (`#1C2826` Carbon Charcoal):** High-density text on light surfaces ensuring maximum outdoor readability.
- **Surface & Canvas:** Base canvas uses `#FFFDF5` (Soft Organic Cream) to reduce eye fatigue under harsh sunlight. Elevating surfaces and interactive card bodies utilize `#FFFFFF` (Crisp Pure White) backed by `#E0E0D1` structural borders.

### Semantic Tiers
- **Verified / Genuine:** `#2E7D32` (Leaf Green) paired with green badge fill `#E8F5E9`.
- **Fraud / Fake Scheme Alert:** `#C62828` (Crimson Alert) paired with `#FFEBEE` container fill.
- **Cautionary / Review Required:** `#EF6C00` (Direct Amber Orange) paired with `#FFF3E0` container fill.
- **Weather / Meteorological Intelligence:** `#0277BD` (Deep Sky Blue) paired with `#E1F5FE` container fill.
- **Offline / Sync Standby:** `#546E7A` (Muted Slate) paired with `#ECEFF1` container fill.

## Typography

Typography relies on **Noto Sans** (with full fallback to **Noto Sans Devanagari** and universal system sans-serif fonts), guaranteeing glyph density and uncompromised rendering across fragmented Android releases.

### Bilingual Stacking Rules
- **Primary-Secondary Pairs:** High-level headers and interactive components feature two-line typography: English primary atop (e.g., `18px/SemiBold`), accompanied directly underneath by the Devanagari translation (e.g., `14px/Medium` in `#5D4037`).
- **Minimum Body Size:** Never set running body text beneath `16px`. Set `line-height` universally to `1.6` for optimal Devanagari conjunct, matra, and vowel-sign clearance.
- **Letter Spacing:** Do not condense or track Devanagari text negatively; preserve natural optical spacing to prevent diacritic clipping.

## Layout & Spacing

A fluid, safe-area-driven layout system ensures critical information is legible on low-resolution portrait displays (320px–412px wide) while adapting predictably to rugged tablets and desktop kiosk stations.

### Grid & Breakpoints
- **Mobile Handset (<600px):** 4-column fluid layout with `16px` outer canvas margins and `16px` gutters. Critical workflows (weather warnings, scheme validation) are strictly single-column stacked cards to prevent horizontal scrolling or visual fragmentation.
- **Tablet & Common Service Center (CSC) Kiosks (600px - 1024px):** 8-column layout with `20px` gutters and `24px` margins. Allows side-by-side comparison between authentic policies and detected counterfeit schemes.
- **Desktop Portal (>1024px):** 12-column layout maxed at `1200px` content width with `24px` gutters and `40px` margins.

### Touch Target Standard
All interactive elements (buttons, inputs, audio icons, selection chips) maintain a hard minimum physical hit target of **48px**, with **56px** preferred for primary actions to accommodate outdoor handling, uncalibrated screen protectors, and dirty or wet hands.

## Elevation & Depth

To maximize performance on resource-constrained chipsets and preserve clarity under direct sunlight, this design system avoids heavy shadows, multiple blur layers, and translucent glassmorphism.

### Tactile Physical Layers
- **Level 0 (Canvas):** Flat base `#FFFDF5`. No elevation.
- **Level 1 (Cards, Form Containers, Panels):** Pure white background (`#FFFFFF`) framed by a crisp 1.5px solid border (`#E0E0D1`). Grounded by an ambient drop shadow: `0px 2px 4px rgba(28, 40, 38, 0.06)`.
- **Level 2 (Active/Pressed Cards, Dropdown Panels, Sticky Footers):** Crisp 1.5px solid border (`#D0D0BF`), supported by a high-definition tactile shadow: `0px 4px 10px rgba(28, 40, 38, 0.12)`.
- **Level 3 (Modal Alerts, Fake Scheme Warning Banners):** Crisp 2px solid border in the dominant semantic color (e.g., `#C62828` for scams, `#2E7D32` for approvals), accompanied by a high-contrast protective shadow: `0px 8px 24px rgba(28, 40, 38, 0.18)`.

## Shapes

The design uses balanced, tactile corners (`roundedness: 2`). Cards and containers use `1rem` (16px) border radii, presenting an approachable, handheld-friendly surface. Buttons, text fields, and prominent verification tags maintain rounded profiles without turning into frictionless, slippery pills.

### Geometry Specifications
- **Standard Surfaces (Cards, Advisory Boxes, Media Panels):** `16px` corner radius.
- **Interactive Controls (Inputs, Primary Buttons, Action Sheets):** `12px` to `16px` corner radius.
- **Compact Badges & Verification Seals:** `8px` corner radius to retain stamp-like legal authenticity.
- **Audio & Quick Action Buttons:** Perfectly circular (`50%` radius) with minimum dimensions of `48px x 48px`.

## Components

### Buttons
- **Primary Action (Call to Action / Confirm):** Minimum height `56px`. Fill `#2E7D32`, active/pressed `#1B5E20`. Text `#FFFFFF`. Contains high-contrast leading icon (24px), bold English action text (`16px/700`), and a secondary line in Devanagari (`13px/500`) centered or left-aligned within the button.
- **Secondary Action (Soil Brown / Utility):** Fill `#FFFFFF`, 2px solid `#6D4C41` border. Text `#6D4C41`. Minimum height `48px`.
- **Audio / Listen Button (सुनें):** Tactile floating or inline button. Bright Harvest Yellow fill (`#F9A825`) with deep charcoal text (`#1C2826`) and speaker icon, enabling instant text-to-speech audio readout for accessibility.

### Scheme Verification Cards
- **Verified Official Scheme Card:** Pure white surface (`#FFFFFF`), 1.5px solid green border (`#2E7D32`), topped with a dedicated 32px-high header banner in `#E8F5E9` sporting a check-shield icon and bilingual text: "VERIFIED GOVT SCHEME / सरकारी मान्यता प्राप्त".
- **Counterfeit / Fake Scheme Warning Card:** 2px solid crimson border (`#C62828`), subtle red background tint (`#FFEBEE`), high-contrast alert badge ("SCAM ALERT / फर्जी योजना से सावधान"), explicit cross icon, and highlighted guidance on reported fraudulent phone numbers or unauthorized payment demands.

### Weather Prediction & Agro-Advisory Panels
- **Meteorological Card:** Crisp white container framed by `#0277BD`. Top area displays high-contrast weather vector line art (rain cloud, intense sun, thunderstorm) alongside large current temperature metrics (`32px/700`). Includes direct agricultural advisory notes ("Do not spray pesticides today due to expected rainfall / बारिश की संभावना, आज कीटनाशक न छिड़कें").

### Input Fields & Search Bars
- **Design:** Minimum height `56px`, 2px solid border (`#5D4037`), background `#FFFFFF`. Focus state triggers a 3px border in `#2E7D32` with zero layout shift.
- **Speech/Voice Search Integration:** Every search bar embeds a 48px tactile microphone icon inside the right edge (`#2E7D32`), enabling voice queries in regional dialects.

### Status Chips & Connectivity Badges
- **Offline Mode Indicator:** Persistent pill-tag at viewport top-right (`#ECEFF1`, border 1px solid `#546E7A`, text `#37474F`): "OFFLINE / बिना इंटरनेट सेव्ड".
- **Category Filter Chips:** Height `44px`, horizontal scroll with snapped padding. Unselected: `#FFFFFF` with 1.5px border `#E0E0D1`. Selected: `#2E7D32` with white text and bold status dot.