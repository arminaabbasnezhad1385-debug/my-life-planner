/* =========================================
   MY LIFE PLANNER
   PWA + AUTH GUARD LOADER
========================================= */

(function () {

    "use strict";


    if (
        window.PlannerPWA
    ) {

        return;

    }



    let deferredPrompt =
        null;


    let installButton =
        null;



    /* =========================================
       PATH
    ========================================= */

    function isPagesFolder() {

        return window.location.pathname
            .includes(
                "/pages/"
            );

    }



    /* =========================================
       LOAD AUTH GUARD
    ========================================= */

    function loadAuthGuard() {

        if (
            window.PlannerAuthGuard

            ||

            document.querySelector(
                "script[data-planner-auth-guard]"
            )
        ) {

            return;

        }


        const script =
            document.createElement(
                "script"
            );


        script.src =
            isPagesFolder()

                ?

                "../js/auth-guard.js"

                :

                "js/auth-guard.js";


        script.setAttribute(
            "data-planner-auth-guard",
            ""
        );


        document.head.appendChild(
            script
        );

    }



    /* =========================================
       LANGUAGE
    ========================================= */

    function getLanguage() {

        return (
            localStorage.getItem(
                "myPlannerLanguage"
            )
            ===
            "fa"

                ?

                "fa"

                :

                "en"
        );

    }



    function getText(
        english,
        persian
    ) {

        return (
            getLanguage()
            ===
            "fa"

                ?

                persian

                :

                english
        );

    }



    /* =========================================
       IOS
    ========================================= */

    function isIOS() {

        return (

            /iphone|ipad|ipod/i
                .test(
                    navigator.userAgent
                )

            ||

            (
                navigator.platform
                ===
                "MacIntel"

                &&

                navigator.maxTouchPoints
                >
                1
            )

        );

    }



    /* =========================================
       STANDALONE
    ========================================= */

    function isStandalone() {

        return (

            window.matchMedia(
                "(display-mode: standalone)"
            ).matches

            ||

            window.navigator
                .standalone
            ===
            true

        );

    }



    /* =========================================
       MANIFEST
    ========================================= */

    function addManifest() {

        if (
            document.querySelector(
                'link[rel="manifest"]'
            )
        ) {

            return;

        }


        const link =
            document.createElement(
                "link"
            );


        link.rel =
            "manifest";


        link.href =
            isPagesFolder()

                ?

                "../manifest.webmanifest"

                :

                "manifest.webmanifest";


        document.head.appendChild(
            link
        );

    }



    /* =========================================
       THEME COLOR
    ========================================= */

    function addThemeColor() {

        let meta =
            document.querySelector(
                'meta[name="theme-color"]'
            );


        if (!meta) {

            meta =
                document.createElement(
                    "meta"
                );


            meta.name =
                "theme-color";


            document.head.appendChild(
                meta
            );

        }


        meta.content =
            "#c08b94";

    }



    /* =========================================
       APPLE
    ========================================= */

    function addAppleMeta() {

        const metas = [

            {
                name:
                    "apple-mobile-web-app-capable",

                content:
                    "yes"
            },

            {
                name:
                    "apple-mobile-web-app-status-bar-style",

                content:
                    "default"
            },

            {
                name:
                    "apple-mobile-web-app-title",

                content:
                    "Planner"
            }

        ];


        metas.forEach(
            function(item) {

                if (
                    document.querySelector(
                        `meta[name="${item.name}"]`
                    )
                ) {

                    return;

                }


                const meta =
                    document.createElement(
                        "meta"
                    );


                meta.name =
                    item.name;


                meta.content =
                    item.content;


                document.head.appendChild(
                    meta
                );

            }
        );

    }



    /* =========================================
       STYLE
    ========================================= */

    function createStyle() {

        if (
            document.getElementById(
                "planner-pwa-style"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "planner-pwa-style";


        style.textContent = `

            .planner-install-button {

                position: fixed;

                bottom: 18px;
                right: 18px;

                z-index: 999990;

                display: none;

                align-items: center;
                justify-content: center;

                min-height: 48px;

                padding:
                    0
                    18px;

                border: none;

                border-radius: 15px;

                background:
                    #c08b94;

                color:
                    #ffffff;

                box-shadow:
                    0
                    8px
                    30px
                    rgba(
                        0,
                        0,
                        0,
                        0.18
                    );

                cursor: pointer;

                font-size: 14px;

                font-weight: 700;

            }


            html[dir="rtl"]
            .planner-install-button {

                right: auto;

                left: 18px;

            }


            @media (
                max-width: 600px
            ) {

                .planner-install-button {

                    right: 12px;

                    bottom: 12px;

                }


                html[dir="rtl"]
                .planner-install-button {

                    right: auto;

                    left: 12px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }



    /* =========================================
       INSTALL BUTTON
    ========================================= */

    function createInstallButton() {

        if (
            document.querySelector(
                ".planner-install-button"
            )
        ) {

            installButton =
                document.querySelector(
                    ".planner-install-button"
                );


            return;

        }


        installButton =
            document.createElement(
                "button"
            );


        installButton.type =
            "button";


        installButton.className =
            "planner-install-button";


        installButton.setAttribute(
            "data-language-ignore",
            ""
        );


        installButton.addEventListener(
            "click",
            installApp
        );


        document.body.appendChild(
            installButton
        );


        updateButtonText();

    }



    function updateButtonText() {

        if (
            !installButton
        ) {

            return;

        }


        installButton.textContent =
            getText(

                "📲 Install App",

                "📲 نصب برنامه"

            );

    }



    function showButton() {

        if (
            installButton
            &&
            !isStandalone()
        ) {

            installButton.style.display =
                "flex";

        }

    }



    function hideButton() {

        if (
            installButton
        ) {

            installButton.style.display =
                "none";

        }

    }



    /* =========================================
       INSTALL
    ========================================= */

    async function installApp() {

        if (
            isIOS()
            &&
            !deferredPrompt
        ) {

            alert(

                getText(

                    "Open this website in Safari, tap Share, then choose Add to Home Screen.",

                    "سایت را در Safari باز کنید، روی Share بزنید و سپس Add to Home Screen را انتخاب کنید."

                )

            );


            return;

        }


        if (
            !deferredPrompt
        ) {

            alert(

                getText(

                    "The install option is not available yet.",

                    "گزینه نصب هنوز آماده نیست."

                )

            );


            return;

        }


        deferredPrompt.prompt();


        try {

            await deferredPrompt
                .userChoice;

        }

        catch(error) {

            console.error(
                error
            );

        }


        deferredPrompt =
            null;


        hideButton();

    }



    /* =========================================
       EVENTS
    ========================================= */

    window.addEventListener(

        "beforeinstallprompt",

        function(event) {

            event.preventDefault();


            deferredPrompt =
                event;


            showButton();

        }

    );


    window.addEventListener(

        "appinstalled",

        function() {

            deferredPrompt =
                null;


            hideButton();

        }

    );


    window.addEventListener(

        "plannerLanguageChanged",

        function() {

            updateButtonText();

        }

    );



    /* =========================================
       SERVICE WORKER
    ========================================= */

    function registerServiceWorker() {

        if (
            !(
                "serviceWorker"
                in
                navigator
            )
        ) {

            return;

        }


        if (
            window.location.protocol
            ===
            "file:"
        ) {

            return;

        }


        const workerPath =
            isPagesFolder()

                ?

                "../sw.js"

                :

                "sw.js";


        navigator
            .serviceWorker
            .register(
                workerPath
            )
            .then(
                function(registration) {

                    console.log(
                        "Service Worker:",
                        registration.scope
                    );

                }
            )
            .catch(
                function(error) {

                    console.error(
                        "Service Worker error:",
                        error
                    );

                }
            );

    }



    /* =========================================
       START
    ========================================= */

    function start() {

        /*
            LOGIN PROTECTION
        */

        loadAuthGuard();


        /*
            PWA
        */

        addManifest();

        addThemeColor();

        addAppleMeta();

        createStyle();

        createInstallButton();

        registerServiceWorker();


        if (
            isStandalone()
        ) {

            hideButton();

        }

        else if (
            isIOS()
        ) {

            showButton();

        }

    }



    /* =========================================
       GLOBAL
    ========================================= */

    window.PlannerPWA = {

        install:
            installApp,

        isStandalone:
            isStandalone

    };



    if (
        document.readyState
        ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            start,

            {
                once:
                    true
            }

        );

    }

    else {

        start();

    }

})();