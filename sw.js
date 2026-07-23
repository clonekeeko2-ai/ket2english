// ⚡ CACHE VERSION - Tăng số này mỗi khi deploy code mới để xóa cache cũ
const CACHE_NAME = 'thamtu-lop5-v28';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js?v=28',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Khi cài service worker mới, mở cache mới
self.addEventListener('install', event => {
  self.skipWaiting(); // Kích hoạt ngay, không chờ tab cũ đóng
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Khi activate: XÓA TẤT CẢ cache cũ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // Chiếm quyền kiểm soát tab ngay
  );
});

// Fetch: Network first cho HTML/JS/CSS, cache fallback cho assets khác
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Với file .html, .js, .css: Luôn lấy mới từ mạng trước
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  // Với assets khác: Cache first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
