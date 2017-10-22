var CACHE_NAME = 'static-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/scripts.js',
                '/lib/css/material.cyan-light_blue.min.css',
                '/node_modules/material-design-icons/iconfont/material-icons.css',
                '/images/android-desktop.png',
                '/images/favicon.ico',
                '/lib/js/material.min.js',
                '/images/user.jpg'
            ]);
        })
    );
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});