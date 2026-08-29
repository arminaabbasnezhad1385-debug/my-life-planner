/* =========================================
   SETTINGS PAGE
========================================= */

const SETTINGS_KEY =
    "myPlannerSettings";


const DASHBOARD_SETTINGS_KEY =
    "myPlannerDashboardLayout";



const settingsDefaults = {

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



/* =========================================
   DASHBOARD DEFAULT LAYOUT
========================================= */

const dashboardSettingsDefaults = [

    {
        id: "focus",
        label: "Today's Focus",
        icon: "🎯",
        visible: true
    },

    {
        id: "tasks",
        label: "Today's Tasks",
        icon: "☑️",
        visible: true
    },

    {
        id: "learning",
        label: "Learning",
        icon: "📚",
        visible: true
    },

    {
        id: "habits",
        label: "Habits",
        icon: "🌱",
        visible: true
    },

    {
        id: "progress",
        label: "Daily Progress",
        icon: "📊",
        visible: true
    },

    {
        id: "score",
        label: "Daily Score",
        icon: "⭐",
        visible: true
    },

    {
        id: "work",
        label: "Work",
        icon: "💼",
        visible: true
    },

    {
        id: "finance",
        label: "Finance",
        icon: "💰",
        visible: true
    },

    {
        id: "journal",
        label: "Journal",
        icon: "📔",
        visible: true
    }

];



/* =========================================
   DOM
========================================= */

const settingsPlannerName =
    document.getElementById(
        "settingsPlannerName"
    );


const settingsPlannerSubtitle =
    document.getElementById(
        "settingsPlannerSubtitle"
    );


const settingsShowPersianDate =
    document.getElementById(
        "settingsShowPersianDate"
    );


const settingsLearningWeight =
    document.getElementById(
        "settingsLearningWeight"
    );


const learningWeightValue =
    document.getElementById(
        "learningWeightValue"
    );


const learningWeightSecond =
    document.getElementById(
        "learningWeightSecond"
    );


const activityWeightValue =
    document.getElementById(
        "activityWeightValue"
    );


const saveSettingsButton =
    document.getElementById(
        "saveSettingsButton"
    );


const settingsMessage =
    document.getElementById(
        "settingsMessage"
    );


const exportPlannerButton =
    document.getElementById(
        "exportPlannerButton"
    );


const importPlannerInput =
    document.getElementById(
        "importPlannerInput"
    );


const resetTodayButton =
    document.getElementById(
        "resetTodayButton"
    );


const resetSectionSelect =
    document.getElementById(
        "resetSectionSelect"
    );


const resetSectionButton =
    document.getElementById(
        "resetSectionButton"
    );



/* =========================================
   DASHBOARD CSS
========================================= */

function ensureDashboardSettingsCSS() {

    const existing =
        document.querySelector(
            'link[data-dashboard-settings-css]'
        );


    if (existing) {

        return;

    }


    const link =
        document.createElement(
            "link"
        );


    link.rel =
        "stylesheet";


    link.href =
        "../css/dashboard-custom.css";


    link.setAttribute(
        "data-dashboard-settings-css",
        ""
    );


    document.head.appendChild(
        link
    );

}



/* =========================================
   LOAD SETTINGS
========================================= */

function getSettingsPageData() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    SETTINGS_KEY
                )
            );


        return {

            ...settingsDefaults,

            ...(
                saved
                &&
                typeof saved === "object"
                    ?
                    saved
                    :
                    {}
            )

        };

    }

    catch {

        return {
            ...settingsDefaults
        };

    }

}



function loadSettingsPageData() {

    const settings =
        getSettingsPageData();


    settingsPlannerName.value =
        settings.plannerName;


    settingsPlannerSubtitle.value =
        settings.plannerSubtitle;


    settingsShowPersianDate.checked =
        settings.showPersianDate;


    settingsLearningWeight.value =
        settings.learningWeight;



    const themeRadio =
        document.querySelector(
            `input[name="plannerTheme"][value="${settings.theme}"]`
        );


    if (themeRadio) {

        themeRadio.checked =
            true;

    }



    const appearanceRadio =
        document.querySelector(
            `input[name="plannerAppearance"][value="${settings.appearance}"]`
        );


    if (appearanceRadio) {

        appearanceRadio.checked =
            true;

    }


    updateWeightPreview();

}



/* =========================================
   DASHBOARD LAYOUT LOAD
========================================= */

function getDashboardSettingsLayout() {

    let saved;


    try {

        saved =
            JSON.parse(
                localStorage.getItem(
                    DASHBOARD_SETTINGS_KEY
                )
            );

    }

    catch {

        saved =
            null;

    }



    if (
        !Array.isArray(
            saved
        )
    ) {

        return dashboardSettingsDefaults
            .map(
                function(item) {

                    return {
                        ...item
                    };

                }
            );

    }



    const normalized =
        [];


    saved.forEach(
        function(savedItem) {

            const definition =
                dashboardSettingsDefaults
                    .find(
                        function(item) {

                            return (
                                item.id
                                ===
                                savedItem.id
                            );

                        }
                    );


            if (!definition) {

                return;

            }


            normalized.push({

                ...definition,

                visible:
                    savedItem.visible
                    !==
                    false

            });

        }
    );



    dashboardSettingsDefaults
        .forEach(
            function(defaultItem) {

                const exists =
                    normalized.some(
                        function(item) {

                            return (
                                item.id
                                ===
                                defaultItem.id
                            );

                        }
                    );


                if (!exists) {

                    normalized.push({
                        ...defaultItem
                    });

                }

            }
        );


    return normalized;

}



let dashboardLayoutDraft =
    getDashboardSettingsLayout();



/* =========================================
   CREATE DASHBOARD SETTINGS UI
========================================= */

function createDashboardSettingsSection() {

    ensureDashboardSettingsCSS();


    if (
        document.getElementById(
            "dashboardSettingsSection"
        )
    ) {

        return;

    }



    const saveSection =
        document.querySelector(
            ".settings-save-section"
        );


    if (!saveSection) {

        return;

    }



    const section =
        document.createElement(
            "section"
        );


    section.id =
        "dashboardSettingsSection";


    section.classList.add(
        "card",
        "settings-section",
        "dashboard-settings-section"
    );


    section.innerHTML =
        `
            <h2>
                🧩 Dashboard Layout
            </h2>

            <p class="card-description">
                Choose which cards appear on your Dashboard and change their order.
            </p>

            <div
                id="dashboardSettingsList"
                class="dashboard-settings-list"
            >
            </div>
        `;



    saveSection.parentNode
        .insertBefore(
            section,
            saveSection
        );


    renderDashboardSettingsList();

}



/* =========================================
   RENDER DASHBOARD SETTINGS
========================================= */

function renderDashboardSettingsList() {

    const list =
        document.getElementById(
            "dashboardSettingsList"
        );


    if (!list) {

        return;

    }


    list.innerHTML =
        "";



    dashboardLayoutDraft
        .forEach(
            function(item, index) {

                const row =
                    document.createElement(
                        "div"
                    );


                row.classList.add(
                    "dashboard-setting-row"
                );



                const checkbox =
                    document.createElement(
                        "input"
                    );


                checkbox.type =
                    "checkbox";


                checkbox.checked =
                    item.visible
                    !==
                    false;



                const info =
                    document.createElement(
                        "div"
                    );


                info.classList.add(
                    "dashboard-setting-info"
                );



                const icon =
                    document.createElement(
                        "span"
                    );


                icon.classList.add(
                    "dashboard-setting-icon"
                );


                icon.textContent =
                    item.icon;



                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    item.label;



                info.appendChild(
                    icon
                );


                info.appendChild(
                    title
                );



                const upButton =
                    document.createElement(
                        "button"
                    );


                upButton.type =
                    "button";


                upButton.textContent =
                    "↑";


                upButton.title =
                    "Move up";


                upButton.classList.add(
                    "dashboard-order-button"
                );



                const downButton =
                    document.createElement(
                        "button"
                    );


                downButton.type =
                    "button";


                downButton.textContent =
                    "↓";


                downButton.title =
                    "Move down";


                downButton.classList.add(
                    "dashboard-order-button"
                );



                checkbox.addEventListener(
                    "change",
                    function() {

                        dashboardLayoutDraft[
                            index
                        ].visible =
                            checkbox.checked;

                    }
                );



                upButton.addEventListener(
                    "click",
                    function() {

                        if (
                            index === 0
                        ) {

                            return;

                        }


                        const current =
                            dashboardLayoutDraft[
                                index
                            ];


                        dashboardLayoutDraft[
                            index
                        ] =
                            dashboardLayoutDraft[
                                index - 1
                            ];


                        dashboardLayoutDraft[
                            index - 1
                        ] =
                            current;


                        renderDashboardSettingsList();

                    }
                );



                downButton.addEventListener(
                    "click",
                    function() {

                        if (
                            index
                            ===
                            dashboardLayoutDraft.length
                            -
                            1
                        ) {

                            return;

                        }


                        const current =
                            dashboardLayoutDraft[
                                index
                            ];


                        dashboardLayoutDraft[
                            index
                        ] =
                            dashboardLayoutDraft[
                                index + 1
                            ];


                        dashboardLayoutDraft[
                            index + 1
                        ] =
                            current;


                        renderDashboardSettingsList();

                    }
                );



                if (
                    index === 0
                ) {

                    upButton.disabled =
                        true;

                }


                if (
                    index
                    ===
                    dashboardLayoutDraft.length
                    -
                    1
                ) {

                    downButton.disabled =
                        true;

                }



                row.appendChild(
                    checkbox
                );


                row.appendChild(
                    info
                );


                row.appendChild(
                    upButton
                );


                row.appendChild(
                    downButton
                );


                list.appendChild(
                    row
                );

            }
        );

}



/* =========================================
   SAVE DASHBOARD LAYOUT
========================================= */

function saveDashboardLayout() {

    const storageVersion =
        dashboardLayoutDraft
            .map(
                function(item) {

                    return {

                        id:
                            item.id,

                        visible:
                            item.visible
                            !==
                            false

                    };

                }
            );


    localStorage.setItem(
        DASHBOARD_SETTINGS_KEY,
        JSON.stringify(
            storageVersion
        )
    );

}



/* =========================================
   WEIGHT PREVIEW
========================================= */

function updateWeightPreview() {

    const learning =
        Number(
            settingsLearningWeight.value
        );


    const activity =
        100
        -
        learning;


    learningWeightValue.textContent =
        learning
        +
        "%";


    learningWeightSecond.textContent =
        learning
        +
        "%";


    activityWeightValue.textContent =
        activity
        +
        "%";

}



/* =========================================
   SAVE SETTINGS
========================================= */

function savePlannerSettings() {

    const selectedTheme =
        document.querySelector(
            'input[name="plannerTheme"]:checked'
        );


    const selectedAppearance =
        document.querySelector(
            'input[name="plannerAppearance"]:checked'
        );



    const settings = {

        plannerName:
            settingsPlannerName
                .value
                .trim()
            ||
            settingsDefaults
                .plannerName,

        plannerSubtitle:
            settingsPlannerSubtitle
                .value
                .trim()
            ||
            settingsDefaults
                .plannerSubtitle,

        showPersianDate:
            settingsShowPersianDate
                .checked,

        theme:
            selectedTheme
                ?
                selectedTheme.value
                :
                "rose",

        appearance:
            selectedAppearance
                ?
                selectedAppearance.value
                :
                "light",

        learningWeight:
            Number(
                settingsLearningWeight
                    .value
            )

    };



    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(
            settings
        )
    );



    saveDashboardLayout();



    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );


    showSettingsMessage(
        "Settings and Dashboard saved 🌷"
    );

}



/* =========================================
   LIVE PREVIEW
========================================= */

function previewSettings() {

    const selectedTheme =
        document.querySelector(
            'input[name="plannerTheme"]:checked'
        );


    const selectedAppearance =
        document.querySelector(
            'input[name="plannerAppearance"]:checked'
        );


    if (
        selectedTheme
    ) {

        document.documentElement
            .setAttribute(
                "data-planner-theme",
                selectedTheme.value
            );

    }


    if (
        selectedAppearance
    ) {

        let mode =
            selectedAppearance.value;


        if (
            mode === "system"
        ) {

            mode =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches
                    ?
                    "dark"
                    :
                    "light";

        }


        document.body
            .setAttribute(
                "data-planner-mode",
                mode
            );

    }

}



/* =========================================
   MESSAGE
========================================= */

let settingsMessageTimer =
    null;


function showSettingsMessage(
    text
) {

    settingsMessage.textContent =
        text;


    clearTimeout(
        settingsMessageTimer
    );


    settingsMessageTimer =
        setTimeout(
            function() {

                settingsMessage.textContent =
                    "";

            },
            2500
        );

}



/* =========================================
   EXPORT
========================================= */

function exportPlannerData() {

    const data = {};


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const key =
            localStorage.key(i);


        if (
            key
            &&
            key.startsWith(
                "myPlanner"
            )
        ) {

            data[key] =
                localStorage.getItem(
                    key
                );

        }

    }



    const backup = {

        app:
            "My Life Planner",

        version:
            2,

        exportedAt:
            new Date()
                .toISOString(),

        data:
            data

    };



    const blob =
        new Blob(

            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],

            {
                type:
                    "application/json"
            }

        );



    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "my-life-planner-backup.json";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showSettingsMessage(
        "Backup created ✓"
    );

}



/* =========================================
   IMPORT
========================================= */

function importPlannerData(
    file
) {

    if (!file) {

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function() {

            try {

                const backup =
                    JSON.parse(
                        reader.result
                    );


                if (
                    !backup.data
                    ||
                    typeof backup.data
                    !==
                    "object"
                ) {

                    throw new Error(
                        "Invalid backup"
                    );

                }



                const confirmed =
                    window.confirm(
                        "Importing this backup will replace matching planner data. Continue?"
                    );


                if (!confirmed) {

                    return;

                }



                Object.entries(
                    backup.data
                )
                .forEach(
                    function(
                        [key, value]
                    ) {

                        if (
                            key.startsWith(
                                "myPlanner"
                            )
                        ) {

                            localStorage
                                .setItem(
                                    key,
                                    value
                                );

                        }

                    }
                );



                dashboardLayoutDraft =
                    getDashboardSettingsLayout();


                loadSettingsPageData();

                renderDashboardSettingsList();



                window.dispatchEvent(
                    new Event(
                        "plannerDataChanged"
                    )
                );


                showSettingsMessage(
                    "Backup imported successfully 🌷"
                );

            }

            catch(error) {

                showSettingsMessage(
                    "This backup file is not valid."
                );

            }

        };


    reader.readAsText(
        file
    );

}



/* =========================================
   TODAY KEY
========================================= */

function getSettingsTodayKey() {

    const date =
        new Date();


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
   RESET TODAY
========================================= */

function resetTodayProgress() {

    const confirmed =
        window.confirm(
            "Reset today's completed Tasks, Habits and Learning?"
        );


    if (!confirmed) {

        return;

    }



    /* TASKS */

    try {

        const tasks =
            JSON.parse(
                localStorage.getItem(
                    "myPlannerTasks"
                )
            )
            ||
            [];


        tasks.forEach(
            function(task) {

                task.completed =
                    false;

            }
        );


        localStorage.setItem(
            "myPlannerTasks",
            JSON.stringify(
                tasks
            )
        );

    }

    catch {}



    /* HABITS */

    try {

        const habits =
            JSON.parse(
                localStorage.getItem(
                    "myPlannerHabits"
                )
            )
            ||
            [];


        habits.forEach(
            function(habit) {

                habit.completed =
                    false;

            }
        );


        localStorage.setItem(
            "myPlannerHabits",
            JSON.stringify(
                habits
            )
        );

    }

    catch {}



    /* LEARNING */

    try {

        const learning =
            JSON.parse(
                localStorage.getItem(
                    "myPlannerLearningPlans"
                )
            )
            ||
            [];


        const today =
            getSettingsTodayKey();


        learning.forEach(
            function(subject) {

                if (
                    !Array.isArray(
                        subject.sessions
                    )
                ) {

                    return;

                }


                subject.sessions
                    .forEach(
                        function(session) {

                            if (
                                session.completedDate
                                ===
                                today
                            ) {

                                session.completedDate =
                                    null;

                            }

                        }
                    );

            }
        );


        localStorage.setItem(
            "myPlannerLearningPlans",
            JSON.stringify(
                learning
            )
        );

    }

    catch {}



    /* STUDY STREAK */

    try {

        let studyDays =
            JSON.parse(
                localStorage.getItem(
                    "myPlannerStudyDays"
                )
            )
            ||
            [];


        const today =
            getSettingsTodayKey();


        studyDays =
            studyDays.filter(
                function(date) {

                    return (
                        date !== today
                    );

                }
            );


        localStorage.setItem(
            "myPlannerStudyDays",
            JSON.stringify(
                studyDays
            )
        );

    }

    catch {}



    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );


    showSettingsMessage(
        "Today's progress was reset."
    );

}



/* =========================================
   RESET SECTIONS
========================================= */

const sectionKeys = {

    tasks: [

        "myPlannerTasks",
        "myPlannerTasksDate"

    ],

    habits: [

        "myPlannerHabits",
        "myPlannerHabitsDate"

    ],

    learning: [

        "myPlannerLearningPlans",
        "myPlannerStudyDays"

    ],

    goals: [

        "myPlannerGoals"

    ],

    work: [

        "myPlannerWorkProjects"

    ],

    finance: [

        "myPlannerFinanceTransactions"

    ],

    journal: [

        "myPlannerJournalEntries"

    ],

    calendar: [

        "myPlannerCalendarEvents"

    ],

    focus: [

        "myPlannerFocus"

    ],

    dashboard: [

        "myPlannerDashboardLayout"

    ]

};



/* ADD DASHBOARD RESET OPTION */

function addDashboardResetOption() {

    if (
        !resetSectionSelect
    ) {

        return;

    }


    const existing =
        resetSectionSelect
            .querySelector(
                'option[value="dashboard"]'
            );


    if (existing) {

        return;

    }


    const allOption =
        resetSectionSelect
            .querySelector(
                'option[value="all"]'
            );


    const option =
        document.createElement(
            "option"
        );


    option.value =
        "dashboard";


    option.textContent =
        "Dashboard Layout";


    if (allOption) {

        resetSectionSelect
            .insertBefore(
                option,
                allOption
            );

    }

    else {

        resetSectionSelect
            .appendChild(
                option
            );

    }

}



/* =========================================
   RESET SECTION
========================================= */

function resetPlannerSection() {

    const section =
        resetSectionSelect.value;


    if (
        section === ""
    ) {

        showSettingsMessage(
            "Select a section first."
        );


        return;

    }



    if (
        section === "all"
    ) {

        const confirmed =
            window.confirm(
                "This will permanently delete ALL My Life Planner data. Continue?"
            );


        if (!confirmed) {

            return;

        }


        const keysToRemove =
            [];


        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);


            if (
                key
                &&
                key.startsWith(
                    "myPlanner"
                )
            ) {

                keysToRemove.push(
                    key
                );

            }

        }


        keysToRemove
            .forEach(
                function(key) {

                    localStorage
                        .removeItem(
                            key
                        );

                }
            );


        window.location.reload();


        return;

    }



    const confirmed =
        window.confirm(
            "Delete all data from this section?"
        );


    if (!confirmed) {

        return;

    }



    const keys =
        sectionKeys[
            section
        ]
        ||
        [];


    keys.forEach(
        function(key) {

            localStorage
                .removeItem(
                    key
                );

        }
    );



    if (
        section === "dashboard"
    ) {

        dashboardLayoutDraft =
            getDashboardSettingsLayout();


        renderDashboardSettingsList();

    }



    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );


    showSettingsMessage(
        "Section data deleted."
    );

}



/* =========================================
   EVENTS
========================================= */

settingsLearningWeight
    .addEventListener(
        "input",
        updateWeightPreview
    );


saveSettingsButton
    .addEventListener(
        "click",
        savePlannerSettings
    );


exportPlannerButton
    .addEventListener(
        "click",
        exportPlannerData
    );


importPlannerInput
    .addEventListener(
        "change",
        function() {

            importPlannerData(
                importPlannerInput
                    .files[0]
            );


            importPlannerInput.value =
                "";

        }
    );


resetTodayButton
    .addEventListener(
        "click",
        resetTodayProgress
    );


resetSectionButton
    .addEventListener(
        "click",
        resetPlannerSection
    );



document
    .querySelectorAll(
        'input[name="plannerTheme"]'
    )
    .forEach(
        function(input) {

            input.addEventListener(
                "change",
                previewSettings
            );

        }
    );



document
    .querySelectorAll(
        'input[name="plannerAppearance"]'
    )
    .forEach(
        function(input) {

            input.addEventListener(
                "change",
                previewSettings
            );

        }
    );



/* =========================================
   START
========================================= */

loadSettingsPageData();

createDashboardSettingsSection();

addDashboardResetOption();