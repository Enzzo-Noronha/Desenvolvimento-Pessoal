const CACHE_NAME = "build-you-v1";
const OFFLINE_PAGE = "index.html";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/css/style.css",
  "/src/js/main.js",
  "/src/img/icon-192x192.png",
  "/src/img/icon-512x512.png",
];

// Pula a fase de espera e ativa imediatamente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Instala e faz cache dos assets essenciais
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
  );
});

// Remove caches antigos ao ativar nova versão
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// Estratégia: Cache primeiro, rede como fallback, offline page como último recurso
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((networkResp) => {
          // Salva no cache dinamicamente
          const clone = networkResp.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return networkResp;
        })
        .catch(async () => {
          // Offline: retorna a página principal
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_PAGE);
        });
    }),
  );
});
