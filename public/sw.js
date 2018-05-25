const cacheName = 'news-v1';

const staticAssets = [
  './',
  './content/images/favicon.png',
  './content/styles.css',
  './content/mdb.min.css',
  './content/images/android-icon-192.png',
  './data/coorg.js',
  './script/script.js',
  './script/mdb.min.js',
];

self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('news-dynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Got Push?', {
      body: 'Push Message received'
   }));
});

/* FIREBASE */

importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

var config = {
	apiKey: "AIzaSyDoHDnSyMjdyjwkjzLBZv6BMjny-Z9Pyfo",
	authDomain: "trip-let.firebaseapp.com",
	databaseURL: "https://trip-let.firebaseio.com",
	projectId: "trip-let",
	storageBucket: "trip-let.appspot.com",
	messagingSenderId: "459259354047"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
