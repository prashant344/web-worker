self.addEventListener("fetch", (e) => {
  console.log(`intercepting ${e.request.method} to ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("CUSTOM_CACHE")
      .then((cache) => cache.addAll(["./Walmart-logo.png"]))
  );
});
