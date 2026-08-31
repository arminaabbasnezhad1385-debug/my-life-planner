/* =========================================
   MY LIFE PLANNER - GENERAL APP
========================================= */


/* =========================================
   SETTINGS
========================================= */

const PLANNER_SETTINGS_KEY =
    "myPlannerSettings";


const DEFAULT_PLANNER_SETTINGS = {

    plannerName:
        "🌷 My Life Planner",

    plannerSubtitle:
        "Plan your life. Track your progress.",

    showPersianDate:
        true,

    theme:
        "rose",

    appearance:
        "light",

    learningWeight:
        20

};



function getPlannerSettings() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    PLANNER_SETTINGS_KEY
                )
            );


        return {

            ...DEFAULT_PLANNER_SETTINGS,

            ...(
                saved &&
                typeof saved === "object"
                    ?
                    saved
                    :
                    {}
            )

        };

    }

    catch(error) {

        return {
            ...DEFAULT_PLANNER_SETTINGS
        };

    }

}



/* =========================================
   SETTINGS GLOBAL CSS
========================================= */

function ensureSettingsGlobalCSS() {

    const existing =
        document.querySelector(
            'link[data-planner-global-theme]'
        );


    if (existing) {

        return;

    }


    const inPagesFolder =
        window.location.pathname
            .includes(
                "/pages/"
            );


    const link =
        document.createElement(
            "link"
        );


    link.rel =
        "stylesheet";


    link.href =
        inPagesFolder
            ?
            "../css/settings-global.css"
            :
            "css/settings-global.css";


    link.setAttribute(
        "data-planner-global-theme",
        ""
    );


    document.head.appendChild(
        link
    );

}



/* =========================================
   APPLY SETTINGS
========================================= */

function applyPlannerSettings() {

    ensureSettingsGlobalCSS();


    const settings =
        getPlannerSettings();



    /* THEME */

    document.documentElement
        .setAttribute(
            "data-planner-theme",
            settings.theme
        );



    /* APPEARANCE */

    let resolvedAppearance =
        settings.appearance;


    if (
        resolvedAppearance === "system"
    ) {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        resolvedAppearance =
            prefersDark
                ?
                "dark"
                :
                "light";

    }


    if (
        document.body
    ) {

        document.body
            .setAttribute(
                "data-planner-mode",
                resolvedAppearance
            );

    }



    /* HEADER */

    const headers =
        document.querySelectorAll(
            ".header"
        );


    headers.forEach(
        function(header) {

            const title =
                header.querySelector(
                    "h1"
                );


            const subtitle =
                header.querySelector(
                    "p:not(.persian-date)"
                );


            if (title) {

                title.textContent =
                    settings.plannerName;

            }


            if (subtitle) {

                subtitle.textContent =
                    settings.plannerSubtitle;

            }

        }
    );

}



/* =========================================
   LOCAL DATE KEY
========================================= */

function getLocalDateKey(
    date = new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year
        +
        "-"
        +
        month
        +
        "-"
        +
        day
    );

}



/* =========================================
   MENU
========================================= */

function ensurePlannerMenuLinks() {

    const menus =
        document.querySelectorAll(
            ".planner-menu"
        );


    const inPagesFolder =
        window.location.pathname
            .includes(
                "/pages/"
            );


    const pagesToAdd = [

        {
            file:
                "work.html",

            label:
                "Work"
        },

        {
            file:
                "finance.html",

            label:
                "Finance"
        },

        {
            file:
                "journal.html",

            label:
                "Journal"
        },

        {
            file:
                "calendar.html",

            label:
                "Calendar"
        },

        {
            file:
                "settings.html",

            label:
                "Settings"
        }

    ];



    menus.forEach(
        function(menu) {

            const progressLink =
                menu.querySelector(
                    'a[href$="progress.html"]'
                );


            pagesToAdd.forEach(
                function(page) {

                    let link =
                        menu.querySelector(
                            `a[href$="${page.file}"]`
                        );


                    if (!link) {

                        link =
                            document.createElement(
                                "a"
                            );


                        link.href =
                            inPagesFolder
                                ?
                                page.file
                                :
                                "pages/"
                                +
                                page.file;


                        link.textContent =
                            page.label;


                        link.classList.add(
                            "menu-button"
                        );


                        if (
                            page.file
                            ===
                            "settings.html"
                        ) {

                            if (
                                progressLink
                                &&
                                progressLink.nextSibling
                            ) {

                                menu.insertBefore(
                                    link,
                                    progressLink.nextSibling
                                );

                            }

                            else {

                                menu.appendChild(
                                    link
                                );

                            }

                        }

                        else if (
                            progressLink
                        ) {

                            menu.insertBefore(
                                link,
                                progressLink
                            );

                        }

                        else {

                            menu.appendChild(
                                link
                            );

                        }

                    }


                    if (
                        window.location.pathname
                            .endsWith(
                                page.file
                            )
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}



/* =========================================
   PERSIAN DATE
========================================= */

function showPersianDate() {

    const settings =
        getPlannerSettings();


    const headers =
        document.querySelectorAll(
            ".header"
        );


    headers.forEach(
        function(header) {

            let dateElement =
                header.querySelector(
                    "[data-persian-date]"
                );


            if (
                !settings.showPersianDate
            ) {

                if (dateElement) {

                    dateElement.remove();

                }


                return;

            }



            const formatter =
                new Intl.DateTimeFormat(
                    "fa-IR-u-ca-persian",
                    {

                        weekday:
                            "long",

                        year:
                            "numeric",

                        month:
                            "long",

                        day:
                            "numeric"

                    }
                );


            const persianDate =
                formatter.format(
                    new Date()
                );


            if (!dateElement) {

                dateElement =
                    document.createElement(
                        "p"
                    );


                dateElement.classList.add(
                    "persian-date"
                );


                dateElement.setAttribute(
                    "data-persian-date",
                    ""
                );


                header.appendChild(
                    dateElement
                );

            }


            dateElement.textContent =
                "📅 "
                +
                persianDate;

        }
    );

}



/* =========================================
   TASKS
========================================= */

function getPlannerTasks() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "myPlannerTasks"
                )
            )
            ||
            []
        );

    }

    catch {

        return [];

    }

}



/* =========================================
   HABITS
========================================= */

function getPlannerHabits() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "myPlannerHabits"
                )
            )
            ||
            []
        );

    }

    catch {

        return [];

    }

}



/* =========================================
   PERCENTAGE
========================================= */

function getPercentage(
    completed,
    total
) {

    if (
        total === 0
    ) {

        return 0;

    }


    return Math.round(
        (
            completed
            /
            total
        )
        *
        100
    );

}



/* =========================================
   STUDY DAYS
========================================= */

function getStudyDays() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "myPlannerStudyDays"
                )
            )
            ||
            []
        );

    }

    catch {

        return [];

    }

}



/* =========================================
   MARK STUDY TODAY
========================================= */

window.plannerMarkStudyToday =
    function() {

        const today =
            getLocalDateKey();


        let studyDays =
            getStudyDays();


        if (
            !studyDays.includes(
                today
            )
        ) {

            studyDays.push(
                today
            );


            localStorage.setItem(
                "myPlannerStudyDays",
                JSON.stringify(
                    studyDays
                )
            );

        }


        window.dispatchEvent(
            new Event(
                "plannerDataChanged"
            )
        );

    };



/* =========================================
   STUDIED TODAY
========================================= */

function studiedToday() {

    return getStudyDays()
        .includes(
            getLocalDateKey()
        );

}



/* =========================================
   STUDY STREAK
========================================= */

function calculateStudyStreak() {

    const studyDays =
        getStudyDays();


    if (
        studyDays.length === 0
    ) {

        return 0;

    }


    const studySet =
        new Set(
            studyDays
        );


    let currentDate =
        new Date();


    if (
        !studySet.has(
            getLocalDateKey(
                currentDate
            )
        )
    ) {

        currentDate.setDate(
            currentDate.getDate()
            -
            1
        );

    }


    let streak =
        0;


    while (
        studySet.has(
            getLocalDateKey(
                currentDate
            )
        )
    ) {

        streak++;


        currentDate.setDate(
            currentDate.getDate()
            -
            1
        );

    }


    return streak;

}



/* =========================================
   DAILY SCORE
========================================= */

function updateDailyScore() {

    const settings =
        getPlannerSettings();


    const tasks =
        getPlannerTasks();


    const habits =
        getPlannerHabits();



    const completedTasks =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;



    const completedHabits =
        habits.filter(
            function(habit) {

                return habit.completed;

            }
        ).length;



    const totalItems =
        tasks.length
        +
        habits.length;


    const totalCompleted =
        completedTasks
        +
        completedHabits;



    const activityPercentage =
        getPercentage(
            totalCompleted,
            totalItems
        );



    let learningWeight =
        Number(
            settings.learningWeight
        );


    if (
        Number.isNaN(
            learningWeight
        )
    ) {

        learningWeight =
            20;

    }


    learningWeight =
        Math.max(
            0,
            Math.min(
                100,
                learningWeight
            )
        );


    const activityWeight =
        100
        -
        learningWeight;



    const activityScore =
        activityPercentage
        *
        (
            activityWeight
            /
            100
        );



    const studyScore =
        studiedToday()
            ?
            learningWeight
            :
            0;



    const finalPercentage =
        Math.round(
            activityScore
            +
            studyScore
        );



    const score =
        finalPercentage
        /
        10;



    let scoreText;


    if (
        Number.isInteger(
            score
        )
    ) {

        scoreText =
            score.toString();

    }

    else {

        scoreText =
            score.toFixed(
                1
            );

    }



    document
        .querySelectorAll(
            "[data-daily-score]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    scoreText;

            }
        );



    document
        .querySelectorAll(
            "[data-score-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    finalPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-score-percentage]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    finalPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-study-status]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    studiedToday()
                        ?
                        "Completed ✓"
                        :
                        "Not completed";

            }
        );



    document
        .querySelectorAll(
            "[data-score-message]"
        )
        .forEach(
            function(element) {

                if (
                    score >= 9
                ) {

                    element.textContent =
                        "Amazing day! 🌷";

                }

                else if (
                    score >= 7
                ) {

                    element.textContent =
                        "Great progress today ✨";

                }

                else if (
                    score >= 5
                ) {

                    element.textContent =
                        "Good progress. Keep going 🌸";

                }

                else if (
                    score > 0
                ) {

                    element.textContent =
                        "Small steps still count 🤍";

                }

                else {

                    element.textContent =
                        "Your day is ready to begin 🌷";

                }

            }
        );

}



/* =========================================
   STREAK DISPLAY
========================================= */

function updateStudyStreak() {

    const streak =
        calculateStudyStreak();


    document
        .querySelectorAll(
            "[data-study-streak]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    streak;

            }
        );

}



/* =========================================
   UPDATE APP
========================================= */

function updatePlannerApp() {

    applyPlannerSettings();

    ensurePlannerMenuLinks();

    showPersianDate();

    updateDailyScore();

    updateStudyStreak();

}



/* =========================================
   GLOBAL ACCESS
========================================= */

window.plannerApplySettings =
    updatePlannerApp;



/* =========================================
   EVENTS
========================================= */

window.addEventListener(
    "plannerDataChanged",
    updatePlannerApp
);


window.addEventListener(
    "storage",
    updatePlannerApp
);



const systemThemeMedia =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemThemeMedia
    .addEventListener(
        "change",
        function() {

            const settings =
                getPlannerSettings();


            if (
                settings.appearance
                ===
                "system"
            ) {

                applyPlannerSettings();

            }

        }
    );



/* =========================================
   START
========================================= */

updatePlannerApp();

/* =========================================
   LOAD GLOBAL LANGUAGE SYSTEM
========================================= */

(function loadPlannerLanguage() {

    if (
        window.PlannerLanguage
        ||
        document.querySelector(
            "script[data-planner-language-script]"
        )
    ) {

        return;

    }


    const inPagesFolder =

        window.location.pathname
            .includes(
                "/pages/"
            );


    const script =

        document.createElement(
            "script"
        );


    script.src =

        inPagesFolder

            ?

            "../js/planner-language.js"

            :

            "js/planner-language.js";


    script.setAttribute(

        "data-planner-language-script",

        ""

    );


    document.body.appendChild(
        script
    );

})();

/* =========================================
   LOAD PWA SYSTEM
========================================= */

(function loadPlannerPWA() {

    if (
        document.querySelector(
            "script[data-planner-pwa]"
        )
    ) {

        return;

    }


    const inPagesFolder =
        window.location.pathname
            .includes(
                "/pages/"
            );


    const script =
        document.createElement(
            "script"
        );


    script.src =
        inPagesFolder
            ?
            "../js/pwa.js"
            :
            "js/pwa.js";


    script.setAttribute(
        "data-planner-pwa",
        ""
    );


    document.body.appendChild(
        script
    );

})();