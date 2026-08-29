const defaultHabits = [

    {
        text:
            "💧 Drink Water",

        completed:
            false
    },

    {
        text:
            "📚 Study",

        completed:
            false
    },

    {
        text:
            "🏃 Exercise",

        completed:
            false
    },

    {
        text:
            "🇬🇧 English",

        completed:
            false
    },

    {
        text:
            "🧹 Cleaning",

        completed:
            false
    },

    {
        text:
            "😴 Sleep",

        completed:
            false
    }

];



function getTodayDate() {

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



let habits =
    JSON.parse(
        localStorage.getItem(
            "myPlannerHabits"
        )
    ) || defaultHabits;



const todayDate =
    getTodayDate();


const savedHabitDate =
    localStorage.getItem(
        "myPlannerHabitsDate"
    );



/* RESET HABIT CHECKS ON NEW DAY */

if (
    savedHabitDate !== todayDate
) {

    habits =
        habits.map(
            function(habit) {

                return {

                    text:
                        habit.text,

                    completed:
                        false

                };

            }
        );


    localStorage.setItem(
        "myPlannerHabits",
        JSON.stringify(
            habits
        )
    );


    localStorage.setItem(
        "myPlannerHabitsDate",
        todayDate
    );

}



function saveHabits() {

    localStorage.setItem(
        "myPlannerHabits",
        JSON.stringify(
            habits
        )
    );


    localStorage.setItem(
        "myPlannerHabitsDate",
        todayDate
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



const habitManagers =
    document.querySelectorAll(
        ".habit-manager"
    );



habitManagers.forEach(
    function(manager) {

        const input =
            manager.querySelector(
                ".new-habit-input"
            );


        const addButton =
            manager.querySelector(
                ".add-habit-button"
            );


        const list =
            manager.querySelector(
                ".custom-habit-list"
            );


        const emptyMessage =
            manager.querySelector(
                ".habit-empty-message"
            );



        function renderHabits() {

            list.innerHTML =
                "";


            if (
                habits.length === 0
            ) {

                emptyMessage.style.display =
                    "block";

            }

            else {

                emptyMessage.style.display =
                    "none";

            }



            habits.forEach(
                function(habit, index) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.classList.add(
                        "custom-habit-item"
                    );



                    const checkbox =
                        document.createElement(
                            "input"
                        );


                    checkbox.type =
                        "checkbox";


                    checkbox.checked =
                        habit.completed;


                    checkbox.classList.add(
                        "habit-checkbox"
                    );



                    const habitText =
                        document.createElement(
                            "input"
                        );


                    habitText.type =
                        "text";


                    habitText.value =
                        habit.text;


                    habitText.classList.add(
                        "editable-habit-text"
                    );


                    if (
                        habit.completed
                    ) {

                        habitText.classList.add(
                            "completed-habit"
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
                        "delete-habit-button"
                    );



                    checkbox.addEventListener(
                        "change",
                        function() {

                            habits[index].completed =
                                checkbox.checked;


                            saveHabits();

                            renderAllHabitManagers();

                        }
                    );



                    habitText.addEventListener(
                        "input",
                        function() {

                            habits[index].text =
                                habitText.value;


                            saveHabits();

                        }
                    );



                    deleteButton.addEventListener(
                        "click",
                        function() {

                            habits.splice(
                                index,
                                1
                            );


                            saveHabits();

                            renderAllHabitManagers();

                        }
                    );



                    item.appendChild(
                        checkbox
                    );


                    item.appendChild(
                        habitText
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



        function addHabit() {

            const text =
                input.value.trim();


            if (
                text === ""
            ) {

                input.focus();

                return;

            }


            habits.push({

                text:
                    text,

                completed:
                    false

            });


            saveHabits();

            renderAllHabitManagers();


            input.value =
                "";


            input.focus();

        }



        addButton.addEventListener(
            "click",
            addHabit
        );



        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    addHabit();

                }

            }
        );


        manager.renderHabits =
            renderHabits;

    }
);



function renderAllHabitManagers() {

    habitManagers.forEach(
        function(manager) {

            manager.renderHabits();

        }
    );

}



renderAllHabitManagers();