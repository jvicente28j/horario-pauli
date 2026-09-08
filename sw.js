const CACHE = "horario-pauli-v7";


const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./panic-cat-1.webp",
  "./panic-cat-2.webp",
  "./panic-cat-3.webp",
  "./panic-cat-4.webp",
  "./panic-cat-5.webp",
  "./panic-cat-6.webp",
  "./panic-cat-7.webp",
  "./panic-cat-8.webp",
  "./panic-cat-9.gif",
  "./panic-cat-10.webp",
  "./panic-cat-11.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
