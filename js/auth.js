/* =========================================
   MY LIFE PLANNER
   LOGIN
========================================= */


/* =========================================
   DOM
========================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginEmail =
    document.getElementById(
        "loginEmail"
    );


const loginPassword =
    document.getElementById(
        "loginPassword"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


const authMessage =
    document.getElementById(
        "authMessage"
    );


const connectionStatus =
    document.getElementById(
        "connectionStatus"
    );


const showPassword =
    document.getElementById(
        "showPassword"
    );



/* =========================================
   SUPABASE CLIENT
========================================= */

const supabaseClient =
    window.plannerSupabase;



/* =========================================
   SHOW MESSAGE
========================================= */

function showMessage(
    text,
    type = "info"
) {

    authMessage.textContent =
        text;


    authMessage.className =
        "auth-message "
        +
        type;

}



/* =========================================
   CLEAR MESSAGE
========================================= */

function clearMessage() {

    authMessage.textContent =
        "";


    authMessage.className =
        "auth-message";

}



/* =========================================
   CONNECTION CHECK
========================================= */

function checkConnection() {

    if (!window.supabase) {

        connectionStatus.textContent =
            "❌ Supabase library did not load.";


        connectionStatus.className =
            "connection-status error";


        loginButton.disabled =
            true;


        return false;

    }


    if (!supabaseClient) {

        connectionStatus.textContent =
            "❌ Supabase configuration is not correct.";


        connectionStatus.className =
            "connection-status error";


        loginButton.disabled =
            true;


        return false;

    }


    connectionStatus.textContent =
        "✅ Connected to Supabase";


    connectionStatus.className =
        "connection-status connected";


    return true;

}



/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

showPassword.addEventListener(
    "change",
    function() {

        if (
            showPassword.checked
        ) {

            loginPassword.type =
                "text";

        }

        else {

            loginPassword.type =
                "password";

        }

    }
);



/* =========================================
   LOGIN
========================================= */

async function loginUser(
    event
) {

    event.preventDefault();


    clearMessage();



    const email =
        loginEmail
            .value
            .trim()
            .toLowerCase();


    const password =
        loginPassword
            .value;



    /* =====================================
       VALIDATION
    ===================================== */

    if (
        !email
    ) {

        showMessage(
            "Please enter your email.",
            "error"
        );


        return;

    }


    if (
        !password
    ) {

        showMessage(
            "Please enter your password.",
            "error"
        );


        return;

    }



    /* =====================================
       BUTTON LOADING
    ===================================== */

    loginButton.disabled =
        true;


    loginButton.textContent =
        "Logging in...";



    try {

        /*
            LOGIN WITH SUPABASE
        */

        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .signInWithPassword({

                    email:
                        email,

                    password:
                        password

                });



        /* =================================
           ERROR
        ================================= */

        if (
            error
        ) {

            console.error(
                "Supabase Login Error:",
                error
            );


            /*
                FRIENDLY ERROR MESSAGES
            */

            const errorText =
                error.message
                    .toLowerCase();



            if (
                errorText.includes(
                    "invalid login credentials"
                )
            ) {

                showMessage(
                    "Email or password is incorrect.",
                    "error"
                );


                return;

            }



            if (
                errorText.includes(
                    "email not confirmed"
                )
            ) {

                showMessage(
                    "Your email is not confirmed yet.",
                    "error"
                );


                return;

            }



            showMessage(
                error.message,
                "error"
            );


            return;

        }



        /* =================================
           NO SESSION
        ================================= */

        if (
            !data
            ||
            !data.session
        ) {

            showMessage(
                "Login failed. No session was created.",
                "error"
            );


            return;

        }



        /* =================================
           LOGIN SUCCESS
        ================================= */

        console.log(
            "Logged in user:",
            data.user
        );


        showMessage(
            "Login successful 🌷",
            "success"
        );



        setTimeout(
            function() {

                window.location.replace(
                    "index.html"
                );

            },
            700
        );

    }

    catch (
        error
    ) {

        console.error(
            "Login Error:",
            error
        );


        showMessage(
            "Could not connect to Supabase. Check your internet connection.",
            "error"
        );

    }

    finally {

        loginButton.disabled =
            false;


        loginButton.textContent =
            "Login";

    }

}



/* =========================================
   EXISTING SESSION
========================================= */

async function checkExistingSession() {

    try {

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

            console.error(
                "Session check error:",
                error
            );


            return;

        }


        if (
            data.session
        ) {

            console.log(
                "User already logged in."
            );


            window.location.replace(
                "index.html"
            );

        }

    }

    catch (
        error
    ) {

        console.error(
            "Session error:",
            error
        );

    }

}



/* =========================================
   FORM EVENT
========================================= */

loginForm.addEventListener(
    "submit",
    loginUser
);



/* =========================================
   START
========================================= */

async function startLoginPage() {

    const connected =
        checkConnection();


    if (
        !connected
    ) {

        return;

    }


    await checkExistingSession();

}



startLoginPage();