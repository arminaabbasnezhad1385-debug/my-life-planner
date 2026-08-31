/* =========================================
   MY LIFE PLANNER
   PWA / ADD TO HOME SCREEN
========================================= */

(function () {

    "use strict";


    /* =========================================
       STATE
    ========================================= */

    let deferredInstallPrompt =
        null;


    let installButton =
        null;



    /* =========================================
       LANGUAGE
    ========================================= */

    function getLanguage() {

        return (
            localStorage.getItem(
                "myPlannerLanguage"
            ) === "fa"
                ?
                "fa"
                :
                "en"
        );

    }



    function getInstallText() {

        return (
            getLanguage() === "fa"
                ?
                "📲 نصب برنامه"
                :
                "📲 Install App"
        );

    }



    /* =========================================
       CHECK STANDALONE
    ========================================= */

    function isStandalone() {

        return (

            window.matchMedia(
                "(display-mode: standalone)"
            ).matches

            ||

            window.navigator
                .standalone === true

        );

    }



    /* =========================================
       ADD MANIFEST
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


        const inPagesFolder =
            window.location.pathname
                .includes(
                    "/pages/"
                );


        link.href =
            inPagesFolder
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

        if (
            document.querySelector(
                'meta[name="theme-color"]'
            )
        ) {

            return;

        }


        const meta =
            document.createElement(
                "meta"
            );


        meta.name =
            "theme-color";


        meta.content =
            "#c08b94";


        document.head.appendChild(
            meta
        );

    }



    /* =========================================
       IOS META
    ========================================= */

    function addAppleMeta() {

        if (
            !document.querySelector(
                'meta[name="apple-mobile-web-app-capable"]'
            )
        ) {

            const capable =
                document.createElement(
                    "meta"
                );


            capable.name =
                "apple-mobile-web-app-capable";


            capable.content =
                "yes";


            document.head.appendChild(
                capable
            );

        }


        if (
            !document.querySelector(
                'meta[name="apple-mobile-web-app-status-bar-style"]'
            )
        ) {

            const statusBar =
                document.createElement(
                    "meta"
                );


            statusBar.name =
                "apple-mobile-web-app-status-bar-style";


            statusBar.content =
                "default";


            document.head.appendChild(
                statusBar
            );

        }


        if (
            !document.querySelector(
                'meta[name="apple-mobile-web-app-title"]'
            )
        ) {

            const title =
                document.createElement(
                    "meta"
                );


            title.name =
                "apple-mobile-web-app-title";


            title.content =
                "Planner";


            document.head.appendChild(
                title
            );

        }

    }



    /* =========================================
       BUTTON STYLE
    ========================================= */

    function addInstallStyle() {

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

                right: 20px;

                bottom: 20px;

                z-index: 999998;

                display: none;

                align-items: center;

                justify-content: center;

                min-height: 46px;

                padding:
                    0
                    18px;

                border:
                    none;

                border-radius:
                    14px;

                background:
                    #c08b94;

                color:
                    #ffffff;

                font-size:
                    14px;

                font-weight:
                    700;

                cursor:
                    pointer;

                box-shadow:
                    0
                    8px
                    25px
                    rgba(
                        70,
                        45,
                        45,
                        0.20
                    );

            }


            .planner-install-button:hover {

                transform:
                    translateY(-2px);

            }


            html[dir="rtl"]
            .planner-install-button {

                right:
                    auto;

                left:
                    20px;

            }


            @media (
                max-width: 550px
            ) {

                .planner-install-button {

                    right:
                        12px;

                    bottom:
                        12px;

                    min-height:
                        43px;

                    padding:
                        0
                        14px;

                    font-size:
                        12px;

                }


                html[dir="rtl"]
                .planner-install-button {

                    right:
                        auto;

                    left:
                        12px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }



    /* =========================================
       CREATE INSTALL BUTTON
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


        installButton.textContent =
            getInstallText();


        installButton.setAttribute(
            "data-language-ignore",
            ""
        );


        installButton.addEventListener(
            "click",
            installPlanner
        );


        document.body.appendChild(
            installButton
        );

    }



    /* =========================================
       UPDATE LANGUAGE
    ========================================= */

    function updateButtonLanguage() {

        if (
            installButton
        ) {

            installButton.textContent =
                getInstallText();

        }

    }



    /* =========================================
       SHOW
    ========================================= */

    function showInstallButton() {

        if (
            !installButton
            ||
            isStandalone()
        ) {

            return;

        }


        installButton.style.display =
            "flex";

    }



    /* =========================================
       HIDE
    ========================================= */

    function hideInstallButton() {

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

    async function installPlanner() {

        if (
            !deferredInstallPrompt
        ) {

            return;

        }


        deferredInstallPrompt.prompt();


        try {

            await deferredInstallPrompt
                .userChoice;

        }

        catch(error) {

            console.error(
                "Install error:",
                error
            );

        }


        deferredInstallPrompt =
            null;


        hideInstallButton();

    }



    /* =========================================
       INSTALL EVENT
    ========================================= */

    window.addEventListener(
        "beforeinstallprompt",
        function(event) {

            event.preventDefault();


            deferredInstallPrompt =
                event;


            showInstallButton();

        }
    );



    /* =========================================
       INSTALLED
    ========================================= */

    window.addEventListener(
        "appinstalled",
        function() {

            deferredInstallPrompt =
                null;


            hideInstallButton();


            console.log(
                "My Life Planner installed."
            );

        }
    );



    /* =========================================
       LANGUAGE EVENT
    ========================================= */

    window.addEventListener(
        "plannerLanguageChanged",
        updateButtonLanguage
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


        const inPagesFolder =
            window.location.pathname
                .includes(
                    "/pages/"
                );


        const workerPath =
            inPagesFolder
                ?
                "../sw.js"
                :
                "sw.js";


        window.addEventListener(
            "load",
            function() {

                navigator
                    .serviceWorker
                    .register(
                        workerPath
                    )
                    .then(
                        function(registration) {

                            console.log(
                                "Planner Service Worker registered:",
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
        );

    }



    /* =========================================
       START
    ========================================= */

    function startPWA() {

        addManifest();

        addThemeColor();

        addAppleMeta();

        addInstallStyle();

        createInstallButton();

        registerServiceWorker();


        if (
            isStandalone()
        ) {

            hideInstallButton();

        }

    }



    /* =========================================
       DOM READY
    ========================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startPWA,
            {
                once:
                    true
            }
        );

    }

    else {

        startPWA();

    }

})();