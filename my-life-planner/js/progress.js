function getStoredTasks() {

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



function getStoredHabits() {

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



function calculatePercentage(
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



function updateProgress() {

    const tasks =
        getStoredTasks();


    const completedTasks =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    const taskPercentage =
        calculatePercentage(
            completedTasks,
            tasks.length
        );



    const habits =
        getStoredHabits();


    const completedHabits =
        habits.filter(
            function(habit) {

                return habit.completed;

            }
        ).length;


    const habitPercentage =
        calculatePercentage(
            completedHabits,
            habits.length
        );



    const totalItems =
        tasks.length
        +
        habits.length;


    const totalCompleted =
        completedTasks
        +
        completedHabits;


    const dailyPercentage =
        calculatePercentage(
            totalCompleted,
            totalItems
        );



    document
        .querySelectorAll(
            "[data-daily-progress-text]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    dailyPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-daily-progress-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    dailyPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-tasks-status]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completedTasks
                    +
                    " / "
                    +
                    tasks.length;

            }
        );



    document
        .querySelectorAll(
            "[data-task-progress-text]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    taskPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-task-progress-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    taskPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-habits-status]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    completedHabits
                    +
                    " / "
                    +
                    habits.length;

            }
        );



    document
        .querySelectorAll(
            "[data-habit-progress-text]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    habitPercentage
                    +
                    "%";

            }
        );



    document
        .querySelectorAll(
            "[data-habit-progress-fill]"
        )
        .forEach(
            function(element) {

                element.style.width =
                    habitPercentage
                    +
                    "%";

            }
        );

}



window.addEventListener(
    "plannerDataChanged",
    updateProgress
);



window.addEventListener(
    "storage",
    updateProgress
);



updateProgress();