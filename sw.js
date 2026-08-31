/* =========================================
   MY LIFE PLANNER
   SERVICE WORKER
========================================= */

const CACHE_NAME =
    "my-life-planner-v3";


const CORE_FILES = [

    "./",

    "./index.html",

    "./auth.html",

    "./manifest.webmanifest",

    "./css/style.css",

    "./js/app.js",

    "./js/planner-language.js",

    "./js/pwa.js",

    "./js/auth-guard.js",

    "./js/supabase-config.js",

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
                            CORE_FILES
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
                    function(names) {

                        return Promise.all(

                            names
                                .filter(
                                    function(name) {

                                        return (
                                            name
                                            !==
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


        const url =
            new URL(
                event.request.url
            );


        if (
            url.origin
            !==
            self.location.origin
        ) {

            return;

        }


        event.respondWith(

            fetch(
                event.request
            )
                .then(
                    function(response) {

                        if (
                            response
                            &&
                            response.status
                            ===
                            200
                        ) {

                            const clone =
                                response.clone();


                            caches
                                .open(
                                    CACHE_NAME
                                )
                                .then(
                                    function(cache) {

                                        cache.put(
                                            event.request,
                                            clone
                                        );

                                    }
                                );

                        }


                        return response;

                    }
                )
                .catch(
                    function() {

                        return caches
                            .match(
                                event.request
                            )
                            .then(
                                function(cached) {

                                    if (
                                        cached
                                    ) {

                                        return cached;

                                    }


                                    if (
                                        event.request.mode
                                        ===
                                        "navigate"
                                    ) {

                                        return caches.match(
                                            "./index.html"
                                        );

                                    }

                                }
                            );

                    }
                )

        );

    }

);