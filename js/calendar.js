/* =========================================
   PERSIAN CALENDAR
========================================= */

const CALENDAR_EVENTS_KEY =
    "myPlannerCalendarEvents";


const calendarPersianMonths = [

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


const calendarMoodEmoji = {

    amazing: "😍",
    good: "😊",
    okay: "😐",
    low: "😔",
    bad: "😣"

};



/* =========================================
   DOM
========================================= */

const calendarDays =
    document.getElementById(
        "calendarDays"
    );


const calendarMonthTitle =
    document.getElementById(
        "calendarMonthTitle"
    );


const previousMonthButton =
    document.getElementById(
        "previousMonthButton"
    );


const nextMonthButton =
    document.getElementById(
        "nextMonthButton"
    );


const calendarTodayButton =
    document.getElementById(
        "calendarTodayButton"
    );


const selectedCalendarDate =
    document.getElementById(
        "selectedCalendarDate"
    );


const calendarEventTitle =
    document.getElementById(
        "calendarEventTitle"
    );


const calendarEventCategory =
    document.getElementById(
        "calendarEventCategory"
    );


const addCalendarEventButton =
    document.getElementById(
        "addCalendarEventButton"
    );


const calendarEventMessage =
    document.getElementById(
        "calendarEventMessage"
    );


const calendarDayDetails =
    document.getElementById(
        "calendarDayDetails"
    );


const calendarEmptyDetails =
    document.getElementById(
        "calendarEmptyDetails"
    );


const calendarDetailCount =
    document.getElementById(
        "calendarDetailCount"
    );



/* =========================================
   BASIC HELPERS
========================================= */

function calendarDiv(a, b) {

    return Math.trunc(
        a / b
    );

}


function calendarMod(a, b) {

    return (
        a
        -
        calendarDiv(
            a,
            b
        )
        *
        b
    );

}



/* =========================================
   JALALI CALCULATION
========================================= */

function jalCal(jy, withoutLeap) {

    const breaks = [

        -61,
        9,
        38,
        199,
        426,
        686,
        756,
        818,
        1111,
        1181,
        1210,
        1635,
        2060,
        2097,
        2192,
        2262,
        2324,
        2394,
        2456,
        3178

    ];


    const bl =
        breaks.length;


    let gy =
        jy + 621;


    let leapJ =
        -14;


    let jp =
        breaks[0];


    let jump =
        0;


    for (
        let i = 1;
        i < bl;
        i++
    ) {

        const jm =
            breaks[i];


        jump =
            jm - jp;


        if (
            jy < jm
        ) {

            break;

        }


        leapJ +=

            calendarDiv(
                jump,
                33
            )
            *
            8
            +
            calendarDiv(
                calendarMod(
                    jump,
                    33
                ),
                4
            );


        jp =
            jm;

    }



    let n =
        jy - jp;



    leapJ +=

        calendarDiv(
            n,
            33
        )
        *
        8

        +

        calendarDiv(
            calendarMod(
                n,
                33
            )
            +
            3,
            4
        );



    if (
        calendarMod(
            jump,
            33
        )
        ===
        4
        &&
        jump - n
        ===
        4
    ) {

        leapJ++;

    }



    const leapG =

        calendarDiv(
            gy,
            4
        )

        -

        calendarDiv(
            (
                calendarDiv(
                    gy,
                    100
                )
                +
                1
            )
            *
            3,
            4
        )

        -

        150;



    const march =
        20
        +
        leapJ
        -
        leapG;



    if (
        withoutLeap
    ) {

        return {

            gy:
                gy,

            march:
                march

        };

    }



    if (
        jump - n
        <
        6
    ) {

        n =
            n
            -
            jump
            +
            calendarDiv(
                jump + 4,
                33
            )
            *
            33;

    }



    let leap =
        calendarMod(
            calendarMod(
                n + 1,
                33
            )
            -
            1,
            4
        );


    if (
        leap === -1
    ) {

        leap =
            4;

    }


    return {

        leap:
            leap,

        gy:
            gy,

        march:
            march

    };

}



/* =========================================
   GREGORIAN TO JULIAN
========================================= */

function g2d(
    gy,
    gm,
    gd
) {

    let d =

        calendarDiv(
            (
                gy
                +
                calendarDiv(
                    gm - 8,
                    6
                )
                +
                100100
            )
            *
            1461,
            4
        )

        +

        calendarDiv(
            153
            *
            calendarMod(
                gm + 9,
                12
            )
            +
            2,
            5
        )

        +

        gd

        -

        34840408;



    d -=

        calendarDiv(
            calendarDiv(
                gy
                +
                100100
                +
                calendarDiv(
                    gm - 8,
                    6
                ),
                100
            )
            *
            3,
            4
        )

        -

        752;


    return d;

}



/* =========================================
   JULIAN TO GREGORIAN
========================================= */

function d2g(jdn) {

    let j =
        4
        *
        jdn
        +
        139361631;


    j =
        j
        +
        calendarDiv(
            calendarDiv(
                4
                *
                jdn
                +
                183187720,
                146097
            )
            *
            3,
            4
        )
        *
        4
        -
        3908;



    const i =

        calendarDiv(
            calendarMod(
                j,
                1461
            ),
            4
        )
        *
        5
        +
        308;



    const gd =

        calendarDiv(
            calendarMod(
                i,
                153
            ),
            5
        )
        +
        1;



    const gm =

        calendarMod(
            calendarDiv(
                i,
                153
            ),
            12
        )
        +
        1;



    const gy =

        calendarDiv(
            j,
            1461
        )
        -
        100100
        +
        calendarDiv(
            8 - gm,
            6
        );


    return {

        gy:
            gy,

        gm:
            gm,

        gd:
            gd

    };

}



/* =========================================
   JALALI TO JULIAN
========================================= */

function j2d(
    jy,
    jm,
    jd
) {

    const r =
        jalCal(
            jy,
            true
        );


    return (

        g2d(
            r.gy,
            3,
            r.march
        )

        +

        (
            jm - 1
        )
        *
        31

        -

        calendarDiv(
            jm,
            7
        )
        *
        (
            jm - 7
        )

        +

        jd

        -

        1

    );

}



/* =========================================
   JALALI TO GREGORIAN
========================================= */

function jalaliToGregorian(
    jy,
    jm,
    jd
) {

    return d2g(
        j2d(
            jy,
            jm,
            jd
        )
    );

}



/* =========================================
   LEAP YEAR
========================================= */

function isJalaliLeapYear(
    year
) {

    return (
        jalCal(
            year,
            false
        ).leap
        ===
        0
    );

}



/* =========================================
   MONTH LENGTH
========================================= */

function getJalaliMonthLength(
    year,
    month
) {

    if (
        month <= 6
    ) {

        return 31;

    }


    if (
        month <= 11
    ) {

        return 30;

    }


    return (
        isJalaliLeapYear(
            year
        )
            ?
            30
            :
            29
    );

}



/* =========================================
   CURRENT PERSIAN DATE
========================================= */

function getCurrentCalendarPersianDate() {

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
   PERSIAN DIGITS
========================================= */

function calendarPersianDigits(
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
   PERSIAN DATE KEY
========================================= */

function calendarPersianDateKey(
    year,
    month,
    day
) {

    return (
        year
        +
        "-"
        +
        String(month)
            .padStart(
                2,
                "0"
            )
        +
        "-"
        +
        String(day)
            .padStart(
                2,
                "0"
            )
    );

}



/* =========================================
   GREGORIAN KEY
========================================= */

function jalaliToGregorianKey(
    year,
    month,
    day
) {

    const date =
        jalaliToGregorian(
            year,
            month,
            day
        );


    return (

        date.gy
        +
        "-"
        +
        String(
            date.gm
        ).padStart(
            2,
            "0"
        )
        +
        "-"
        +
        String(
            date.gd
        ).padStart(
            2,
            "0"
        )

    );

}



/* =========================================
   FORMAT PERSIAN DATE
========================================= */

function formatCalendarPersianDate(
    year,
    month,
    day
) {

    return (

        calendarPersianDigits(
            day
        )

        +
        " "

        +
        calendarPersianMonths[
            month - 1
        ]

        +
        " "

        +
        calendarPersianDigits(
            year
        )

    );

}



/* =========================================
   WEEKDAY
========================================= */

function getJalaliWeekdayIndex(
    year,
    month,
    day
) {

    const gregorian =
        jalaliToGregorian(
            year,
            month,
            day
        );


    const date =
        new Date(
            gregorian.gy,
            gregorian.gm - 1,
            gregorian.gd
        );


    /*
        JS:
        Sunday = 0
        Saturday = 6

        Our calendar:
        Saturday = 0
    */

    return (
        date.getDay()
        +
        1
    )
    %
    7;

}



/* =========================================
   LOAD JSON
========================================= */

function calendarLoadJSON(
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

        console.error(
            "Calendar storage error:",
            error
        );


        return fallback;

    }

}



/* =========================================
   CALENDAR EVENTS
========================================= */

function loadCalendarEvents() {

    const events =
        calendarLoadJSON(
            CALENDAR_EVENTS_KEY,
            []
        );


    return Array.isArray(
        events
    )
        ?
        events
        :
        [];

}



let calendarEvents =
    loadCalendarEvents();



function saveCalendarEvents() {

    localStorage.setItem(
        CALENDAR_EVENTS_KEY,
        JSON.stringify(
            calendarEvents
        )
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



/* =========================================
   EVENT ID
========================================= */

function createCalendarEventId() {

    if (
        window.crypto
        &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now()
        +
        "-"
        +
        Math.random()
            .toString(16)
            .slice(2)
    );

}



/* =========================================
   CURRENT STATE
========================================= */

const calendarToday =
    getCurrentCalendarPersianDate();


let visibleYear =
    calendarToday.year;


let visibleMonth =
    calendarToday.month;


let selectedYear =
    calendarToday.year;


let selectedMonth =
    calendarToday.month;


let selectedDay =
    calendarToday.day;



/* =========================================
   IS TODAY
========================================= */

function calendarIsToday(
    year,
    month,
    day
) {

    return (
        year === calendarToday.year
        &&
        month === calendarToday.month
        &&
        day === calendarToday.day
    );

}



/* =========================================
   MARKERS
========================================= */

function getCalendarMarkers(
    year,
    month,
    day
) {

    const markers =
        [];


    const persianKey =
        calendarPersianDateKey(
            year,
            month,
            day
        );


    /* EVENTS */

    const hasEvent =
        calendarEvents.some(
            function(event) {

                return (
                    event.year === year
                    &&
                    event.month === month
                    &&
                    event.day === day
                );

            }
        );


    if (hasEvent) {

        markers.push({
            icon: "📌",
            title: "Event"
        });

    }



    /* GOALS */

    const goals =
        calendarLoadJSON(
            "myPlannerGoals",
            []
        );


    const hasGoal =
        Array.isArray(goals)
        &&
        goals.some(
            function(goal) {

                return (
                    goal.deadline
                    &&
                    Number(
                        goal.deadline.year
                    )
                    ===
                    year
                    &&
                    Number(
                        goal.deadline.month
                    )
                    ===
                    month
                    &&
                    Number(
                        goal.deadline.day
                    )
                    ===
                    day
                );

            }
        );


    if (hasGoal) {

        markers.push({
            icon: "🎯",
            title: "Goal deadline"
        });

    }



    /* JOURNAL */

    const journals =
        calendarLoadJSON(
            "myPlannerJournalEntries",
            {}
        );


    if (
        journals
        &&
        journals[
            persianKey
        ]
    ) {

        markers.push({
            icon: "📔",
            title: "Journal"
        });

    }



    /* FINANCE */

    const transactions =
        calendarLoadJSON(
            "myPlannerFinanceTransactions",
            []
        );


    const hasFinance =
        Array.isArray(
            transactions
        )
        &&
        transactions.some(
            function(transaction) {

                return (
                    Number(
                        transaction.year
                    )
                    ===
                    year
                    &&
                    Number(
                        transaction.month
                    )
                    ===
                    month
                    &&
                    Number(
                        transaction.day
                    )
                    ===
                    day
                );

            }
        );


    if (hasFinance) {

        markers.push({
            icon: "💰",
            title: "Finance"
        });

    }



    /* STUDY */

    const studyDays =
        calendarLoadJSON(
            "myPlannerStudyDays",
            []
        );


    const gregorianKey =
        jalaliToGregorianKey(
            year,
            month,
            day
        );


    if (
        Array.isArray(
            studyDays
        )
        &&
        studyDays.includes(
            gregorianKey
        )
    ) {

        markers.push({
            icon: "🔥",
            title: "Study completed"
        });

    }



    /* TODAY TASKS */

    if (
        calendarIsToday(
            year,
            month,
            day
        )
    ) {

        const tasks =
            calendarLoadJSON(
                "myPlannerTasks",
                []
            );


        if (
            Array.isArray(tasks)
            &&
            tasks.length > 0
        ) {

            markers.push({
                icon: "☑️",
                title: "Today's Tasks"
            });

        }


        const habits =
            calendarLoadJSON(
                "myPlannerHabits",
                []
            );


        if (
            Array.isArray(habits)
            &&
            habits.length > 0
        ) {

            markers.push({
                icon: "🌱",
                title: "Today's Habits"
            });

        }

    }


    return markers;

}



/* =========================================
   RENDER MONTH
========================================= */

function renderCalendarMonth() {

    calendarDays.innerHTML =
        "";


    calendarMonthTitle.textContent =

        calendarPersianMonths[
            visibleMonth - 1
        ]

        +
        " "

        +
        calendarPersianDigits(
            visibleYear
        );



    const firstWeekday =
        getJalaliWeekdayIndex(
            visibleYear,
            visibleMonth,
            1
        );


    const daysInMonth =
        getJalaliMonthLength(
            visibleYear,
            visibleMonth
        );



    /* EMPTY CELLS */

    for (
        let i = 0;
        i < firstWeekday;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.classList.add(
            "calendar-empty-cell"
        );


        calendarDays.appendChild(
            empty
        );

    }



    /* DAYS */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.classList.add(
            "calendar-day"
        );



        if (
            calendarIsToday(
                visibleYear,
                visibleMonth,
                day
            )
        ) {

            button.classList.add(
                "calendar-today"
            );

        }



        if (
            selectedYear === visibleYear
            &&
            selectedMonth === visibleMonth
            &&
            selectedDay === day
        ) {

            button.classList.add(
                "calendar-selected"
            );

        }



        const number =
            document.createElement(
                "span"
            );


        number.classList.add(
            "calendar-day-number"
        );


        number.textContent =
            calendarPersianDigits(
                day
            );



        const markerBox =
            document.createElement(
                "div"
            );


        markerBox.classList.add(
            "calendar-day-markers"
        );



        const markers =
            getCalendarMarkers(
                visibleYear,
                visibleMonth,
                day
            );



        markers
            .slice(
                0,
                5
            )
            .forEach(
                function(marker) {

                    const item =
                        document.createElement(
                            "span"
                        );


                    item.classList.add(
                        "calendar-marker"
                    );


                    item.textContent =
                        marker.icon;


                    item.title =
                        marker.title;


                    markerBox.appendChild(
                        item
                    );

                }
            );



        button.appendChild(
            number
        );


        button.appendChild(
            markerBox
        );



        button.addEventListener(
            "click",
            function() {

                selectedYear =
                    visibleYear;


                selectedMonth =
                    visibleMonth;


                selectedDay =
                    day;


                renderCalendarMonth();

                renderSelectedCalendarDay();

            }
        );



        calendarDays.appendChild(
            button
        );

    }

}



/* =========================================
   DETAIL ITEM
========================================= */

function createCalendarDetailItem(
    icon,
    title,
    meta,
    deleteCallback
) {

    const item =
        document.createElement(
            "div"
        );


    item.classList.add(
        "calendar-detail-item"
    );



    const iconBox =
        document.createElement(
            "span"
        );


    iconBox.classList.add(
        "calendar-detail-icon"
    );


    iconBox.textContent =
        icon;



    const content =
        document.createElement(
            "div"
        );


    content.classList.add(
        "calendar-detail-content"
    );



    const titleElement =
        document.createElement(
            "strong"
        );


    titleElement.textContent =
        title;



    const metaElement =
        document.createElement(
            "span"
        );


    metaElement.textContent =
        meta;



    content.appendChild(
        titleElement
    );


    content.appendChild(
        metaElement
    );



    item.appendChild(
        iconBox
    );


    item.appendChild(
        content
    );



    if (
        deleteCallback
    ) {

        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.type =
            "button";


        deleteButton.textContent =
            "×";


        deleteButton.classList.add(
            "calendar-delete-event"
        );


        deleteButton.addEventListener(
            "click",
            deleteCallback
        );


        item.appendChild(
            deleteButton
        );

    }


    return item;

}



/* =========================================
   MONEY
========================================= */

function calendarFormatMoney(
    value
) {

    return (
        new Intl.NumberFormat(
            "fa-IR"
        ).format(
            Number(value) || 0
        )
        +
        " تومان"
    );

}



/* =========================================
   RENDER SELECTED DAY
========================================= */

function renderSelectedCalendarDay() {

    selectedCalendarDate.textContent =
        formatCalendarPersianDate(
            selectedYear,
            selectedMonth,
            selectedDay
        );


    calendarDayDetails.innerHTML =
        "";


    let detailCount =
        0;



    /* =====================================
       MANUAL EVENTS
    ===================================== */

    const selectedEvents =
        calendarEvents.filter(
            function(event) {

                return (
                    event.year === selectedYear
                    &&
                    event.month === selectedMonth
                    &&
                    event.day === selectedDay
                );

            }
        );


    selectedEvents.forEach(
        function(event) {

            const item =
                createCalendarDetailItem(

                    "📌",

                    event.title,

                    "Event • "
                    +
                    event.category,

                    function() {

                        const confirmed =
                            window.confirm(
                                "Delete this event?"
                            );


                        if (!confirmed) {

                            return;

                        }


                        calendarEvents =
                            calendarEvents.filter(
                                function(item) {

                                    return (
                                        item.id
                                        !==
                                        event.id
                                    );

                                }
                            );


                        saveCalendarEvents();


                        renderCalendarMonth();

                        renderSelectedCalendarDay();

                    }

                );


            calendarDayDetails.appendChild(
                item
            );


            detailCount++;

        }
    );



    /* =====================================
       GOALS
    ===================================== */

    const goals =
        calendarLoadJSON(
            "myPlannerGoals",
            []
        );


    if (
        Array.isArray(
            goals
        )
    ) {

        goals.forEach(
            function(goal) {

                if (
                    goal.deadline
                    &&
                    Number(
                        goal.deadline.year
                    )
                    ===
                    selectedYear
                    &&
                    Number(
                        goal.deadline.month
                    )
                    ===
                    selectedMonth
                    &&
                    Number(
                        goal.deadline.day
                    )
                    ===
                    selectedDay
                ) {

                    const item =
                        createCalendarDetailItem(

                            "🎯",

                            goal.title
                            ||
                            "Goal",

                            "Goal Deadline • "
                            +
                            (
                                goal.status
                                ||
                                "In Progress"
                            )

                        );


                    calendarDayDetails.appendChild(
                        item
                    );


                    detailCount++;

                }

            }
        );

    }



    /* =====================================
       JOURNAL
    ===================================== */

    const journals =
        calendarLoadJSON(
            "myPlannerJournalEntries",
            {}
        );


    const dateKey =
        calendarPersianDateKey(
            selectedYear,
            selectedMonth,
            selectedDay
        );


    if (
        journals
        &&
        journals[
            dateKey
        ]
    ) {

        const journal =
            journals[
                dateKey
            ];


        const mood =
            calendarMoodEmoji[
                journal.mood
            ]
            ||
            "📔";


        let preview =
            journal.text
            ||
            "Journal entry saved";


        if (
            preview.length > 55
        ) {

            preview =
                preview.slice(
                    0,
                    55
                )
                +
                "...";

        }


        const item =
            createCalendarDetailItem(

                mood,

                "Journal Entry",

                preview

            );


        calendarDayDetails.appendChild(
            item
        );


        detailCount++;

    }



    /* =====================================
       FINANCE
    ===================================== */

    const transactions =
        calendarLoadJSON(
            "myPlannerFinanceTransactions",
            []
        );


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
                    ===
                    selectedYear
                    &&
                    Number(
                        transaction.month
                    )
                    ===
                    selectedMonth
                    &&
                    Number(
                        transaction.day
                    )
                    ===
                    selectedDay
                ) {

                    let symbol =
                        "-";


                    if (
                        transaction.type
                        ===
                        "income"
                    ) {

                        symbol =
                            "+";

                    }


                    const item =
                        createCalendarDetailItem(

                            "💰",

                            transaction.description
                            ||
                            transaction.category
                            ||
                            "Finance",

                            symbol
                            +
                            calendarFormatMoney(
                                transaction.amount
                            )

                        );


                    calendarDayDetails.appendChild(
                        item
                    );


                    detailCount++;

                }

            }
        );

    }



    /* =====================================
       STUDY
    ===================================== */

    const studyDays =
        calendarLoadJSON(
            "myPlannerStudyDays",
            []
        );


    const selectedGregorianKey =
        jalaliToGregorianKey(
            selectedYear,
            selectedMonth,
            selectedDay
        );


    if (
        Array.isArray(
            studyDays
        )
        &&
        studyDays.includes(
            selectedGregorianKey
        )
    ) {

        calendarDayDetails.appendChild(

            createCalendarDetailItem(

                "🔥",

                "Learning Completed",

                "Study activity recorded"

            )

        );


        detailCount++;

    }



    /* =====================================
       TODAY TASKS + HABITS
    ===================================== */

    if (
        calendarIsToday(
            selectedYear,
            selectedMonth,
            selectedDay
        )
    ) {

        const tasks =
            calendarLoadJSON(
                "myPlannerTasks",
                []
            );


        if (
            Array.isArray(
                tasks
            )
        ) {

            tasks.forEach(
                function(task) {

                    calendarDayDetails.appendChild(

                        createCalendarDetailItem(

                            task.completed
                                ?
                                "✅"
                                :
                                "☑️",

                            task.text,

                            task.completed
                                ?
                                "Task • Completed"
                                :
                                "Task • Not completed"

                        )

                    );


                    detailCount++;

                }
            );

        }



        const habits =
            calendarLoadJSON(
                "myPlannerHabits",
                []
            );


        if (
            Array.isArray(
                habits
            )
        ) {

            habits.forEach(
                function(habit) {

                    calendarDayDetails.appendChild(

                        createCalendarDetailItem(

                            habit.completed
                                ?
                                "✅"
                                :
                                "🌱",

                            habit.text,

                            habit.completed
                                ?
                                "Habit • Completed"
                                :
                                "Habit • Not completed"

                        )

                    );


                    detailCount++;

                }
            );

        }

    }



    calendarDetailCount.textContent =

        detailCount
        +
        (
            detailCount === 1
                ?
                " item"
                :
                " items"
        );



    calendarEmptyDetails.style.display =

        detailCount === 0
            ?
            "block"
            :
            "none";

}



/* =========================================
   ADD MANUAL EVENT
========================================= */

function addCalendarEvent() {

    const title =
        calendarEventTitle
            .value
            .trim();


    if (
        title === ""
    ) {

        calendarEventMessage.textContent =
            "Please write an event title.";


        calendarEventTitle.focus();


        return;

    }



    calendarEvents.push({

        id:
            createCalendarEventId(),

        title:
            title,

        category:
            calendarEventCategory.value,

        year:
            selectedYear,

        month:
            selectedMonth,

        day:
            selectedDay,

        createdAt:
            Date.now()

    });



    saveCalendarEvents();


    calendarEventTitle.value =
        "";


    calendarEventMessage.textContent =
        "Event added 🌷";


    renderCalendarMonth();

    renderSelectedCalendarDay();


    setTimeout(
        function() {

            calendarEventMessage.textContent =
                "";

        },
        2000
    );

}



/* =========================================
   PREVIOUS MONTH
========================================= */

function goToPreviousCalendarMonth() {

    visibleMonth--;


    if (
        visibleMonth < 1
    ) {

        visibleMonth =
            12;


        visibleYear--;

    }


    selectedYear =
        visibleYear;


    selectedMonth =
        visibleMonth;


    selectedDay =
        1;


    renderCalendarMonth();

    renderSelectedCalendarDay();

}



/* =========================================
   NEXT MONTH
========================================= */

function goToNextCalendarMonth() {

    visibleMonth++;


    if (
        visibleMonth > 12
    ) {

        visibleMonth =
            1;


        visibleYear++;

    }


    selectedYear =
        visibleYear;


    selectedMonth =
        visibleMonth;


    selectedDay =
        1;


    renderCalendarMonth();

    renderSelectedCalendarDay();

}



/* =========================================
   TODAY
========================================= */

function goToCalendarToday() {

    visibleYear =
        calendarToday.year;


    visibleMonth =
        calendarToday.month;


    selectedYear =
        calendarToday.year;


    selectedMonth =
        calendarToday.month;


    selectedDay =
        calendarToday.day;


    renderCalendarMonth();

    renderSelectedCalendarDay();

}



/* =========================================
   EVENTS
========================================= */

previousMonthButton.addEventListener(
    "click",
    goToPreviousCalendarMonth
);


nextMonthButton.addEventListener(
    "click",
    goToNextCalendarMonth
);


calendarTodayButton.addEventListener(
    "click",
    goToCalendarToday
);


addCalendarEventButton.addEventListener(
    "click",
    addCalendarEvent
);


calendarEventTitle.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            addCalendarEvent();

        }

    }
);



window.addEventListener(
    "storage",
    function() {

        calendarEvents =
            loadCalendarEvents();


        renderCalendarMonth();

        renderSelectedCalendarDay();

    }
);



/* =========================================
   START
========================================= */

renderCalendarMonth();

renderSelectedCalendarDay();