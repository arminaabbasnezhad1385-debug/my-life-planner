/* =========================================
   GOALS
========================================= */


const PersianMonths = [

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
   DOM
========================================= */

const goalForm =
    document.getElementById(
        "goalForm"
    );


const goalTitleInput =
    document.getElementById(
        "goalTitle"
    );


const goalCategoryInput =
    document.getElementById(
        "goalCategory"
    );


const goalPriorityInput =
    document.getElementById(
        "goalPriority"
    );


const goalStatusInput =
    document.getElementById(
        "goalStatus"
    );


const goalDayInput =
    document.getElementById(
        "goalDay"
    );


const goalMonthInput =
    document.getElementById(
        "goalMonth"
    );


const goalYearInput =
    document.getElementById(
        "goalYear"
    );


const goalWhyInput =
    document.getElementById(
        "goalWhy"
    );


const goalFormMessage =
    document.getElementById(
        "goalFormMessage"
    );


const goalsList =
    document.getElementById(
        "goalsList"
    );


const emptyGoals =
    document.getElementById(
        "emptyGoals"
    );



/* =========================================
   ID
========================================= */

function createGoalId() {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now().toString()
        +
        "-"
        +
        Math.random()
            .toString(16)
            .slice(2)
    );

}



/* =========================================
   DEFAULT GOAL
========================================= */

const defaultGoals = [

    {

        id:
            createGoalId(),

        title:
            "Learn Python",

        category:
            "Learning",

        priority:
            "High",

        status:
            "In Progress",

        deadline: {

            year:
                1405,

            month:
                9,

            day:
                30

        },

        why:
            "I want to learn Python and build real projects.",

        milestones: [

            {
                id:
                    createGoalId(),

                text:
                    "Variables",

                completed:
                    true
            },

            {
                id:
                    createGoalId(),

                text:
                    "Conditions",

                completed:
                    false
            },

            {
                id:
                    createGoalId(),

                text:
                    "Loops",

                completed:
                    false
            },

            {
                id:
                    createGoalId(),

                text:
                    "Lists",

                completed:
                    false
            },

            {
                id:
                    createGoalId(),

                text:
                    "Functions",

                completed:
                    false
            },

            {
                id:
                    createGoalId(),

                text:
                    "Build a project",

                completed:
                    false
            }

        ]

    }

];



/* =========================================
   LOAD
========================================= */

function loadGoals() {

    const saved =
        localStorage.getItem(
            "myPlannerGoals"
        );


    if (
        !saved
    ) {

        return defaultGoals;

    }


    try {

        const parsed =
            JSON.parse(
                saved
            );


        if (
            Array.isArray(
                parsed
            )
        ) {

            return parsed;

        }

    }

    catch(error) {

        console.error(
            "Could not load goals:",
            error
        );

    }


    return defaultGoals;

}



let goals =
    loadGoals();



/* =========================================
   SAVE
========================================= */

function saveGoals() {

    localStorage.setItem(
        "myPlannerGoals",
        JSON.stringify(
            goals
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

function toPersianDigits(
    value
) {

    const digits =
        "۰۱۲۳۴۵۶۷۸۹";


    return String(value)
        .replace(
            /\d/g,
            function(number) {

                return digits[number];

            }
        );

}



/* =========================================
   CURRENT PERSIAN DATE
========================================= */

function getCurrentPersianDate() {

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
                part.type === "year" ||
                part.type === "month" ||
                part.type === "day"
            ) {

                result[part.type] =
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
   SET DEFAULT FORM DATE
========================================= */

function setDefaultGoalDate() {

    const today =
        getCurrentPersianDate();


    goalYearInput.value =
        today.year;


    goalMonthInput.value =
        today.month;


    goalDayInput.value =
        today.day;

}



/* =========================================
   DEADLINE
========================================= */

function formatDeadline(
    deadline
) {

    if (
        !deadline ||
        !deadline.year ||
        !deadline.month ||
        !deadline.day
    ) {

        return "No deadline";

    }


    return (
        toPersianDigits(
            deadline.day
        )
        +
        " "
        +
        PersianMonths[
            deadline.month - 1
        ]
        +
        " "
        +
        toPersianDigits(
            deadline.year
        )
    );

}



/* =========================================
   VALIDATE DATE
========================================= */

function isValidPersianDate(
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
        year < 1300 ||
        year > 1600
    ) {

        return false;

    }


    if (
        month < 1 ||
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


    if (
        day < 1 ||
        day > maxDay
    ) {

        return false;

    }


    return true;

}



/* =========================================
   PROGRESS
========================================= */

function calculateGoalProgress(
    goal
) {

    if (
        !goal.milestones ||
        goal.milestones.length === 0
    ) {

        return 0;

    }


    const completed =
        goal.milestones.filter(
            function(milestone) {

                return milestone.completed;

            }
        ).length;


    return Math.round(
        (
            completed /
            goal.milestones.length
        )
        *
        100
    );

}



/* =========================================
   CREATE OPTION
========================================= */

function createOption(
    value,
    text,
    selectedValue
) {

    const option =
        document.createElement(
            "option"
        );


    option.value =
        value;


    option.textContent =
        text;


    if (
        value === selectedValue
    ) {

        option.selected =
            true;

    }


    return option;

}



/* =========================================
   SUMMARY
========================================= */

function updateGoalSummary() {

    const totalGoals =
        goals.length;


    const completedGoals =
        goals.filter(
            function(goal) {

                return (
                    calculateGoalProgress(
                        goal
                    ) === 100
                    ||
                    goal.status ===
                    "Completed"
                );

            }
        ).length;



    let averageProgress =
        0;


    if (
        totalGoals > 0
    ) {

        const totalProgress =
            goals.reduce(
                function(total, goal) {

                    return (
                        total
                        +
                        calculateGoalProgress(
                            goal
                        )
                    );

                },
                0
            );


        averageProgress =
            Math.round(
                totalProgress /
                totalGoals
            );

    }



    document
        .querySelectorAll(
            "[data-goal-count]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    totalGoals;

            }
        );



    document
        .querySelectorAll(
            "[data-goal-completed]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completedGoals;

            }
        );



    document
        .querySelectorAll(
            "[data-goal-average]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    averageProgress
                    +
                    "%";

            }
        );

}



/* =========================================
   RENDER GOALS
========================================= */

function renderGoals() {

    goalsList.innerHTML =
        "";


    if (
        goals.length === 0
    ) {

        emptyGoals.style.display =
            "block";

    }

    else {

        emptyGoals.style.display =
            "none";

    }



    goals.forEach(
        function(goal) {

            const goalIndex =
                goals.findIndex(
                    function(item) {

                        return (
                            item.id === goal.id
                        );

                    }
                );


            const progress =
                calculateGoalProgress(
                    goal
                );


            /* GOAL CARD */

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "goal-card"
            );



            /* HEADER */

            const cardHeader =
                document.createElement(
                    "div"
                );


            cardHeader.classList.add(
                "goal-card-header"
            );



            const titleArea =
                document.createElement(
                    "div"
                );


            titleArea.classList.add(
                "goal-title-area"
            );



            const titleInput =
                document.createElement(
                    "input"
                );


            titleInput.type =
                "text";


            titleInput.value =
                goal.title;


            titleInput.classList.add(
                "goal-title-input"
            );



            const deadlinePreview =
                document.createElement(
                    "span"
                );


            deadlinePreview.classList.add(
                "goal-deadline-preview"
            );


            deadlinePreview.dir =
                "rtl";


            deadlinePreview.textContent =
                "📅 "
                +
                formatDeadline(
                    goal.deadline
                );



            titleArea.appendChild(
                titleInput
            );


            titleArea.appendChild(
                deadlinePreview
            );



            const deleteGoalButton =
                document.createElement(
                    "button"
                );


            deleteGoalButton.type =
                "button";


            deleteGoalButton.classList.add(
                "delete-goal-button"
            );


            deleteGoalButton.textContent =
                "Delete";


            cardHeader.appendChild(
                titleArea
            );


            cardHeader.appendChild(
                deleteGoalButton
            );



            /* PROGRESS */

            const progressArea =
                document.createElement(
                    "div"
                );


            progressArea.classList.add(
                "goal-progress-area"
            );


            progressArea.innerHTML =
                `
                    <div class="goal-progress-top">
                        <span>Progress</span>
                        <strong>${progress}%</strong>
                    </div>

                    <div class="goal-progress-bar">
                        <div
                            class="goal-progress-fill"
                            style="width: ${progress}%"
                        ></div>
                    </div>
                `;



            /* SETTINGS */

            const settings =
                document.createElement(
                    "div"
                );


            settings.classList.add(
                "goal-edit-grid"
            );



            /* CATEGORY */

            const categoryGroup =
                document.createElement(
                    "div"
                );


            categoryGroup.classList.add(
                "goal-edit-group"
            );


            const categoryLabel =
                document.createElement(
                    "label"
                );


            categoryLabel.textContent =
                "Category";


            const categoryInput =
                document.createElement(
                    "input"
                );


            categoryInput.type =
                "text";


            categoryInput.value =
                goal.category || "";


            categoryGroup.appendChild(
                categoryLabel
            );


            categoryGroup.appendChild(
                categoryInput
            );



            /* PRIORITY */

            const priorityGroup =
                document.createElement(
                    "div"
                );


            priorityGroup.classList.add(
                "goal-edit-group"
            );


            const priorityLabel =
                document.createElement(
                    "label"
                );


            priorityLabel.textContent =
                "Priority";


            const prioritySelect =
                document.createElement(
                    "select"
                );


            [
                "Low",
                "Medium",
                "High"
            ].forEach(
                function(value) {

                    prioritySelect.appendChild(
                        createOption(
                            value,
                            value,
                            goal.priority
                        )
                    );

                }
            );


            priorityGroup.appendChild(
                priorityLabel
            );


            priorityGroup.appendChild(
                prioritySelect
            );



            /* STATUS */

            const statusGroup =
                document.createElement(
                    "div"
                );


            statusGroup.classList.add(
                "goal-edit-group"
            );


            const statusLabel =
                document.createElement(
                    "label"
                );


            statusLabel.textContent =
                "Status";


            const statusSelect =
                document.createElement(
                    "select"
                );


            [
                "Not Started",
                "In Progress",
                "Paused",
                "Completed"
            ].forEach(
                function(value) {

                    statusSelect.appendChild(
                        createOption(
                            value,
                            value,
                            goal.status
                        )
                    );

                }
            );


            statusGroup.appendChild(
                statusLabel
            );


            statusGroup.appendChild(
                statusSelect
            );



            settings.appendChild(
                categoryGroup
            );


            settings.appendChild(
                priorityGroup
            );


            settings.appendChild(
                statusGroup
            );



            /* DATE EDITOR */

            const dateSection =
                document.createElement(
                    "div"
                );


            dateSection.classList.add(
                "goal-date-editor"
            );


            const dateLabel =
                document.createElement(
                    "label"
                );


            dateLabel.textContent =
                "Deadline — تاریخ شمسی";


            const dateInputs =
                document.createElement(
                    "div"
                );


            dateInputs.classList.add(
                "goal-date-edit-inputs"
            );



            const dayInput =
                document.createElement(
                    "input"
                );


            dayInput.type =
                "number";


            dayInput.min =
                "1";


            dayInput.max =
                "31";


            dayInput.value =
                goal.deadline?.day || "";



            const monthSelect =
                document.createElement(
                    "select"
                );


            PersianMonths.forEach(
                function(monthName, index) {

                    monthSelect.appendChild(
                        createOption(
                            String(
                                index + 1
                            ),
                            monthName,
                            String(
                                goal.deadline?.month
                            )
                        )
                    );

                }
            );



            const yearInput =
                document.createElement(
                    "input"
                );


            yearInput.type =
                "number";


            yearInput.min =
                "1300";


            yearInput.max =
                "1600";


            yearInput.value =
                goal.deadline?.year || "";



            dateInputs.appendChild(
                dayInput
            );


            dateInputs.appendChild(
                monthSelect
            );


            dateInputs.appendChild(
                yearInput
            );


            dateSection.appendChild(
                dateLabel
            );


            dateSection.appendChild(
                dateInputs
            );



            /* WHY */

            const whySection =
                document.createElement(
                    "div"
                );


            whySection.classList.add(
                "goal-why"
            );


            const whyLabel =
                document.createElement(
                    "label"
                );


            whyLabel.textContent =
                "Why";


            const whyTextarea =
                document.createElement(
                    "textarea"
                );


            whyTextarea.placeholder =
                "Why is this goal important?";


            whyTextarea.value =
                goal.why || "";


            whySection.appendChild(
                whyLabel
            );


            whySection.appendChild(
                whyTextarea
            );



            /* MILESTONE SECTION */

            const milestoneSection =
                document.createElement(
                    "div"
                );


            milestoneSection.classList.add(
                "milestone-section"
            );



            const milestoneHeader =
                document.createElement(
                    "div"
                );


            milestoneHeader.classList.add(
                "milestone-header"
            );



            const milestoneTitle =
                document.createElement(
                    "h3"
                );


            milestoneTitle.textContent =
                "Milestones";



            const milestoneCount =
                document.createElement(
                    "span"
                );


            const completedMilestones =
                goal.milestones.filter(
                    function(item) {

                        return item.completed;

                    }
                ).length;


            milestoneCount.textContent =
                completedMilestones
                +
                " / "
                +
                goal.milestones.length;



            milestoneHeader.appendChild(
                milestoneTitle
            );


            milestoneHeader.appendChild(
                milestoneCount
            );



            const milestoneList =
                document.createElement(
                    "div"
                );


            milestoneList.classList.add(
                "milestone-list"
            );



            goal.milestones.forEach(
                function(
                    milestone
                ) {

                    const milestoneIndex =
                        goal.milestones.findIndex(
                            function(item) {

                                return (
                                    item.id
                                    ===
                                    milestone.id
                                );

                            }
                        );



                    const row =
                        document.createElement(
                            "div"
                        );


                    row.classList.add(
                        "milestone-item"
                    );



                    const checkbox =
                        document.createElement(
                            "input"
                        );


                    checkbox.type =
                        "checkbox";


                    checkbox.checked =
                        milestone.completed;



                    const textInput =
                        document.createElement(
                            "input"
                        );


                    textInput.type =
                        "text";


                    textInput.value =
                        milestone.text;


                    textInput.classList.add(
                        "milestone-text"
                    );



                    if (
                        milestone.completed
                    ) {

                        textInput.classList.add(
                            "completed-milestone"
                        );

                    }



                    const deleteMilestone =
                        document.createElement(
                            "button"
                        );


                    deleteMilestone.type =
                        "button";


                    deleteMilestone.textContent =
                        "×";


                    deleteMilestone.classList.add(
                        "delete-milestone-button"
                    );



                    checkbox.addEventListener(
                        "change",
                        function() {

                            goals[
                                goalIndex
                            ]
                            .milestones[
                                milestoneIndex
                            ]
                            .completed =
                                checkbox.checked;


                            saveGoals();

                            renderGoals();

                        }
                    );



                    textInput.addEventListener(
                        "input",
                        function() {

                            goals[
                                goalIndex
                            ]
                            .milestones[
                                milestoneIndex
                            ]
                            .text =
                                textInput.value;


                            saveGoals();

                        }
                    );



                    deleteMilestone.addEventListener(
                        "click",
                        function() {

                            goals[
                                goalIndex
                            ]
                            .milestones
                            .splice(
                                milestoneIndex,
                                1
                            );


                            saveGoals();

                            renderGoals();

                        }
                    );



                    row.appendChild(
                        checkbox
                    );


                    row.appendChild(
                        textInput
                    );


                    row.appendChild(
                        deleteMilestone
                    );


                    milestoneList.appendChild(
                        row
                    );

                }
            );



            /* ADD MILESTONE */

            const addMilestoneBox =
                document.createElement(
                    "div"
                );


            addMilestoneBox.classList.add(
                "add-milestone-box"
            );



            const newMilestoneInput =
                document.createElement(
                    "input"
                );


            newMilestoneInput.type =
                "text";


            newMilestoneInput.placeholder =
                "Add a milestone...";



            const addMilestoneButton =
                document.createElement(
                    "button"
                );


            addMilestoneButton.type =
                "button";


            addMilestoneButton.textContent =
                "+ Add";


            addMilestoneButton.classList.add(
                "add-milestone-button"
            );



            function addMilestone() {

                const text =
                    newMilestoneInput
                        .value
                        .trim();


                if (
                    text === ""
                ) {

                    newMilestoneInput.focus();

                    return;

                }


                goals[
                    goalIndex
                ]
                .milestones
                .push({

                    id:
                        createGoalId(),

                    text:
                        text,

                    completed:
                        false

                });


                saveGoals();

                renderGoals();

            }



            addMilestoneButton.addEventListener(
                "click",
                addMilestone
            );



            newMilestoneInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        addMilestone();

                    }

                }
            );



            addMilestoneBox.appendChild(
                newMilestoneInput
            );


            addMilestoneBox.appendChild(
                addMilestoneButton
            );



            milestoneSection.appendChild(
                milestoneHeader
            );


            milestoneSection.appendChild(
                milestoneList
            );


            milestoneSection.appendChild(
                addMilestoneBox
            );



            /* EDIT EVENTS */

            titleInput.addEventListener(
                "input",
                function() {

                    goals[
                        goalIndex
                    ].title =
                        titleInput.value;


                    saveGoals();

                }
            );


            categoryInput.addEventListener(
                "input",
                function() {

                    goals[
                        goalIndex
                    ].category =
                        categoryInput.value;


                    saveGoals();

                }
            );


            prioritySelect.addEventListener(
                "change",
                function() {

                    goals[
                        goalIndex
                    ].priority =
                        prioritySelect.value;


                    saveGoals();

                }
            );


            statusSelect.addEventListener(
                "change",
                function() {

                    goals[
                        goalIndex
                    ].status =
                        statusSelect.value;


                    saveGoals();

                    updateGoalSummary();

                }
            );


            whyTextarea.addEventListener(
                "input",
                function() {

                    goals[
                        goalIndex
                    ].why =
                        whyTextarea.value;


                    saveGoals();

                }
            );



            function updateDeadline() {

                const year =
                    Number(
                        yearInput.value
                    );


                const month =
                    Number(
                        monthSelect.value
                    );


                const day =
                    Number(
                        dayInput.value
                    );


                if (
                    !isValidPersianDate(
                        year,
                        month,
                        day
                    )
                ) {

                    deadlinePreview.textContent =
                        "📅 Invalid date";

                    return;

                }


                goals[
                    goalIndex
                ].deadline = {

                    year:
                        year,

                    month:
                        month,

                    day:
                        day

                };


                deadlinePreview.textContent =
                    "📅 "
                    +
                    formatDeadline(
                        goals[
                            goalIndex
                        ].deadline
                    );


                saveGoals();

            }



            dayInput.addEventListener(
                "change",
                updateDeadline
            );


            monthSelect.addEventListener(
                "change",
                updateDeadline
            );


            yearInput.addEventListener(
                "change",
                updateDeadline
            );



            /* DELETE GOAL */

            deleteGoalButton.addEventListener(
                "click",
                function() {

                    const confirmDelete =
                        window.confirm(
                            "Delete this goal?"
                        );


                    if (
                        !confirmDelete
                    ) {

                        return;

                    }


                    goals.splice(
                        goalIndex,
                        1
                    );


                    saveGoals();

                    renderGoals();

                }
            );



            /* ASSEMBLE */

            card.appendChild(
                cardHeader
            );


            card.appendChild(
                progressArea
            );


            card.appendChild(
                settings
            );


            card.appendChild(
                dateSection
            );


            card.appendChild(
                whySection
            );


            card.appendChild(
                milestoneSection
            );


            goalsList.appendChild(
                card
            );

        }
    );


    updateGoalSummary();

}



/* =========================================
   ADD GOAL
========================================= */

goalForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            goalTitleInput
                .value
                .trim();


        const category =
            goalCategoryInput
                .value
                .trim();


        const priority =
            goalPriorityInput
                .value;


        const status =
            goalStatusInput
                .value;


        const year =
            Number(
                goalYearInput.value
            );


        const month =
            Number(
                goalMonthInput.value
            );


        const day =
            Number(
                goalDayInput.value
            );


        const why =
            goalWhyInput
                .value
                .trim();



        if (
            title === ""
        ) {

            goalFormMessage.textContent =
                "Please write a goal title.";


            goalTitleInput.focus();

            return;

        }



        if (
            !isValidPersianDate(
                year,
                month,
                day
            )
        ) {

            goalFormMessage.textContent =
                "Please enter a valid Persian deadline.";


            return;

        }



        const newGoal = {

            id:
                createGoalId(),

            title:
                title,

            category:
                category,

            priority:
                priority,

            status:
                status,

            deadline: {

                year:
                    year,

                month:
                    month,

                day:
                    day

            },

            why:
                why,

            milestones:
                []

        };



        goals.unshift(
            newGoal
        );


        saveGoals();

        renderGoals();



        goalForm.reset();


        goalFormMessage.textContent =
            "Goal created successfully 🌷";


        goalPriorityInput.value =
            "Medium";


        goalStatusInput.value =
            "In Progress";


        setDefaultGoalDate();


        goalTitleInput.focus();



        setTimeout(
            function() {

                goalFormMessage.textContent =
                    "";

            },
            2500
        );

    }
);



/* =========================================
   START
========================================= */

setDefaultGoalDate();

renderGoals();