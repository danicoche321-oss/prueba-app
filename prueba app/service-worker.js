const CACHE_NAME = 'antigravity-v1';
const urlsToCache = [
    '/index.html',
    '/manifest.json',
    '/css/index.css',
    '/js/theme.js',
    '/assets/push_illustration.png',
    '/assets/pull_illustration.png',
    '/assets/legs_illustration.png',
    '/assets/icon-192.png',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://unpkg.com/lucide@latest',
    'https://unpkg.com/lucide-react@latest',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip Firebase requests (always go to network)
    if (event.request.url.includes('firebaseio.com') ||
        event.request.url.includes('googleapis.com') ||
        event.request.url.includes('gstatic.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
