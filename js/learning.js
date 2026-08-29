/* =========================================
   CUSTOM LEARNING PLANNER
========================================= */

const LEARNING_STORAGE_KEY =
    "myPlannerLearningPlans";


let activeTimerInterval =
    null;


/* =========================================
   DOM
========================================= */

const learningSubjectForm =
    document.getElementById(
        "learningSubjectForm"
    );


const learningSubjectIcon =
    document.getElementById(
        "learningSubjectIcon"
    );


const learningSubjectTitle =
    document.getElementById(
        "learningSubjectTitle"
    );


const learningFormMessage =
    document.getElementById(
        "learningFormMessage"
    );


const learningSubjectsList =
    document.getElementById(
        "learningSubjectsList"
    );


const learningEmptyState =
    document.getElementById(
        "learningEmptyState"
    );



/* =========================================
   ID
========================================= */

function createLearningId() {

    if (
        window.crypto &&
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
   TODAY KEY
========================================= */

function getLearningTodayKey() {

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
   LOAD
========================================= */

function loadLearningPlans() {

    const saved =
        localStorage.getItem(
            LEARNING_STORAGE_KEY
        );


    if (!saved) {

        return [];

    }


    try {

        const parsed =
            JSON.parse(
                saved
            );


        return Array.isArray(
            parsed
        )
            ?
            parsed
            :
            [];

    }

    catch(error) {

        console.error(
            "Learning data error:",
            error
        );


        return [];

    }

}



let learningPlans =
    loadLearningPlans();



/* =========================================
   SAVE
========================================= */

function saveLearningPlans() {

    localStorage.setItem(
        LEARNING_STORAGE_KEY,
        JSON.stringify(
            learningPlans
        )
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



/* =========================================
   COMPLETED TODAY
========================================= */

function isLearningSessionCompleted(
    session
) {

    return (
        session.completedDate
        ===
        getLearningTodayKey()
    );

}



/* =========================================
   MARK COMPLETE
========================================= */

function markLearningSessionComplete(
    session
) {

    session.completedDate =
        getLearningTodayKey();


    /*
       Connect to Daily Score + Streak
    */

    if (
        typeof
        window.plannerMarkStudyToday
        ===
        "function"
    ) {

        window
            .plannerMarkStudyToday();

    }

}



/* =========================================
   PROGRESS
========================================= */

function calculateLearningProgress(
    subject
) {

    if (
        !subject.sessions ||
        subject.sessions.length === 0
    ) {

        return 0;

    }


    const completed =
        subject.sessions.filter(
            function(session) {

                return (
                    isLearningSessionCompleted(
                        session
                    )
                );

            }
        ).length;


    return Math.round(
        (
            completed
            /
            subject.sessions.length
        )
        *
        100
    );

}



/* =========================================
   SUMMARY
========================================= */

function updateLearningSummary() {

    const totalSubjects =
        learningPlans.length;


    let totalSessions =
        0;


    let completedSessions =
        0;


    let totalMinutes =
        0;



    learningPlans.forEach(
        function(subject) {

            totalSessions +=
                subject.sessions.length;


            subject.sessions.forEach(
                function(session) {

                    totalMinutes +=
                        Number(
                            session.minutes
                        )
                        ||
                        0;


                    if (
                        isLearningSessionCompleted(
                            session
                        )
                    ) {

                        completedSessions++;

                    }

                }
            );

        }
    );



    document
        .querySelectorAll(
            "[data-learning-subjects]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    totalSubjects;

            }
        );


    document
        .querySelectorAll(
            "[data-learning-sessions]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    totalSessions;

            }
        );


    document
        .querySelectorAll(
            "[data-learning-completed]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completedSessions;

            }
        );


    document
        .querySelectorAll(
            "[data-learning-minutes]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    totalMinutes
                    +
                    " min";

            }
        );

}



/* =========================================
   FORMAT TIMER
========================================= */

function formatLearningTime(
    totalSeconds
) {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    return (
        String(minutes)
            .padStart(
                2,
                "0"
            )
        +
        ":"
        +
        String(seconds)
            .padStart(
                2,
                "0"
            )
    );

}



/* =========================================
   STOP ACTIVE TIMER
========================================= */

function stopActiveLearningTimer() {

    if (
        activeTimerInterval
    ) {

        clearInterval(
            activeTimerInterval
        );


        activeTimerInterval =
            null;

    }

}



/* =========================================
   RENDER
========================================= */

function renderLearningPlans() {

    stopActiveLearningTimer();


    learningSubjectsList.innerHTML =
        "";


    if (
        learningPlans.length === 0
    ) {

        learningEmptyState.style.display =
            "block";

    }

    else {

        learningEmptyState.style.display =
            "none";

    }



    learningPlans.forEach(
        function(subject) {


            const subjectIndex =
                learningPlans.findIndex(
                    function(item) {

                        return (
                            item.id ===
                            subject.id
                        );

                    }
                );


            const progress =
                calculateLearningProgress(
                    subject
                );


            const completedCount =
                subject.sessions.filter(
                    function(session) {

                        return (
                            isLearningSessionCompleted(
                                session
                            )
                        );

                    }
                ).length;



            /* =================================
               CARD
            ================================= */

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "custom-learning-card"
            );



            /* =================================
               HEADER
            ================================= */

            const header =
                document.createElement(
                    "div"
                );


            header.classList.add(
                "custom-learning-header"
            );



            const titleArea =
                document.createElement(
                    "div"
                );


            titleArea.classList.add(
                "custom-learning-title-area"
            );



            const iconInput =
                document.createElement(
                    "input"
                );


            iconInput.type =
                "text";


            iconInput.maxLength =
                5;


            iconInput.value =
                subject.icon || "📚";


            iconInput.classList.add(
                "learning-icon-input"
            );



            const titleInput =
                document.createElement(
                    "input"
                );


            titleInput.type =
                "text";


            titleInput.value =
                subject.title;


            titleInput.classList.add(
                "learning-subject-title-input"
            );



            titleArea.appendChild(
                iconInput
            );


            titleArea.appendChild(
                titleInput
            );



            const deleteSubjectButton =
                document.createElement(
                    "button"
                );


            deleteSubjectButton.type =
                "button";


            deleteSubjectButton.textContent =
                "Delete";


            deleteSubjectButton.classList.add(
                "delete-learning-subject"
            );



            header.appendChild(
                titleArea
            );


            header.appendChild(
                deleteSubjectButton
            );



            /* =================================
               PROGRESS
            ================================= */

            const progressSection =
                document.createElement(
                    "div"
                );


            progressSection.classList.add(
                "learning-progress-section"
            );


            progressSection.innerHTML =
                `
                    <div class="learning-progress-heading">

                        <span>
                            Today's Progress
                        </span>

                        <strong>
                            ${progress}%
                        </strong>

                    </div>

                    <div class="learning-custom-progress-bar">

                        <div
                            class="learning-custom-progress-fill"
                            style="width: ${progress}%"
                        >
                        </div>

                    </div>

                    <p>
                        ${completedCount}
                        /
                        ${subject.sessions.length}
                        sessions completed
                    </p>
                `;



            /* =================================
               SESSIONS
            ================================= */

            const sessionSection =
                document.createElement(
                    "div"
                );


            sessionSection.classList.add(
                "learning-session-section"
            );



            const sessionHeading =
                document.createElement(
                    "div"
                );


            sessionHeading.classList.add(
                "learning-session-heading"
            );


            sessionHeading.innerHTML =
                `
                    <h3>
                        Study Sessions
                    </h3>

                    <span>
                        ${subject.sessions.length}
                    </span>
                `;



            const sessionList =
                document.createElement(
                    "div"
                );


            sessionList.classList.add(
                "learning-session-list"
            );



            subject.sessions.forEach(
                function(session) {

                    const sessionIndex =
                        subject.sessions.findIndex(
                            function(item) {

                                return (
                                    item.id ===
                                    session.id
                                );

                            }
                        );


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.classList.add(
                        "learning-session-item"
                    );



                    /* CHECKBOX */

                    const checkbox =
                        document.createElement(
                            "input"
                        );


                    checkbox.type =
                        "checkbox";


                    checkbox.checked =
                        isLearningSessionCompleted(
                            session
                        );



                    /* NAME */

                    const nameInput =
                        document.createElement(
                            "input"
                        );


                    nameInput.type =
                        "text";


                    nameInput.value =
                        session.name;


                    nameInput.classList.add(
                        "learning-session-name"
                    );



                    if (
                        checkbox.checked
                    ) {

                        nameInput.classList.add(
                            "learning-session-done"
                        );

                    }



                    /* MINUTES */

                    const minutesBox =
                        document.createElement(
                            "div"
                        );


                    minutesBox.classList.add(
                        "learning-session-minutes"
                    );



                    const minutesInput =
                        document.createElement(
                            "input"
                        );


                    minutesInput.type =
                        "number";


                    minutesInput.min =
                        "1";


                    minutesInput.value =
                        session.minutes;



                    const minuteLabel =
                        document.createElement(
                            "span"
                        );


                    minuteLabel.textContent =
                        "min";



                    minutesBox.appendChild(
                        minutesInput
                    );


                    minutesBox.appendChild(
                        minuteLabel
                    );



                    /* TIMER BUTTON */

                    const timerSelectButton =
                        document.createElement(
                            "button"
                        );


                    timerSelectButton.type =
                        "button";


                    timerSelectButton.textContent =
                        "⏱";


                    timerSelectButton.title =
                        "Use in timer";


                    timerSelectButton.classList.add(
                        "learning-use-timer"
                    );



                    if (
                        subject.activeSessionId
                        ===
                        session.id
                    ) {

                        timerSelectButton.classList.add(
                            "learning-use-timer-active"
                        );

                    }



                    /* DELETE */

                    const deleteSessionButton =
                        document.createElement(
                            "button"
                        );


                    deleteSessionButton.type =
                        "button";


                    deleteSessionButton.textContent =
                        "×";


                    deleteSessionButton.classList.add(
                        "delete-learning-session"
                    );



                    /* EVENTS */

                    checkbox.addEventListener(
                        "change",
                        function() {

                            if (
                                checkbox.checked
                            ) {

                                markLearningSessionComplete(
                                    learningPlans[
                                        subjectIndex
                                    ]
                                    .sessions[
                                        sessionIndex
                                    ]
                                );

                            }

                            else {

                                learningPlans[
                                    subjectIndex
                                ]
                                .sessions[
                                    sessionIndex
                                ]
                                .completedDate =
                                    null;

                            }


                            saveLearningPlans();

                            renderLearningPlans();

                        }
                    );



                    nameInput.addEventListener(
                        "input",
                        function() {

                            learningPlans[
                                subjectIndex
                            ]
                            .sessions[
                                sessionIndex
                            ]
                            .name =
                                nameInput.value;


                            saveLearningPlans();

                        }
                    );



                    minutesInput.addEventListener(
                        "change",
                        function() {

                            let minutes =
                                Number(
                                    minutesInput.value
                                );


                            if (
                                !minutes ||
                                minutes < 1
                            ) {

                                minutes =
                                    1;

                            }


                            learningPlans[
                                subjectIndex
                            ]
                            .sessions[
                                sessionIndex
                            ]
                            .minutes =
                                minutes;


                            saveLearningPlans();

                            renderLearningPlans();

                        }
                    );



                    timerSelectButton.addEventListener(
                        "click",
                        function() {

                            learningPlans[
                                subjectIndex
                            ]
                            .activeSessionId =
                                session.id;


                            saveLearningPlans();

                            renderLearningPlans();

                        }
                    );



                    deleteSessionButton.addEventListener(
                        "click",
                        function() {

                            learningPlans[
                                subjectIndex
                            ]
                            .sessions
                            .splice(
                                sessionIndex,
                                1
                            );


                            if (
                                learningPlans[
                                    subjectIndex
                                ]
                                .activeSessionId
                                ===
                                session.id
                            ) {

                                learningPlans[
                                    subjectIndex
                                ]
                                .activeSessionId =
                                    null;

                            }


                            saveLearningPlans();

                            renderLearningPlans();

                        }
                    );



                    row.appendChild(
                        checkbox
                    );


                    row.appendChild(
                        nameInput
                    );


                    row.appendChild(
                        minutesBox
                    );


                    row.appendChild(
                        timerSelectButton
                    );


                    row.appendChild(
                        deleteSessionButton
                    );


                    sessionList.appendChild(
                        row
                    );

                }
            );



            /* =================================
               ADD SESSION
            ================================= */

            const addSessionBox =
                document.createElement(
                    "div"
                );


            addSessionBox.classList.add(
                "learning-add-session-box"
            );



            const newSessionName =
                document.createElement(
                    "input"
                );


            newSessionName.type =
                "text";


            newSessionName.placeholder =
                "Session name";


            newSessionName.classList.add(
                "new-learning-session-name"
            );



            const newSessionMinutes =
                document.createElement(
                    "input"
                );


            newSessionMinutes.type =
                "number";


            newSessionMinutes.min =
                "1";


            newSessionMinutes.value =
                "25";


            newSessionMinutes.classList.add(
                "new-learning-session-minutes"
            );



            const addSessionButton =
                document.createElement(
                    "button"
                );


            addSessionButton.type =
                "button";


            addSessionButton.textContent =
                "+ Add Session";


            addSessionButton.classList.add(
                "add-learning-session-button"
            );



            function addLearningSession() {

                const sessionName =
                    newSessionName
                        .value
                        .trim();


                let minutes =
                    Number(
                        newSessionMinutes.value
                    );


                if (
                    sessionName === ""
                ) {

                    newSessionName.focus();

                    return;

                }


                if (
                    !minutes ||
                    minutes < 1
                ) {

                    minutes =
                        1;

                }


                const newSession = {

                    id:
                        createLearningId(),

                    name:
                        sessionName,

                    minutes:
                        minutes,

                    completedDate:
                        null

                };


                learningPlans[
                    subjectIndex
                ]
                .sessions
                .push(
                    newSession
                );


                if (
                    !learningPlans[
                        subjectIndex
                    ].activeSessionId
                ) {

                    learningPlans[
                        subjectIndex
                    ].activeSessionId =
                        newSession.id;

                }


                saveLearningPlans();

                renderLearningPlans();

            }



            addSessionButton.addEventListener(
                "click",
                addLearningSession
            );


            newSessionName.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        addLearningSession();

                    }

                }
            );



            addSessionBox.appendChild(
                newSessionName
            );


            addSessionBox.appendChild(
                newSessionMinutes
            );


            addSessionBox.appendChild(
                addSessionButton
            );



            sessionSection.appendChild(
                sessionHeading
            );


            sessionSection.appendChild(
                sessionList
            );


            sessionSection.appendChild(
                addSessionBox
            );



            /* =================================
               TIMER
            ================================= */

            const timerArea =
                document.createElement(
                    "div"
                );


            timerArea.classList.add(
                "custom-learning-timer"
            );



            if (
                subject.sessions.length === 0
            ) {

                timerArea.innerHTML =
                    `
                        <div class="learning-no-timer">

                            ⏱ Add a session to use the timer.

                        </div>
                    `;

            }

            else {

                let activeSession =
                    subject.sessions.find(
                        function(session) {

                            return (
                                session.id
                                ===
                                subject.activeSessionId
                            );

                        }
                    );


                if (
                    !activeSession
                ) {

                    activeSession =
                        subject.sessions[0];


                    learningPlans[
                        subjectIndex
                    ].activeSessionId =
                        activeSession.id;


                    saveLearningPlans();

                }



                let totalSeconds =
                    Number(
                        activeSession.minutes
                    )
                    *
                    60;


                let remainingSeconds =
                    totalSeconds;


                let running =
                    false;



                const timerTop =
                    document.createElement(
                        "div"
                    );


                timerTop.classList.add(
                    "custom-learning-timer-top"
                );


                timerTop.innerHTML =
                    `
                        <span>
                            Current Session
                        </span>

                        <strong>
                            ${activeSession.name}
                        </strong>
                    `;



                const timerDisplay =
                    document.createElement(
                        "div"
                    );


                timerDisplay.classList.add(
                    "custom-learning-timer-display"
                );


                timerDisplay.textContent =
                    formatLearningTime(
                        remainingSeconds
                    );



                const timerProgress =
                    document.createElement(
                        "div"
                    );


                timerProgress.classList.add(
                    "custom-timer-progress"
                );



                const timerProgressFill =
                    document.createElement(
                        "div"
                    );


                timerProgressFill.classList.add(
                    "custom-timer-progress-fill"
                );


                timerProgress.appendChild(
                    timerProgressFill
                );



                const timerButtons =
                    document.createElement(
                        "div"
                    );


                timerButtons.classList.add(
                    "custom-learning-timer-buttons"
                );



                const startButton =
                    document.createElement(
                        "button"
                    );


                startButton.type =
                    "button";


                startButton.textContent =
                    "▶ Start";


                startButton.classList.add(
                    "custom-timer-start"
                );



                const pauseButton =
                    document.createElement(
                        "button"
                    );


                pauseButton.type =
                    "button";


                pauseButton.textContent =
                    "⏸ Pause";


                pauseButton.classList.add(
                    "custom-timer-pause"
                );



                const resetButton =
                    document.createElement(
                        "button"
                    );


                resetButton.type =
                    "button";


                resetButton.textContent =
                    "↺ Reset";


                resetButton.classList.add(
                    "custom-timer-reset"
                );



                const nextButton =
                    document.createElement(
                        "button"
                    );


                nextButton.type =
                    "button";


                nextButton.textContent =
                    "Next →";


                nextButton.classList.add(
                    "custom-timer-next"
                );



                function updateTimerDisplay() {

                    timerDisplay.textContent =
                        formatLearningTime(
                            remainingSeconds
                        );


                    const completedSeconds =
                        totalSeconds
                        -
                        remainingSeconds;


                    const percentage =
                        totalSeconds === 0
                            ?
                            0
                            :
                            (
                                completedSeconds
                                /
                                totalSeconds
                            )
                            *
                            100;


                    timerProgressFill.style.width =
                        percentage
                        +
                        "%";

                }



                function startTimer() {

                    if (running) {

                        return;

                    }


                    stopActiveLearningTimer();


                    running =
                        true;


                    activeTimerInterval =
                        setInterval(
                            function() {

                                if (
                                    remainingSeconds > 0
                                ) {

                                    remainingSeconds--;


                                    updateTimerDisplay();

                                }

                                else {

                                    stopActiveLearningTimer();


                                    running =
                                        false;


                                    const currentSessionIndex =
                                        learningPlans[
                                            subjectIndex
                                        ]
                                        .sessions
                                        .findIndex(
                                            function(item) {

                                                return (
                                                    item.id
                                                    ===
                                                    activeSession.id
                                                );

                                            }
                                        );


                                    if (
                                        currentSessionIndex
                                        !==
                                        -1
                                    ) {

                                        markLearningSessionComplete(
                                            learningPlans[
                                                subjectIndex
                                            ]
                                            .sessions[
                                                currentSessionIndex
                                            ]
                                        );

                                    }



                                    const sessions =
                                        learningPlans[
                                            subjectIndex
                                        ].sessions;


                                    if (
                                        sessions.length > 1
                                    ) {

                                        const nextIndex =
                                            (
                                                currentSessionIndex
                                                +
                                                1
                                            )
                                            %
                                            sessions.length;


                                        learningPlans[
                                            subjectIndex
                                        ].activeSessionId =
                                            sessions[
                                                nextIndex
                                            ].id;

                                    }


                                    saveLearningPlans();

                                    renderLearningPlans();

                                }

                            },
                            1000
                        );

                }



                function pauseTimer() {

                    stopActiveLearningTimer();


                    running =
                        false;

                }



                function resetTimer() {

                    pauseTimer();


                    remainingSeconds =
                        totalSeconds;


                    updateTimerDisplay();

                }



                function nextTimerSession() {

                    pauseTimer();


                    const sessions =
                        learningPlans[
                            subjectIndex
                        ].sessions;


                    const currentIndex =
                        sessions.findIndex(
                            function(item) {

                                return (
                                    item.id
                                    ===
                                    activeSession.id
                                );

                            }
                        );


                    const nextIndex =
                        (
                            currentIndex
                            +
                            1
                        )
                        %
                        sessions.length;


                    learningPlans[
                        subjectIndex
                    ].activeSessionId =
                        sessions[
                            nextIndex
                        ].id;


                    saveLearningPlans();

                    renderLearningPlans();

                }



                startButton.addEventListener(
                    "click",
                    startTimer
                );


                pauseButton.addEventListener(
                    "click",
                    pauseTimer
                );


                resetButton.addEventListener(
                    "click",
                    resetTimer
                );


                nextButton.addEventListener(
                    "click",
                    nextTimerSession
                );



                timerButtons.appendChild(
                    startButton
                );


                timerButtons.appendChild(
                    pauseButton
                );


                timerButtons.appendChild(
                    resetButton
                );


                timerButtons.appendChild(
                    nextButton
                );



                timerArea.appendChild(
                    timerTop
                );


                timerArea.appendChild(
                    timerDisplay
                );


                timerArea.appendChild(
                    timerProgress
                );


                timerArea.appendChild(
                    timerButtons
                );



                updateTimerDisplay();

            }



            /* =================================
               EDIT SUBJECT
            ================================= */

            iconInput.addEventListener(
                "input",
                function() {

                    learningPlans[
                        subjectIndex
                    ].icon =
                        iconInput.value;


                    saveLearningPlans();

                }
            );


            titleInput.addEventListener(
                "input",
                function() {

                    learningPlans[
                        subjectIndex
                    ].title =
                        titleInput.value;


                    saveLearningPlans();

                }
            );



            /* =================================
               DELETE SUBJECT
            ================================= */

            deleteSubjectButton.addEventListener(
                "click",
                function() {

                    const confirmed =
                        window.confirm(
                            "Delete this learning subject?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    stopActiveLearningTimer();


                    learningPlans.splice(
                        subjectIndex,
                        1
                    );


                    saveLearningPlans();

                    renderLearningPlans();

                }
            );



            /* =================================
               ASSEMBLE CARD
            ================================= */

            card.appendChild(
                header
            );


            card.appendChild(
                progressSection
            );


            card.appendChild(
                sessionSection
            );


            card.appendChild(
                timerArea
            );


            learningSubjectsList.appendChild(
                card
            );

        }
    );


    updateLearningSummary();

}



/* =========================================
   ADD SUBJECT
========================================= */

learningSubjectForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            learningSubjectTitle
                .value
                .trim();


        let icon =
            learningSubjectIcon
                .value
                .trim();


        if (
            title === ""
        ) {

            learningFormMessage.textContent =
                "Please write a subject name.";


            learningSubjectTitle.focus();


            return;

        }


        if (
            icon === ""
        ) {

            icon =
                "📚";

        }



        learningPlans.push({

            id:
                createLearningId(),

            title:
                title,

            icon:
                icon,

            activeSessionId:
                null,

            sessions:
                []

        });



        saveLearningPlans();


        learningSubjectForm.reset();


        learningFormMessage.textContent =
            "Subject added 🌷";


        renderLearningPlans();


        learningSubjectTitle.focus();



        setTimeout(
            function() {

                learningFormMessage.textContent =
                    "";

            },
            2000
        );

    }
);



/* =========================================
   STORAGE SYNC
========================================= */

window.addEventListener(
    "storage",
    function() {

        learningPlans =
            loadLearningPlans();


        renderLearningPlans();

    }
);



/* =========================================
   START
========================================= */

renderLearningPlans();