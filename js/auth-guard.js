/* =========================================
   MY LIFE PLANNER
   AUTH GUARD
========================================= */

(function () {

    "use strict";


    /* =========================================
       PREVENT DOUBLE LOAD
    ========================================= */

    if (
        window.PlannerAuthGuard
    ) {

        return;

    }



    /* =========================================
       BASIC SETTINGS
    ========================================= */

    const isPagesFolder =
        window.location.pathname
            .includes(
                "/pages/"
            );


    const basePath =
        isPagesFolder
            ?
            "../"
            :
            "";


    const authPage =
        basePath
        +
        "auth.html";



    /* =========================================
       LOCAL FILE MODE

       فایل لوکال را قفل نمی‌کنیم.
       تا بتوانی اطلاعات قدیمی را ببینی
       و Backup بگیری.
    ========================================= */

    if (
        window.location.protocol
        ===
        "file:"
    ) {

        console.log(
            "Auth Guard skipped for file:// mode."
        );


        window.PlannerAuthGuard = {

            protected:
                false,

            reason:
                "local-file"

        };


        return;

    }



    /* =========================================
       HIDE PAGE UNTIL LOGIN CHECK
    ========================================= */

    document.documentElement
        .classList
        .add(
            "planner-auth-checking"
        );



    /* =========================================
       STYLE
    ========================================= */

    function addAuthStyle() {

        if (
            document.getElementById(
                "planner-auth-guard-style"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "planner-auth-guard-style";


        style.textContent = `

            html.planner-auth-checking body {

                visibility: hidden;

            }


            .planner-logout-button {

                position: fixed;

                top: 14px;

                inset-inline-start: 14px;

                z-index: 999998;

                min-height: 42px;

                padding:
                    0
                    15px;

                border:
                    1px solid
                    rgba(
                        155,
                        107,
                        117,
                        0.20
                    );

                border-radius:
                    12px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.96
                    );

                color:
                    #9b6b75;

                box-shadow:
                    0
                    6px
                    20px
                    rgba(
                        80,
                        55,
                        50,
                        0.10
                    );

                cursor:
                    pointer;

                font-family:
                    inherit;

                font-size:
                    13px;

                font-weight:
                    700;

            }


            .planner-logout-button:hover {

                background:
                    #c08b94;

                color:
                    #ffffff;

            }


            .planner-auth-error {

                position: fixed;

                inset: 0;

                z-index: 9999999;

                display: flex;

                align-items: center;

                justify-content: center;

                padding: 20px;

                background:
                    #fff8f5;

                visibility: visible;

            }


            .planner-auth-error-card {

                width: 100%;

                max-width: 420px;

                padding: 30px;

                border-radius: 20px;

                background:
                    #ffffff;

                box-shadow:
                    0
                    15px
                    50px
                    rgba(
                        80,
                        55,
                        50,
                        0.14
                    );

                text-align: center;

                color:
                    #4a3f3a;

            }


            .planner-auth-error-card h2 {

                margin-top: 0;

                color:
                    #9b6b75;

            }


            .planner-auth-error-card button {

                min-height: 44px;

                margin-top: 15px;

                padding:
                    0
                    20px;

                border: none;

                border-radius: 11px;

                background:
                    #c08b94;

                color:
                    #ffffff;

                cursor: pointer;

                font-weight: 700;

            }


            @media (
                max-width: 550px
            ) {

                .planner-logout-button {

                    top: 8px;

                    inset-inline-start: 8px;

                    min-height: 36px;

                    padding:
                        0
                        10px;

                    font-size: 11px;

                }

            }

        `;


        document.head.appendChild(
            style
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



    function getLogoutText() {

        return (
            getLanguage()
            ===
            "fa"

                ?

                "خروج"

                :

                "Logout"
        );

    }



    /* =========================================
       LOAD SCRIPT
    ========================================= */

    function loadScript(
        src,
        id
    ) {

        return new Promise(
            function(
                resolve,
                reject
            ) {

                const oldScript =
                    document.getElementById(
                        id
                    );


                if (
                    oldScript
                ) {

                    if (
                        oldScript.dataset
                            .loaded
                        ===
                        "true"
                    ) {

                        resolve();

                        return;

                    }


                    oldScript.addEventListener(
                        "load",
                        function() {

                            resolve();

                        },
                        {
                            once:
                                true
                        }
                    );


                    oldScript.addEventListener(
                        "error",
                        function() {

                            reject(
                                new Error(
                                    "Could not load "
                                    +
                                    src
                                )
                            );

                        },
                        {
                            once:
                                true
                        }
                    );


                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.id =
                    id;


                script.src =
                    src;


                script.addEventListener(
                    "load",
                    function() {

                        script.dataset
                            .loaded =
                            "true";


                        resolve();

                    },
                    {
                        once:
                            true
                    }
                );


                script.addEventListener(
                    "error",
                    function() {

                        reject(
                            new Error(
                                "Could not load "
                                +
                                src
                            )
                        );

                    },
                    {
                        once:
                            true
                    }
                );


                document.head
                    .appendChild(
                        script
                    );

            }
        );

    }



    /* =========================================
       SUPABASE
    ========================================= */

    async function getSupabaseClient() {

        /* SUPABASE LIBRARY */

        if (
            !window.supabase
        ) {

            await loadScript(

                "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",

                "planner-supabase-library"

            );

        }



        /* SUPABASE CONFIG */

        if (
            !window.plannerSupabase
        ) {

            await loadScript(

                basePath
                +
                "js/supabase-config.js",

                "planner-supabase-config"

            );

        }



        if (
            !window.plannerSupabase
        ) {

            throw new Error(
                "Supabase client was not created."
            );

        }


        return window
            .plannerSupabase;

    }



    /* =========================================
       REDIRECT TO LOGIN
    ========================================= */

    function goToLogin() {

        window.location
            .replace(
                authPage
            );

    }



    /* =========================================
       SHOW PAGE
    ========================================= */

    function showPlanner() {

        document.documentElement
            .classList
            .remove(
                "planner-auth-checking"
            );

    }



    /* =========================================
       LOGOUT BUTTON
    ========================================= */

    function createLogoutButton(
        supabaseClient
    ) {

        if (
            document.querySelector(
                ".planner-logout-button"
            )
        ) {

            return;

        }


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "planner-logout-button";


        button.textContent =
            getLogoutText();


        button.setAttribute(
            "data-language-ignore",
            ""
        );


        button.addEventListener(
            "click",
            async function() {

                button.disabled =
                    true;


                button.textContent =
                    getLanguage()
                    ===
                    "fa"

                        ?

                        "در حال خروج..."

                        :

                        "Logging out...";


                try {

                    /*
                        IMPORTANT:

                        هیچ کدام از اطلاعات
                        Planner را پاک نمی‌کنیم.

                        localStorage.clear()
                        اینجا وجود ندارد.
                    */

                    await supabaseClient
                        .auth
                        .signOut();


                    goToLogin();

                }

                catch(error) {

                    console.error(
                        "Logout error:",
                        error
                    );


                    button.disabled =
                        false;


                    button.textContent =
                        getLogoutText();

                }

            }
        );


        document.body.appendChild(
            button
        );



        /* LANGUAGE CHANGE */

        window.addEventListener(

            "plannerLanguageChanged",

            function() {

                if (
                    !button.disabled
                ) {

                    button.textContent =
                        getLogoutText();

                }

            }

        );

    }



    /* =========================================
       AUTH ERROR
    ========================================= */

    function showError(
        error
    ) {

        console.error(
            "Auth Guard Error:",
            error
        );


        document.documentElement
            .classList
            .remove(
                "planner-auth-checking"
            );


        const oldError =
            document.querySelector(
                ".planner-auth-error"
            );


        if (
            oldError
        ) {

            oldError.remove();

        }


        const box =
            document.createElement(
                "div"
            );


        box.className =
            "planner-auth-error";


        const isPersian =
            getLanguage()
            ===
            "fa";


        box.innerHTML = `

            <div
                class="planner-auth-error-card"
            >

                <h2>
                    ${
                        isPersian
                            ?
                            "مشکل در بررسی ورود"
                            :
                            "Login check problem"
                    }
                </h2>

                <p>
                    ${
                        isPersian
                            ?
                            "اتصال اینترنت و تنظیمات Supabase را بررسی کنید."
                            :
                            "Check your internet connection and Supabase settings."
                    }
                </p>

                <button
                    type="button"
                    data-auth-reload
                >
                    ${
                        isPersian
                            ?
                            "تلاش دوباره"
                            :
                            "Try Again"
                    }
                </button>

            </div>

        `;


        document.body.appendChild(
            box
        );


        box.querySelector(
            "[data-auth-reload]"
        )
            .addEventListener(
                "click",
                function() {

                    window.location
                        .reload();

                }
            );

    }



    /* =========================================
       CHECK LOGIN
    ========================================= */

    async function checkLogin() {

        try {

            const supabaseClient =
                await getSupabaseClient();


            const {
                data,
                error
            } =
                await supabaseClient
                    .auth
                    .getSession();


            if (
                error
            ) {

                throw error;

            }



            /* NOT LOGGED IN */

            if (
                !data
                ||
                !data.session
                ||
                !data.session.user
            ) {

                goToLogin();

                return;

            }



            /* LOGGED IN */

            console.log(

                "Logged in user:",

                data.session
                    .user
                    .email

            );


            createLogoutButton(
                supabaseClient
            );


            showPlanner();



            /* =================================
               WATCH AUTH
            ================================= */

            supabaseClient
                .auth
                .onAuthStateChange(

                    function(
                        event,
                        session
                    ) {

                        if (
                            event
                            ===
                            "SIGNED_OUT"

                            ||

                            !session
                        ) {

                            goToLogin();

                        }

                    }

                );

        }

        catch(error) {

            showError(
                error
            );

        }

    }



    /* =========================================
       GLOBAL
    ========================================= */

    window.PlannerAuthGuard = {

        protected:
            true,

        check:
            checkLogin

    };



    /* =========================================
       START
    ========================================= */

    addAuthStyle();

    checkLogin();

})();