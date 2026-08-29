/* =========================================
   WORK PLANNER
========================================= */


const WORK_STORAGE_KEY =
    "myPlannerWorkProjects";


const workPersianMonths = [

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

const workProjectForm =
    document.getElementById(
        "workProjectForm"
    );


const workProjectTitle =
    document.getElementById(
        "workProjectTitle"
    );


const workClient =
    document.getElementById(
        "workClient"
    );


const workPriority =
    document.getElementById(
        "workPriority"
    );


const workStatus =
    document.getElementById(
        "workStatus"
    );


const workDeadlineDay =
    document.getElementById(
        "workDeadlineDay"
    );


const workDeadlineMonth =
    document.getElementById(
        "workDeadlineMonth"
    );


const workDeadlineYear =
    document.getElementById(
        "workDeadlineYear"
    );


const workDescription =
    document.getElementById(
        "workDescription"
    );


const workFormMessage =
    document.getElementById(
        "workFormMessage"
    );


const workProjectsList =
    document.getElementById(
        "workProjectsList"
    );


const emptyWorkProjects =
    document.getElementById(
        "emptyWorkProjects"
    );


const workStatusFilter =
    document.getElementById(
        "workStatusFilter"
    );



/* =========================================
   ID
========================================= */

function createWorkId() {

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
   LOAD PROJECTS
========================================= */

function loadWorkProjects() {

    const saved =
        localStorage.getItem(
            WORK_STORAGE_KEY
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
            "Work data error:",
            error
        );


        return [];

    }

}



let workProjects =
    loadWorkProjects();



/* =========================================
   SAVE
========================================= */

function saveWorkProjects() {

    localStorage.setItem(
        WORK_STORAGE_KEY,
        JSON.stringify(
            workProjects
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

function workPersianDigits(
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
   TODAY PERSIAN
========================================= */

function getCurrentWorkPersianDate() {

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
   DEFAULT DATE
========================================= */

function setDefaultWorkDate() {

    const today =
        getCurrentWorkPersianDate();


    workDeadlineYear.value =
        today.year;


    workDeadlineMonth.value =
        today.month;


    workDeadlineDay.value =
        today.day;

}



/* =========================================
   DATE VALIDATION
========================================= */

function validWorkPersianDate(
    year,
    month,
    day
) {

    if (
        !year
        ||
        !month
        ||
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

    else if (
        month <= 11
    ) {

        maxDay =
            30;

    }

    else {

        /*
            Esfand can be 29 or 30.
            We allow 30 here.
        */

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
   FORMAT DATE
========================================= */

function formatWorkDeadline(
    deadline
) {

    if (
        !deadline
    ) {

        return "No deadline";

    }


    return (

        workPersianDigits(
            deadline.day
        )

        +
        " "

        +
        workPersianMonths[
            deadline.month - 1
        ]

        +
        " "

        +
        workPersianDigits(
            deadline.year
        )

    );

}



/* =========================================
   PROGRESS
========================================= */

function calculateWorkProgress(
    project
) {

    if (
        !project.tasks
        ||
        project.tasks.length === 0
    ) {

        return 0;

    }


    const completed =
        project.tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    return Math.round(
        (
            completed
            /
            project.tasks.length
        )
        *
        100
    );

}



/* =========================================
   SUMMARY
========================================= */

function updateWorkSummary() {

    const total =
        workProjects.length;


    const completed =
        workProjects.filter(
            function(project) {

                return (
                    project.status
                    ===
                    "Completed"
                    ||
                    calculateWorkProgress(
                        project
                    )
                    ===
                    100
                );

            }
        ).length;


    const active =
        workProjects.filter(
            function(project) {

                return (
                    project.status
                    ===
                    "In Progress"
                );

            }
        ).length;


    let average =
        0;


    if (
        total > 0
    ) {

        const totalProgress =
            workProjects.reduce(
                function(sum, project) {

                    return (
                        sum
                        +
                        calculateWorkProgress(
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
            "[data-work-total]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    total;

            }
        );


    document
        .querySelectorAll(
            "[data-work-active]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    active;

            }
        );


    document
        .querySelectorAll(
            "[data-work-completed]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completed;

            }
        );


    document
        .querySelectorAll(
            "[data-work-average]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    average
                    +
                    "%";

            }
        );

}



/* =========================================
   SELECT OPTION
========================================= */

function createWorkOption(
    value,
    selectedValue
) {

    const option =
        document.createElement(
            "option"
        );


    option.value =
        value;


    option.textContent =
        value;


    if (
        value === selectedValue
    ) {

        option.selected =
            true;

    }


    return option;

}



/* =========================================
   PROJECT STATUS CLASS
========================================= */

function getWorkStatusClass(
    status
) {

    if (
        status === "Completed"
    ) {

        return "work-status-completed";

    }


    if (
        status === "Waiting"
    ) {

        return "work-status-waiting";

    }


    if (
        status === "Not Started"
    ) {

        return "work-status-not-started";

    }


    return "work-status-progress";

}



/* =========================================
   RENDER PROJECTS
========================================= */

function renderWorkProjects() {

    workProjectsList.innerHTML =
        "";


    const filter =
        workStatusFilter.value;


    let projectsToShow =
        workProjects;


    if (
        filter !== "All"
    ) {

        projectsToShow =
            workProjects.filter(
                function(project) {

                    return (
                        project.status
                        ===
                        filter
                    );

                }
            );

    }



    if (
        projectsToShow.length === 0
    ) {

        emptyWorkProjects.style.display =
            "block";

    }

    else {

        emptyWorkProjects.style.display =
            "none";

    }



    projectsToShow.forEach(
        function(project) {

            const projectIndex =
                workProjects.findIndex(
                    function(item) {

                        return (
                            item.id
                            ===
                            project.id
                        );

                    }
                );


            const progress =
                calculateWorkProgress(
                    project
                );


            const completedTasks =
                project.tasks.filter(
                    function(task) {

                        return task.completed;

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
                "work-project-card"
            );



            /* =================================
               HEADER
            ================================= */

            const header =
                document.createElement(
                    "div"
                );


            header.classList.add(
                "work-project-header"
            );



            const headingLeft =
                document.createElement(
                    "div"
                );


            headingLeft.classList.add(
                "work-project-heading"
            );



            const titleInput =
                document.createElement(
                    "input"
                );


            titleInput.type =
                "text";


            titleInput.value =
                project.title;


            titleInput.classList.add(
                "work-title-input"
            );



            const metaRow =
                document.createElement(
                    "div"
                );


            metaRow.classList.add(
                "work-project-meta"
            );



            const clientLabel =
                document.createElement(
                    "span"
                );


            clientLabel.textContent =
                project.client
                    ?
                    "👤 "
                    +
                    project.client
                    :
                    "👤 No client";



            const deadlineLabel =
                document.createElement(
                    "span"
                );


            deadlineLabel.dir =
                "rtl";


            deadlineLabel.textContent =
                "📅 "
                +
                formatWorkDeadline(
                    project.deadline
                );



            const statusBadge =
                document.createElement(
                    "span"
                );


            statusBadge.classList.add(
                "work-status-badge"
            );


            statusBadge.classList.add(
                getWorkStatusClass(
                    project.status
                )
            );


            statusBadge.textContent =
                project.status;



            metaRow.appendChild(
                clientLabel
            );


            metaRow.appendChild(
                deadlineLabel
            );


            metaRow.appendChild(
                statusBadge
            );



            headingLeft.appendChild(
                titleInput
            );


            headingLeft.appendChild(
                metaRow
            );



            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.classList.add(
                "delete-work-project-button"
            );


            deleteButton.textContent =
                "Delete";



            header.appendChild(
                headingLeft
            );


            header.appendChild(
                deleteButton
            );



            /* =================================
               PROGRESS
            ================================= */

            const progressBox =
                document.createElement(
                    "div"
                );


            progressBox.classList.add(
                "work-progress-box"
            );


            progressBox.innerHTML =
                `
                    <div class="work-progress-heading">

                        <span>
                            Project Progress
                        </span>

                        <strong>
                            ${progress}%
                        </strong>

                    </div>

                    <div class="work-progress-bar">

                        <div
                            class="work-progress-fill"
                            style="width: ${progress}%"
                        >
                        </div>

                    </div>

                    <div class="work-task-count">

                        ${completedTasks}
                        /
                        ${project.tasks.length}
                        tasks completed

                    </div>
                `;



            /* =================================
               PROJECT SETTINGS
            ================================= */

            const settings =
                document.createElement(
                    "div"
                );


            settings.classList.add(
                "work-project-settings"
            );



            /* CLIENT */

            const clientGroup =
                document.createElement(
                    "div"
                );


            clientGroup.classList.add(
                "work-edit-group"
            );


            const clientGroupLabel =
                document.createElement(
                    "label"
                );


            clientGroupLabel.textContent =
                "Client";


            const clientInput =
                document.createElement(
                    "input"
                );


            clientInput.type =
                "text";


            clientInput.value =
                project.client
                ||
                "";


            clientGroup.appendChild(
                clientGroupLabel
            );


            clientGroup.appendChild(
                clientInput
            );



            /* PRIORITY */

            const priorityGroup =
                document.createElement(
                    "div"
                );


            priorityGroup.classList.add(
                "work-edit-group"
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

                        createWorkOption(
                            value,
                            project.priority
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
                "work-edit-group"
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
                "Waiting",
                "Completed"
            ].forEach(
                function(value) {

                    statusSelect.appendChild(

                        createWorkOption(
                            value,
                            project.status
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
                clientGroup
            );


            settings.appendChild(
                priorityGroup
            );


            settings.appendChild(
                statusGroup
            );



            /* =================================
               DEADLINE EDIT
            ================================= */

            const deadlineSection =
                document.createElement(
                    "div"
                );


            deadlineSection.classList.add(
                "work-deadline-editor"
            );



            const deadlineTitle =
                document.createElement(
                    "label"
                );


            deadlineTitle.textContent =
                "Deadline — تاریخ شمسی";



            const deadlineInputs =
                document.createElement(
                    "div"
                );


            deadlineInputs.classList.add(
                "work-edit-date-grid"
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
                project.deadline.day;



            const monthSelect =
                document.createElement(
                    "select"
                );


            workPersianMonths.forEach(
                function(monthName, index) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        index + 1;


                    option.textContent =
                        monthName;


                    if (
                        index + 1
                        ===
                        project.deadline.month
                    ) {

                        option.selected =
                            true;

                    }


                    monthSelect.appendChild(
                        option
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
                project.deadline.year;



            deadlineInputs.appendChild(
                dayInput
            );


            deadlineInputs.appendChild(
                monthSelect
            );


            deadlineInputs.appendChild(
                yearInput
            );


            deadlineSection.appendChild(
                deadlineTitle
            );


            deadlineSection.appendChild(
                deadlineInputs
            );



            /* =================================
               DESCRIPTION
            ================================= */

            const descriptionGroup =
                document.createElement(
                    "div"
                );


            descriptionGroup.classList.add(
                "work-description-group"
            );


            const descriptionLabel =
                document.createElement(
                    "label"
                );


            descriptionLabel.textContent =
                "Description";


            const descriptionInput =
                document.createElement(
                    "textarea"
                );


            descriptionInput.value =
                project.description
                ||
                "";


            descriptionInput.placeholder =
                "Project description...";


            descriptionGroup.appendChild(
                descriptionLabel
            );


            descriptionGroup.appendChild(
                descriptionInput
            );



            /* =================================
               TASKS
            ================================= */

            const taskSection =
                document.createElement(
                    "div"
                );


            taskSection.classList.add(
                "work-project-tasks"
            );



            const taskHeader =
                document.createElement(
                    "div"
                );


            taskHeader.classList.add(
                "work-task-header"
            );


            taskHeader.innerHTML =
                `
                    <h3>
                        Project Tasks
                    </h3>

                    <span>
                        ${completedTasks}
                        /
                        ${project.tasks.length}
                    </span>
                `;



            const taskList =
                document.createElement(
                    "div"
                );


            taskList.classList.add(
                "work-task-list"
            );



            project.tasks.forEach(
                function(task) {

                    const taskIndex =
                        project.tasks.findIndex(
                            function(item) {

                                return (
                                    item.id
                                    ===
                                    task.id
                                );

                            }
                        );



                    const row =
                        document.createElement(
                            "div"
                        );


                    row.classList.add(
                        "work-task-item"
                    );



                    const checkbox =
                        document.createElement(
                            "input"
                        );


                    checkbox.type =
                        "checkbox";


                    checkbox.checked =
                        task.completed;



                    const textInput =
                        document.createElement(
                            "input"
                        );


                    textInput.type =
                        "text";


                    textInput.value =
                        task.text;


                    textInput.classList.add(
                        "work-task-text"
                    );


                    if (
                        task.completed
                    ) {

                        textInput.classList.add(
                            "work-task-completed"
                        );

                    }



                    const deleteTask =
                        document.createElement(
                            "button"
                        );


                    deleteTask.type =
                        "button";


                    deleteTask.textContent =
                        "×";


                    deleteTask.classList.add(
                        "delete-work-task-button"
                    );



                    checkbox.addEventListener(
                        "change",
                        function() {

                            workProjects[
                                projectIndex
                            ]
                            .tasks[
                                taskIndex
                            ]
                            .completed =
                                checkbox.checked;


                            saveWorkProjects();

                            renderWorkProjects();

                            updateWorkSummary();

                        }
                    );



                    textInput.addEventListener(
                        "input",
                        function() {

                            workProjects[
                                projectIndex
                            ]
                            .tasks[
                                taskIndex
                            ]
                            .text =
                                textInput.value;


                            saveWorkProjects();

                        }
                    );



                    deleteTask.addEventListener(
                        "click",
                        function() {

                            workProjects[
                                projectIndex
                            ]
                            .tasks
                            .splice(
                                taskIndex,
                                1
                            );


                            saveWorkProjects();

                            renderWorkProjects();

                            updateWorkSummary();

                        }
                    );



                    row.appendChild(
                        checkbox
                    );


                    row.appendChild(
                        textInput
                    );


                    row.appendChild(
                        deleteTask
                    );


                    taskList.appendChild(
                        row
                    );

                }
            );



            /* ADD TASK */

            const addTaskBox =
                document.createElement(
                    "div"
                );


            addTaskBox.classList.add(
                "add-work-task-box"
            );


            const newTaskInput =
                document.createElement(
                    "input"
                );


            newTaskInput.type =
                "text";


            newTaskInput.placeholder =
                "Add project task...";


            const addTaskButton =
                document.createElement(
                    "button"
                );


            addTaskButton.type =
                "button";


            addTaskButton.textContent =
                "+ Add";


            addTaskButton.classList.add(
                "add-work-task-button"
            );



            function addWorkTask() {

                const text =
                    newTaskInput
                        .value
                        .trim();


                if (
                    text === ""
                ) {

                    newTaskInput.focus();

                    return;

                }


                workProjects[
                    projectIndex
                ]
                .tasks
                .push({

                    id:
                        createWorkId(),

                    text:
                        text,

                    completed:
                        false

                });


                saveWorkProjects();

                renderWorkProjects();

                updateWorkSummary();

            }



            addTaskButton.addEventListener(
                "click",
                addWorkTask
            );


            newTaskInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        addWorkTask();

                    }

                }
            );


            addTaskBox.appendChild(
                newTaskInput
            );


            addTaskBox.appendChild(
                addTaskButton
            );



            taskSection.appendChild(
                taskHeader
            );


            taskSection.appendChild(
                taskList
            );


            taskSection.appendChild(
                addTaskBox
            );



            /* =================================
               EVENTS
            ================================= */

            titleInput.addEventListener(
                "input",
                function() {

                    workProjects[
                        projectIndex
                    ].title =
                        titleInput.value;


                    saveWorkProjects();

                }
            );


            clientInput.addEventListener(
                "input",
                function() {

                    workProjects[
                        projectIndex
                    ].client =
                        clientInput.value;


                    clientLabel.textContent =
                        clientInput.value
                            ?
                            "👤 "
                            +
                            clientInput.value
                            :
                            "👤 No client";


                    saveWorkProjects();

                }
            );


            prioritySelect.addEventListener(
                "change",
                function() {

                    workProjects[
                        projectIndex
                    ].priority =
                        prioritySelect.value;


                    saveWorkProjects();

                }
            );


            statusSelect.addEventListener(
                "change",
                function() {

                    workProjects[
                        projectIndex
                    ].status =
                        statusSelect.value;


                    saveWorkProjects();

                    renderWorkProjects();

                    updateWorkSummary();

                }
            );


            descriptionInput.addEventListener(
                "input",
                function() {

                    workProjects[
                        projectIndex
                    ].description =
                        descriptionInput.value;


                    saveWorkProjects();

                }
            );



            function updateProjectDeadline() {

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
                    !validWorkPersianDate(
                        year,
                        month,
                        day
                    )
                ) {

                    deadlineLabel.textContent =
                        "📅 Invalid date";


                    return;

                }


                workProjects[
                    projectIndex
                ].deadline = {

                    year:
                        year,

                    month:
                        month,

                    day:
                        day

                };


                deadlineLabel.textContent =
                    "📅 "
                    +
                    formatWorkDeadline(
                        workProjects[
                            projectIndex
                        ].deadline
                    );


                saveWorkProjects();

            }



            dayInput.addEventListener(
                "change",
                updateProjectDeadline
            );


            monthSelect.addEventListener(
                "change",
                updateProjectDeadline
            );


            yearInput.addEventListener(
                "change",
                updateProjectDeadline
            );



            deleteButton.addEventListener(
                "click",
                function() {

                    const confirmed =
                        window.confirm(
                            "Delete this project?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    workProjects.splice(
                        projectIndex,
                        1
                    );


                    saveWorkProjects();

                    renderWorkProjects();

                    updateWorkSummary();

                }
            );



            /* =================================
               ASSEMBLE
            ================================= */

            card.appendChild(
                header
            );


            card.appendChild(
                progressBox
            );


            card.appendChild(
                settings
            );


            card.appendChild(
                deadlineSection
            );


            card.appendChild(
                descriptionGroup
            );


            card.appendChild(
                taskSection
            );


            workProjectsList.appendChild(
                card
            );

        }
    );


    updateWorkSummary();

}



/* =========================================
   CREATE PROJECT
========================================= */

workProjectForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            workProjectTitle
                .value
                .trim();


        const client =
            workClient
                .value
                .trim();


        const year =
            Number(
                workDeadlineYear.value
            );


        const month =
            Number(
                workDeadlineMonth.value
            );


        const day =
            Number(
                workDeadlineDay.value
            );


        if (
            title === ""
        ) {

            workFormMessage.textContent =
                "Please write a project title.";


            workProjectTitle.focus();


            return;

        }


        if (
            !validWorkPersianDate(
                year,
                month,
                day
            )
        ) {

            workFormMessage.textContent =
                "Please enter a valid Persian deadline.";


            return;

        }



        const project = {

            id:
                createWorkId(),

            title:
                title,

            client:
                client,

            priority:
                workPriority.value,

            status:
                workStatus.value,

            deadline: {

                year:
                    year,

                month:
                    month,

                day:
                    day

            },

            description:
                workDescription
                    .value
                    .trim(),

            tasks:
                [],

            createdAt:
                Date.now()

        };



        workProjects.unshift(
            project
        );


        saveWorkProjects();


        workProjectForm.reset();


        workPriority.value =
            "Medium";


        workStatus.value =
            "In Progress";


        setDefaultWorkDate();


        renderWorkProjects();

        updateWorkSummary();


        workFormMessage.textContent =
            "Project created successfully 🌷";


        workProjectTitle.focus();


        setTimeout(
            function() {

                workFormMessage.textContent =
                    "";

            },
            2200
        );

    }
);



/* =========================================
   FILTER
========================================= */

workStatusFilter.addEventListener(
    "change",
    renderWorkProjects
);



/* =========================================
   STORAGE UPDATE
========================================= */

window.addEventListener(
    "storage",
    function() {

        workProjects =
            loadWorkProjects();


        renderWorkProjects();

        updateWorkSummary();

    }
);



/* =========================================
   START
========================================= */

setDefaultWorkDate();

renderWorkProjects();

updateWorkSummary();