/* =========================================
   MY LIFE PLANNER
   SERVICE WORKER
========================================= */

const CACHE_NAME =
    "my-life-planner-v1";


const APP_FILES = [

    "./",

    "./index.html",

    "./auth.html",

    "./css/style.css",

    "./js/app.js",

    "./js/planner-language.js",

    "./js/pwa.js",

    "./manifest.webmanifest",

    "./assets/icons/planner-icon.svg"

];



/* =========================================
   INSTALL
========================================= */

self.addEventListener(
    "install",
    function(event) {

        event.waitUntil(

            caches
                .open(
                    CACHE_NAME
                )
                .then(
                    function(cache) {

                        return cache.addAll(
                            APP_FILES
                        );

                    }
                )

        );


        self.skipWaiting();

    }
);



/* =========================================
   ACTIVATE
========================================= */

self.addEventListener(
    "activate",
    function(event) {

        event.waitUntil(

            caches
                .keys()
                .then(
                    function(cacheNames) {

                        return Promise.all(

                            cacheNames
                                .filter(
                                    function(name) {

                                        return (
                                            name !==
                                            CACHE_NAME
                                        );

                                    }
                                )
                                .map(
                                    function(name) {

                                        return caches.delete(
                                            name
                                        );

                                    }
                                )

                        );

                    }
                )

        );


        self.clients.claim();

    }
);



/* =========================================
   FETCH
========================================= */

self.addEventListener(
    "fetch",
    function(event) {

        if (
            event.request.method
            !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(
                    event.request
                )
                .then(
                    function(cachedResponse) {

                        if (
                            cachedResponse
                        ) {

                            return cachedResponse;

                        }


                        return fetch(
                            event.request
                        )
                            .then(
                                function(networkResponse) {

                                    if (
                                        !networkResponse
                                        ||
                                        networkResponse.status
                                        !==
                                        200
                                    ) {

                                        return networkResponse;

                                    }


                                    const responseClone =
                                        networkResponse.clone();


                                    caches
                                        .open(
                                            CACHE_NAME
                                        )
                                        .then(
                                            function(cache) {

                                                cache.put(

                                                    event.request,

                                                    responseClone

                                                );

                                            }
                                        );


                                    return networkResponse;

                                }
                            );

                    }
                )

        );

    }
);