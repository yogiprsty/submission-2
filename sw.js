const CACHE_NAME = "clinfo";
const urlsToCache = [
    "./",
    "https://fonts.gstatic.com/s/oswald/v35/TK3iWkUHHAIjg752FD8Gl-1PK62t.woff2",
    "./assets/icon/apple-icon-120.jpg",
    "./assets/icon/apple-icon-152.jpg",
    "./assets/icon/apple-icon-167.jpg",
    "./assets/icon/apple-icon-180.jpg",
    "./assets/icon/manifest-icon-192.png",
    "./assets/icon/manifest-icon-512.png",
    "./assets/splash/apple-splash-640-1136.jpg",
    "./assets/splash/apple-splash-750-1334.jpg",
    "./assets/splash/apple-splash-1125-2436.jpg",
    "./assets/splash/apple-splash-1242-2208.jpg",
    "./assets/splash/apple-splash-1536-2048.jpg",
    "./assets/splash/apple-splash-1668-2224.jpg",
    "./assets/splash/apple-splash-2048-2732.jpg",
    "./manifest.json",
    "./nav.html",
    "./index.html",
    "./pages/teams.html",
    "./pages/favorite.html",
    "./pages/standings.html",
    "./css/materialize.min.css",
    "./css/styles.css",
    "./js/materialize.min.js",
    "./js/nav.js",
    "./js/api.js",
    "./js/idb.js",
    "./js/db.js",
    "./js/script.js",
    "./notify.js"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log("FETCH TERPANGGIL"); //del
    const base_url_standings = "https://api.football-data.org/v2/competitions/CL/standings";
    const base_url_teams = "https://api.football-data.org/v2/competitions/CL/teams";

    if (event.request.url.indexOf(base_url_standings) > -1) {
        console.log("IF FETCH STANDINGS TERPANGGIL"); //del
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    }else if (event.request.url.indexOf(base_url_teams) > -1) {
        console.log("IF FETCH Teams TERPANGGIL"); //del
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } 
    else {
        // console.log("ELSE FETCH TERPANGGIL"); //del
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('push called')
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});