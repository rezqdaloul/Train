/* Offline cache for the Training app. Only ever touches this app's own files. */
const CACHE = 'training-v20';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
const OWN = new Set(ASSETS.map(a => new URL(a, self.registration.scope).href));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  // delete only this app's older caches; other apps on the same github.io origin keep theirs
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('training-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // never intercept other sites
  if (req.mode === 'navigate') {
    // network first so updates arrive; only a clean 200 from this origin may replace the cached app
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok && res.type === 'basic' && !res.redirected) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match('./index.html').then(r => r || Response.error()))
    );
    return;
  }
  if (!OWN.has(url.origin + url.pathname)) return;           // not one of ours: let the browser handle it
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    }))
  );
});
