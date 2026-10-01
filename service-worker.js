/**
 * KRISHI Sahyog - Service Worker
 * Enables 100% offline access to all agricultural schemes, weather data, and multi-language assets.
 */

const CACHE_NAME = 'krishi-sahyog-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './schemes.html',
  './scheme-detail.html',
  './weather.html',
  './check-scheme.html',
  './login.html',
  './otp.html',
  './settings.html',
  './language.html',
  './manifest.json',
  './css/style.css',
  './css/fonts/fonts.css',
  './css/fonts/material-symbols.woff2',
  './js/tailwind.js',
  './js/app.js',
  './js/language.js',
  './js/schemes.js',
  './js/weather.js',
  './data/schemes.json',
  './data/weather.json',
  './lang/en.json',
  './lang/hi.json',
  './assets/logo.svg',
  './assets/logo.png',
  './assets/farmer-hero.jpg',
  './assets/farmer-verified.jpg',
  './assets/csc-center.jpg',
  './assets/login-landscape.jpg',
  './assets/scheme-detail-hero.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell and offline data');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[ServiceWorker] Cache addAll partial notice:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Network failure is fine since cachedResponse was already served
          });
        return cachedResponse;
      }

      // If not cached, fetch from network and cache response
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If HTML request fails, return cached index.html
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
    })
  );
});
