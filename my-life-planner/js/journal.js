/* =========================================
   JOURNAL
========================================= */


const JOURNAL_KEY =
    "myPlannerJournalEntries";



const journalPersianMonths = [

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



const moodData = {

    amazing: {
        emoji: "😍",
        label: "Amazing"
    },

    good: {
        emoji: "😊",
        label: "Good"
    },

    okay: {
        emoji: "😐",
        label: "Okay"
    },

    low: {
        emoji: "😔",
        label: "Low"
    },

    bad: {
        emoji: "😣",
        label: "Bad"
    }

};



/* =========================================
   DOM
========================================= */

const journalDay =
    document.getElementById(
        "journalDay"
    );


const journalMonth =
    document.getElementById(
        "journalMonth"
    );


const journalYear =
    document.getElementById(
        "journalYear"
    );


const journalSelectedDate =
    document.getElementById(
        "journalSelectedDate"
    );


const journalTodayButton =
    document.getElementById(
        "journalTodayButton"
    );


const journalText =
    document.getElementById(
        "journalText"
    );


const gratitudeOne =
    document.getElementById(
        "gratitudeOne"
    );


const gratitudeTwo =
    document.getElementById(
        "gratitudeTwo"
    );


const gratitudeThree =
    document.getElementById(
        "gratitudeThree"
    );


const journalWin =
    document.getElementById(
        "journalWin"
    );


const journalLesson =
    document.getElementById(
        "journalLesson"
    );


const journalTomorrow =
    document.getElementById(
        "journalTomorrow"
    );


const saveJournalButton =
    document.getElementById(
        "saveJournalButton"
    );


const deleteJournalButton =
    document.getElementById(
        "deleteJournalButton"
    );


const journalMessage =
    document.getElementById(
        "journalMessage"
    );


const journalEntriesList =
    document.getElementById(
        "journalEntriesList"
    );


const journalEmptyEntries =
    document.getElementById(
        "journalEmptyEntries"
    );


const journalWordCount =
    document.getElementById(
        "journalWordCount"
    );



/* =========================================
   LOAD
========================================= */

function loadJournalEntries() {

    const saved =
        localStorage.getItem(
            JOURNAL_KEY
        );


    if (!saved) {

        return {};

    }


    try {

        const parsed =
            JSON.parse(
                saved
            );


        if (
            parsed &&
            typeof parsed === "object"
        ) {

            return parsed;

        }

    }

    catch(error) {

        console.error(
            "Journal data error:",
            error
        );

    }


    return {};

}



let journalEntries =
    loadJournalEntries();



/* =========================================
   SAVE STORAGE
========================================= */

function saveJournalStorage() {

    localStorage.setItem(
        JOURNAL_KEY,
        JSON.stringify(
            journalEntries
        )
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



/* =========================================
   PERSIAN DIGITS
========================================= */

function journalPersianDigits(
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
   CURRENT PERSIAN DATE
========================================= */

function getCurrentJournalPersianDate() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US-u-ca-persian",
            {

                year:
                    "numeric",

                month:
                    "numeric",

                day:
                    "numeric"

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
   DATE KEY
========================================= */

function journalDateKey(
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
   FORMAT DATE
========================================= */

function formatJournalDate(
    year,
    month,
    day
) {

    return (
        journalPersianDigits(
            day
        )
        +
        " "
        +
        journalPersianMonths[
            month - 1
        ]
        +
        " "
        +
        journalPersianDigits(
            year
        )
    );

}



/* =========================================
   VALIDATE DATE
========================================= */

function validJournalDate(
    year,
    month,
    day
) {

    if (
        !year ||
        !month ||
        !day
    ) {

        return false;

    }


    if (
        year < 1300
        ||
        year > 1600
    ) {

        return false;

    }


    if (
        month < 1
        ||
        month > 12
    ) {

        return false;

    }



    let maxDay;


    if (
        month <= 6
    ) {

        maxDay =
            31;

    }

    else {

        maxDay =
            30;

    }


    return (
        day >= 1
        &&
        day <= maxDay
    );

}



/* =========================================
   GET SELECTED DATE
========================================= */

function getSelectedJournalDate() {

    return {

        year:
            Number(
                journalYear.value
            ),

        month:
            Number(
                journalMonth.value
            ),

        day:
            Number(
                journalDay.value
            )

    };

}



/* =========================================
   MOOD
========================================= */

function getSelectedMood() {

    const selected =
        document.querySelector(
            'input[name="journalMood"]:checked'
        );


    return selected
        ?
        selected.value
        :
        "";

}



function setSelectedMood(
    mood
) {

    const radios =
        document.querySelectorAll(
            'input[name="journalMood"]'
        );


    radios.forEach(
        function(radio) {

            radio.checked =
                radio.value === mood;

        }
    );

}



/* =========================================
   CLEAR FORM
========================================= */

function clearJournalForm() {

    setSelectedMood("");


    journalText.value =
        "";


    gratitudeOne.value =
        "";


    gratitudeTwo.value =
        "";


    gratitudeThree.value =
        "";


    journalWin.value =
        "";


    journalLesson.value =
        "";


    journalTomorrow.value =
        "";


    updateJournalWordCount();

}



/* =========================================
   LOAD SELECTED ENTRY
========================================= */

function loadSelectedJournalEntry() {

    const date =
        getSelectedJournalDate();


    if (
        !validJournalDate(
            date.year,
            date.month,
            date.day
        )
    ) {

        journalSelectedDate.textContent =
            "Invalid Persian date";


        clearJournalForm();


        return;

    }



    journalSelectedDate.textContent =
        "📅 "
        +
        formatJournalDate(
            date.year,
            date.month,
            date.day
        );



    const key =
        journalDateKey(
            date.year,
            date.month,
            date.day
        );


    const entry =
        journalEntries[
            key
        ];



    if (!entry) {

        clearJournalForm();


        deleteJournalButton.style.display =
            "none";


        return;

    }



    setSelectedMood(
        entry.mood || ""
    );


    journalText.value =
        entry.text || "";


    gratitudeOne.value =
        entry.gratitude?.[0] || "";


    gratitudeTwo.value =
        entry.gratitude?.[1] || "";


    gratitudeThree.value =
        entry.gratitude?.[2] || "";


    journalWin.value =
        entry.win || "";


    journalLesson.value =
        entry.lesson || "";


    journalTomorrow.value =
        entry.tomorrow || "";


    deleteJournalButton.style.display =
        "inline-block";


    updateJournalWordCount();

}



/* =========================================
   SAVE ENTRY
========================================= */

function saveJournalEntry() {

    const date =
        getSelectedJournalDate();



    if (
        !validJournalDate(
            date.year,
            date.month,
            date.day
        )
    ) {

        showJournalMessage(
            "Please enter a valid Persian date."
        );


        return;

    }



    const key =
        journalDateKey(
            date.year,
            date.month,
            date.day
        );



    journalEntries[
        key
    ] = {

        year:
            date.year,

        month:
            date.month,

        day:
            date.day,

        mood:
            getSelectedMood(),

        text:
            journalText.value.trim(),

        gratitude: [

            gratitudeOne.value.trim(),

            gratitudeTwo.value.trim(),

            gratitudeThree.value.trim()

        ],

        win:
            journalWin.value.trim(),

        lesson:
            journalLesson.value.trim(),

        tomorrow:
            journalTomorrow.value.trim(),

        updatedAt:
            Date.now()

    };



    saveJournalStorage();


    renderJournalEntries();


    deleteJournalButton.style.display =
        "inline-block";


    showJournalMessage(
        "Journal saved successfully 🌷"
    );

}



/* =========================================
   DELETE ENTRY
========================================= */

function deleteCurrentJournalEntry() {

    const date =
        getSelectedJournalDate();


    const key =
        journalDateKey(
            date.year,
            date.month,
            date.day
        );



    if (
        !journalEntries[
            key
        ]
    ) {

        return;

    }



    const confirmed =
        window.confirm(
            "Delete this journal entry?"
        );


    if (!confirmed) {

        return;

    }



    delete journalEntries[
        key
    ];


    saveJournalStorage();


    clearJournalForm();


    deleteJournalButton.style.display =
        "none";


    renderJournalEntries();


    showJournalMessage(
        "Journal entry deleted."
    );

}



/* =========================================
   MESSAGE
========================================= */

let journalMessageTimer =
    null;



function showJournalMessage(
    message
) {

    journalMessage.textContent =
        message;


    clearTimeout(
        journalMessageTimer
    );


    journalMessageTimer =
        setTimeout(
            function() {

                journalMessage.textContent =
                    "";

            },
            2500
        );

}



/* =========================================
   WORD COUNT
========================================= */

function updateJournalWordCount() {

    const text =
        journalText.value
            .trim();


    let count =
        0;


    if (text !== "") {

        count =
            text.split(
                /\s+/
            ).length;

    }


    journalWordCount.textContent =
        count
        +
        (
            count === 1
            ?
            " word"
            :
            " words"
        );

}



/* =========================================
   RENDER PREVIOUS ENTRIES
========================================= */

function renderJournalEntries() {

    journalEntriesList.innerHTML =
        "";


    const entries =
        Object.entries(
            journalEntries
        );


    if (
        entries.length === 0
    ) {

        journalEmptyEntries.style.display =
            "block";


        return;

    }



    journalEmptyEntries.style.display =
        "none";



    entries.sort(
        function(a, b) {

            const entryA =
                a[1];


            const entryB =
                b[1];


            if (
                entryA.year
                !==
                entryB.year
            ) {

                return (
                    entryB.year
                    -
                    entryA.year
                );

            }


            if (
                entryA.month
                !==
                entryB.month
            ) {

                return (
                    entryB.month
                    -
                    entryA.month
                );

            }


            return (
                entryB.day
                -
                entryA.day
            );

        }
    );



    entries.forEach(
        function(item) {

            const entry =
                item[1];


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.classList.add(
                "journal-entry-card"
            );



            const top =
                document.createElement(
                    "div"
                );


            top.classList.add(
                "journal-entry-top"
            );



            const date =
                document.createElement(
                    "strong"
                );


            date.dir =
                "rtl";


            date.textContent =
                formatJournalDate(
                    entry.year,
                    entry.month,
                    entry.day
                );



            const mood =
                document.createElement(
                    "span"
                );


            if (
                entry.mood &&
                moodData[
                    entry.mood
                ]
            ) {

                mood.textContent =
                    moodData[
                        entry.mood
                    ].emoji;

            }

            else {

                mood.textContent =
                    "📔";

            }



            top.appendChild(
                date
            );


            top.appendChild(
                mood
            );



            const preview =
                document.createElement(
                    "p"
                );


            if (
                entry.text
            ) {

                preview.textContent =
                    entry.text.length > 75
                    ?
                    entry.text.slice(
                        0,
                        75
                    )
                    +
                    "..."
                    :
                    entry.text;

            }

            else {

                preview.textContent =
                    "Journal entry";

            }



            button.appendChild(
                top
            );


            button.appendChild(
                preview
            );



            button.addEventListener(
                "click",
                function() {

                    journalYear.value =
                        entry.year;


                    journalMonth.value =
                        entry.month;


                    journalDay.value =
                        entry.day;


                    loadSelectedJournalEntry();


                    window.scrollTo({

                        top:
                            0,

                        behavior:
                            "smooth"

                    });

                }
            );



            journalEntriesList.appendChild(
                button
            );

        }
    );

}



/* =========================================
   TODAY
========================================= */

function setJournalToday() {

    const today =
        getCurrentJournalPersianDate();


    journalYear.value =
        today.year;


    journalMonth.value =
        today.month;


    journalDay.value =
        today.day;


    loadSelectedJournalEntry();

}



/* =========================================
   DATE CHANGE
========================================= */

function journalDateChanged() {

    loadSelectedJournalEntry();

}



/* =========================================
   EVENTS
========================================= */

saveJournalButton.addEventListener(
    "click",
    saveJournalEntry
);


deleteJournalButton.addEventListener(
    "click",
    deleteCurrentJournalEntry
);


journalTodayButton.addEventListener(
    "click",
    setJournalToday
);


journalDay.addEventListener(
    "change",
    journalDateChanged
);


journalMonth.addEventListener(
    "change",
    journalDateChanged
);


journalYear.addEventListener(
    "change",
    journalDateChanged
);


journalText.addEventListener(
    "input",
    updateJournalWordCount
);



window.addEventListener(
    "storage",
    function() {

        journalEntries =
            loadJournalEntries();


        renderJournalEntries();


        loadSelectedJournalEntry();

    }
);



/* =========================================
   START
========================================= */

deleteJournalButton.style.display =
    "none";


setJournalToday();


renderJournalEntries();