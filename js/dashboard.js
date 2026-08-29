/* =========================================
   CUSTOM DASHBOARD
========================================= */

const DASHBOARD_LAYOUT_KEY =
    "myPlannerDashboardLayout";


const dashboardDefaultLayout = [

    {
        id: "focus",
        visible: true
    },

    {
        id: "tasks",
        visible: true
    },

    {
        id: "learning",
        visible: true
    },

    {
        id: "habits",
        visible: true
    },

    {
        id: "progress",
        visible: true
    },

    {
        id: "score",
        visible: true
    },

    {
        id: "work",
        visible: true
    },

    {
        id: "finance",
        visible: true
    },

    {
        id: "journal",
        visible: true
    }

];



/* =========================================
   LOAD JSON
========================================= */

function dashboardLoadJSON(
    key,
    fallback
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (!value) {

            return fallback;

        }


        return JSON.parse(
            value
        );

    }

    catch(error) {

        return fallback;

    }

}



/* =========================================
   TODAY KEY
========================================= */

function getDashboardTodayKey() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
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
   PERSIAN TODAY
========================================= */

function getDashboardPersianToday() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US-u-ca-persian",
            {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            }
        );


    const parts =
        formatter.formatToParts(
            new Date()
        );


    const result = {};


    parts.forEach(
        function(part) {

            if (
                part.type === "year"
                ||
                part.type === "month"
                ||
                part.type === "day"
            ) {

                result[
                    part.type
                ] =
                    Number(
                        part.value
                    );

            }

        }
    );


    return {

        year:
            result.year,

        month:
            result.month,

        day:
            result.day

    };

}



/* =========================================
   PERSIAN MONTHS
========================================= */

const dashboardPersianMonths = [

    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"

];



/* =========================================
   PERSIAN DIGITS
========================================= */

function dashboardPersianDigits(
    value
) {

    const digits =
        "۰۱۲۳۴۵۶۷۸۹";


    return String(value)
        .replace(
            /\d/g,
            function(number) {

                return digits[
                    Number(number)
                ];

            }
        );

}



/* =========================================
   MONEY
========================================= */

function dashboardMoney(
    value
) {

    return (
        new Intl.NumberFormat(
            "fa-IR"
        ).format(
            Math.round(
                Number(value)
                ||
                0
            )
        )
        +
        " تومان"
    );

}



/* =========================================
   LAYOUT
========================================= */

function getDashboardLayout() {

    let saved =
        dashboardLoadJSON(
            DASHBOARD_LAYOUT_KEY,
            null
        );


    if (
        !Array.isArray(saved)
    ) {

        saved =
            dashboardDefaultLayout.map(
                function(item) {

                    return {
                        ...item
                    };

                }
            );

    }



    dashboardDefaultLayout.forEach(
        function(defaultItem) {

            const exists =
                saved.some(
                    function(item) {

                        return (
                            item.id
                            ===
                            defaultItem.id
                        );

                    }
                );


            if (!exists) {

                saved.push({
                    ...defaultItem
                });

            }

        }
    );


    return saved;

}



/* =========================================
   APPLY LAYOUT
========================================= */

function applyDashboardLayout() {

    const container =
        document.getElementById(
            "dashboardCards"
        );


    if (!container) {

        return;

    }


    const layout =
        getDashboardLayout();


    layout.forEach(
        function(item) {

            const card =
                container.querySelector(
                    `[data-dashboard-card="${item.id}"]`
                );


            if (!card) {

                return;

            }


            card.style.display =
                item.visible
                    ?
                    ""
                    :
                    "none";


            container.appendChild(
                card
            );

        }
    );

}



/* =========================================
   TASK COUNT
========================================= */

function renderDashboardTasks() {

    const tasks =
        dashboardLoadJSON(
            "myPlannerTasks",
            []
        );


    const completed =
        Array.isArray(tasks)
            ?
            tasks.filter(
                function(task) {

                    return task.completed;

                }
            ).length
            :
            0;


    const total =
        Array.isArray(tasks)
            ?
            tasks.length
            :
            0;


    document
        .querySelectorAll(
            "[data-dashboard-task-count]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completed
                    +
                    " / "
                    +
                    total;

            }
        );

}



/* =========================================
   LEARNING
========================================= */

function renderDashboardLearning() {

    const plans =
        dashboardLoadJSON(
            "myPlannerLearningPlans",
            []
        );


    const list =
        document.getElementById(
            "dashboardLearningList"
        );


    const empty =
        document.getElementById(
            "dashboardLearningEmpty"
        );


    if (
        !list ||
        !empty
    ) {

        return;

    }


    list.innerHTML =
        "";


    const today =
        getDashboardTodayKey();


    let subjectCount =
        0;


    let sessionCount =
        0;


    let completedCount =
        0;


    let plannedMinutes =
        0;



    if (
        Array.isArray(plans)
    ) {

        subjectCount =
            plans.length;


        plans.forEach(
            function(subject) {

                const sessions =
                    Array.isArray(
                        subject.sessions
                    )
                        ?
                        subject.sessions
                        :
                        [];


                sessionCount +=
                    sessions.length;


                let subjectCompleted =
                    0;


                let subjectMinutes =
                    0;


                sessions.forEach(
                    function(session) {

                        subjectMinutes +=
                            Number(
                                session.minutes
                            )
                            ||
                            0;


                        plannedMinutes +=
                            Number(
                                session.minutes
                            )
                            ||
                            0;


                        if (
                            session.completedDate
                            ===
                            today
                        ) {

                            subjectCompleted++;

                            completedCount++;

                        }

                    }
                );



                const row =
                    document.createElement(
                        "div"
                    );


                row.classList.add(
                    "dashboard-learning-row"
                );


                const left =
                    document.createElement(
                        "div"
                    );


                left.classList.add(
                    "dashboard-learning-name"
                );


                const icon =
                    document.createElement(
                        "span"
                    );


                icon.textContent =
                    subject.icon
                    ||
                    "📚";


                const text =
                    document.createElement(
                        "div"
                    );


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    subject.title
                    ||
                    "Learning";


                const subtitle =
                    document.createElement(
                        "span"
                    );


                subtitle.textContent =
                    subjectMinutes
                    +
                    " min";


                text.appendChild(
                    title
                );


                text.appendChild(
                    subtitle
                );


                left.appendChild(
                    icon
                );


                left.appendChild(
                    text
                );



                const right =
                    document.createElement(
                        "strong"
                    );


                right.classList.add(
                    "dashboard-learning-session-count"
                );


                right.textContent =
                    subjectCompleted
                    +
                    " / "
                    +
                    sessions.length;



                row.appendChild(
                    left
                );


                row.appendChild(
                    right
                );


                list.appendChild(
                    row
                );

            }
        );

    }



    const percentage =
        sessionCount === 0
            ?
            0
            :
            Math.round(
                (
                    completedCount
                    /
                    sessionCount
                )
                *
                100
            );



    document
        .querySelectorAll(
            "[data-dashboard-learning-subjects]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    subjectCount;

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-learning-sessions]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completedCount
                    +
                    " / "
                    +
                    sessionCount;

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-learning-minutes]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    plannedMinutes
                    +
                    " min";

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-learning-progress]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    percentage
                    +
                    "%";

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-learning-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    percentage
                    +
                    "%";

            }
        );


    empty.style.display =
        subjectCount === 0
            ?
            "block"
            :
            "none";


    list.style.display =
        subjectCount === 0
            ?
            "none"
            :
            "flex";

}



/* =========================================
   WORK
========================================= */

function calculateDashboardWorkProgress(
    project
) {

    const tasks =
        Array.isArray(
            project.tasks
        )
            ?
            project.tasks
            :
            [];


    if (
        tasks.length === 0
    ) {

        return 0;

    }


    const completed =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    return Math.round(
        (
            completed
            /
            tasks.length
        )
        *
        100
    );

}



function renderDashboardWork() {

    const projects =
        dashboardLoadJSON(
            "myPlannerWorkProjects",
            []
        );


    const validProjects =
        Array.isArray(projects)
            ?
            projects
            :
            [];


    const total =
        validProjects.length;


    const active =
        validProjects.filter(
            function(project) {

                return (
                    project.status
                    ===
                    "In Progress"
                );

            }
        ).length;


    const completed =
        validProjects.filter(
            function(project) {

                return (
                    project.status
                    ===
                    "Completed"
                    ||
                    calculateDashboardWorkProgress(
                        project
                    )
                    ===
                    100
                );

            }
        ).length;



    let average =
        0;


    if (
        total > 0
    ) {

        const totalProgress =
            validProjects.reduce(
                function(sum, project) {

                    return (
                        sum
                        +
                        calculateDashboardWorkProgress(
                            project
                        )
                    );

                },
                0
            );


        average =
            Math.round(
                totalProgress
                /
                total
            );

    }



    document
        .querySelectorAll(
            "[data-dashboard-work-total]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    total;

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-work-active]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    active;

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-work-completed]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completed;

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-work-progress]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    average
                    +
                    "%";

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-work-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    average
                    +
                    "%";

            }
        );



    const feature =
        document.getElementById(
            "dashboardWorkProject"
        );


    if (!feature) {

        return;

    }


    const activeProject =
        validProjects.find(
            function(project) {

                return (
                    project.status
                    ===
                    "In Progress"
                );

            }
        );


    if (!activeProject) {

        feature.innerHTML =
            `
                <span class="dashboard-feature-icon">
                    💼
                </span>

                <div>
                    <strong>
                        No active project
                    </strong>

                    <span>
                        Create a project in Work Planner.
                    </span>
                </div>
            `;


        return;

    }



    const projectProgress =
        calculateDashboardWorkProgress(
            activeProject
        );


    feature.innerHTML =
        `
            <span class="dashboard-feature-icon">
                💼
            </span>

            <div>

                <strong>
                    ${escapeDashboardHTML(
                        activeProject.title
                        ||
                        "Project"
                    )}
                </strong>

                <span>
                    ${projectProgress}% complete
                </span>

            </div>
        `;

}



/* =========================================
   FINANCE
========================================= */

function renderDashboardFinance() {

    const transactions =
        dashboardLoadJSON(
            "myPlannerFinanceTransactions",
            []
        );


    const today =
        getDashboardPersianToday();


    let income =
        0;


    let expenses =
        0;


    let savings =
        0;



    if (
        Array.isArray(
            transactions
        )
    ) {

        transactions.forEach(
            function(transaction) {

                if (
                    Number(
                        transaction.year
                    )
                    !==
                    today.year
                    ||
                    Number(
                        transaction.month
                    )
                    !==
                    today.month
                ) {

                    return;

                }


                const amount =
                    Number(
                        transaction.amount
                    )
                    ||
                    0;


                if (
                    transaction.type
                    ===
                    "income"
                ) {

                    income +=
                        amount;

                }

                else if (
                    transaction.type
                    ===
                    "expense"
                ) {

                    expenses +=
                        amount;

                }

                else if (
                    transaction.type
                    ===
                    "saving"
                ) {

                    savings +=
                        amount;

                }

            }
        );

    }



    const remaining =
        income
        -
        expenses
        -
        savings;



    document
        .querySelectorAll(
            "[data-dashboard-finance-income]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dashboardMoney(
                        income
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-finance-expenses]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dashboardMoney(
                        expenses
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-finance-savings]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dashboardMoney(
                        savings
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-finance-remaining]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dashboardMoney(
                        remaining
                    );


                element.classList.toggle(
                    "dashboard-negative-money",
                    remaining < 0
                );

            }
        );


    document
        .querySelectorAll(
            "[data-dashboard-finance-month]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dashboardPersianMonths[
                        today.month - 1
                    ]
                    +
                    " "
                    +
                    dashboardPersianDigits(
                        today.year
                    );

            }
        );

}



/* =========================================
   JOURNAL
========================================= */

function getDashboardPersianDateKey() {

    const today =
        getDashboardPersianToday();


    return (
        today.year
        +
        "-"
        +
        String(
            today.month
        ).padStart(
            2,
            "0"
        )
        +
        "-"
        +
        String(
            today.day
        ).padStart(
            2,
            "0"
        )
    );

}



const dashboardMoodData = {

    amazing:
        "😍",

    good:
        "😊",

    okay:
        "😐",

    low:
        "😔",

    bad:
        "😣"

};



function renderDashboardJournal() {

    const entries =
        dashboardLoadJSON(
            "myPlannerJournalEntries",
            {}
        );


    const key =
        getDashboardPersianDateKey();


    const entry =
        entries
        &&
        entries[key]
            ?
            entries[key]
            :
            null;


    const status =
        document.querySelector(
            "[data-dashboard-journal-status]"
        );


    const preview =
        document.getElementById(
            "dashboardJournalPreview"
        );


    if (
        !status ||
        !preview
    ) {

        return;

    }



    if (!entry) {

        status.textContent =
            "Not written";


        preview.innerHTML =
            `
                <span class="dashboard-journal-icon">
                    📔
                </span>

                <p>
                    You haven't written today's journal yet.
                </p>
            `;


        return;

    }



    status.textContent =
        "Saved ✓";


    const mood =
        dashboardMoodData[
            entry.mood
        ]
        ||
        "📔";


    let text =
        entry.text
        ||
        entry.win
        ||
        "Today's journal is saved.";


    if (
        text.length > 150
    ) {

        text =
            text.slice(
                0,
                150
            )
            +
            "...";

    }


    preview.innerHTML =
        `
            <span class="dashboard-journal-icon">
                ${mood}
            </span>

            <p>
                ${escapeDashboardHTML(text)}
            </p>
        `;

}



/* =========================================
   SAFE HTML
========================================= */

function escapeDashboardHTML(
    text
) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    applyDashboardLayout();

    renderDashboardTasks();

    renderDashboardLearning();

    renderDashboardWork();

    renderDashboardFinance();

    renderDashboardJournal();

}



/* =========================================
   EVENTS
========================================= */

window.addEventListener(
    "plannerDataChanged",
    updateDashboard
);


window.addEventListener(
    "storage",
    updateDashboard
);



/* =========================================
   START
========================================= */

updateDashboard();