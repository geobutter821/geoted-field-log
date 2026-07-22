"use strict";

const LAB_CACHE = "geoted-lab-bench-v1-20260721";
const LAB_SHELL = [
  "./",
  "./index.html",
  "./lab_data_app.html",
  "./lab.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(LAB_CACHE).then(cache => cache.addAll(LAB_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("geoted-lab-bench-") && key !== LAB_CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const allowed = new Set(LAB_SHELL.map(relative => new URL(relative, self.registration.scope).href));
  if (requestUrl.origin !== self.location.origin || !allowed.has(requestUrl.href)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const refresh = fetch(event.request).then(response => {
        if (response && response.ok) caches.open(LAB_CACHE).then(cache => cache.put(event.request, response.clone()));
        return response;
      });
      return cached || refresh;
    })
  );
});
