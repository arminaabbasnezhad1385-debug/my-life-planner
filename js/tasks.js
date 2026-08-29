function getTaskDateKey() {

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


    return `${year}-${month}-${day}`;

}



let tasks =
    JSON.parse(
        localStorage.getItem(
            "myPlannerTasks"
        )
    ) || [

        {
            text:
                "Practice HTML",

            completed:
                false
        },

        {
            text:
                "Learn CSS",

            completed:
                false
        },

        {
            text:
                "Study English",

            completed:
                false
        }

    ];



const taskToday =
    getTaskDateKey();


const savedTaskDate =
    localStorage.getItem(
        "myPlannerTasksDate"
    );



/* RESET TASK CHECKBOXES EVERY NEW DAY */

if (
    savedTaskDate !== taskToday
) {

    tasks =
        tasks.map(
            function(task) {

                return {

                    text:
                        task.text,

                    completed:
                        false

                };

            }
        );


    localStorage.setItem(
        "myPlannerTasks",
        JSON.stringify(tasks)
    );


    localStorage.setItem(
        "myPlannerTasksDate",
        taskToday
    );

}



function saveTasks() {

    localStorage.setItem(
        "myPlannerTasks",
        JSON.stringify(tasks)
    );


    localStorage.setItem(
        "myPlannerTasksDate",
        taskToday
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



const taskManagers =
    document.querySelectorAll(
        ".task-manager"
    );



taskManagers.forEach(
    function(manager) {

        const input =
            manager.querySelector(
                ".new-task-input"
            );


        const addButton =
            manager.querySelector(
                ".add-task-button"
            );


        const list =
            manager.querySelector(
                ".custom-task-list"
            );


        const emptyMessage =
            manager.querySelector(
                ".task-empty-message"
            );



        function renderTasks() {

            list.innerHTML =
                "";


            if (
                tasks.length === 0
            ) {

                emptyMessage.style.display =
                    "block";

            }

            else {

                emptyMessage.style.display =
                    "none";

            }



            tasks.forEach(
                function(task, index) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.classList.add(
                        "custom-task-item"
                    );



                    const checkbox =
                        document.createElement(
                            "input"
                        );


                    checkbox.type =
                        "checkbox";


                    checkbox.checked =
                        task.completed;


                    checkbox.classList.add(
                        "task-checkbox"
                    );



                    const taskText =
                        document.createElement(
                            "input"
                        );


                    taskText.type =
                        "text";


                    taskText.value =
                        task.text;


                    taskText.classList.add(
                        "editable-task-text"
                    );


                    if (
                        task.completed
                    ) {

                        taskText.classList.add(
                            "completed-task"
                        );

                    }



                    const deleteButton =
                        document.createElement(
                            "button"
                        );


                    deleteButton.type =
                        "button";


                    deleteButton.textContent =
                        "×";


                    deleteButton.classList.add(
                        "delete-task-button"
                    );



                    checkbox.addEventListener(
                        "change",
                        function() {

                            tasks[index].completed =
                                checkbox.checked;


                            saveTasks();

                            renderAllTaskManagers();

                        }
                    );



                    taskText.addEventListener(
                        "input",
                        function() {

                            tasks[index].text =
                                taskText.value;


                            saveTasks();

                        }
                    );



                    deleteButton.addEventListener(
                        "click",
                        function() {

                            tasks.splice(
                                index,
                                1
                            );


                            saveTasks();

                            renderAllTaskManagers();

                        }
                    );



                    item.appendChild(
                        checkbox
                    );


                    item.appendChild(
                        taskText
                    );


                    item.appendChild(
                        deleteButton
                    );


                    list.appendChild(
                        item
                    );

                }
            );

        }



        function addTask() {

            const text =
                input.value.trim();


            if (
                text === ""
            ) {

                input.focus();

                return;

            }


            tasks.push({

                text:
                    text,

                completed:
                    false

            });


            saveTasks();

            renderAllTaskManagers();


            input.value =
                "";


            input.focus();

        }



        addButton.addEventListener(
            "click",
            addTask
        );



        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    addTask();

                }

            }
        );


        manager.renderTasks =
            renderTasks;

    }
);



function renderAllTaskManagers() {

    taskManagers.forEach(
        function(manager) {

            manager.renderTasks();

        }
    );

}



renderAllTaskManagers();