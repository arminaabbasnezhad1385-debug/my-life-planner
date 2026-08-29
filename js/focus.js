const newFocusInput =
    document.getElementById("newFocusInput");

const addFocusButton =
    document.getElementById("addFocusButton");

const focusList =
    document.getElementById("focusList");

const emptyFocusMessage =
    document.getElementById("emptyFocusMessage");


let focusItems =
    JSON.parse(localStorage.getItem("myPlannerFocus")) || [
        {
            text: "Learn HTML & CSS"
        }
    ];


/* SAVE */

function saveFocus() {

    localStorage.setItem(
        "myPlannerFocus",
        JSON.stringify(focusItems)
    );

}


/* RENDER */

function renderFocus() {

    focusList.innerHTML = "";


    if (focusItems.length === 0) {

        emptyFocusMessage.style.display = "block";

    } else {

        emptyFocusMessage.style.display = "none";

    }


    focusItems.forEach(function(item, index) {

        const focusItem =
            document.createElement("div");


        focusItem.classList.add("focus-item");


        const icon =
            document.createElement("span");


        icon.textContent = "🌸";

        icon.classList.add("focus-icon");


        const input =
            document.createElement("input");


        input.type = "text";

        input.value = item.text;

        input.classList.add("focus-text");


        const deleteButton =
            document.createElement("button");


        deleteButton.type = "button";

        deleteButton.textContent = "×";

        deleteButton.classList.add(
            "delete-focus-button"
        );


        input.addEventListener(
            "input",
            function () {

                focusItems[index].text =
                    input.value;

                saveFocus();

            }
        );


        deleteButton.addEventListener(
            "click",
            function () {

                focusItems.splice(index, 1);

                saveFocus();

                renderFocus();

            }
        );


        focusItem.appendChild(icon);

        focusItem.appendChild(input);

        focusItem.appendChild(deleteButton);


        focusList.appendChild(focusItem);

    });

}


/* ADD */

function addFocus() {

    const text =
        newFocusInput.value.trim();


    if (text === "") {

        newFocusInput.focus();

        return;

    }


    focusItems.push({

        text: text

    });


    saveFocus();

    renderFocus();


    newFocusInput.value = "";

    newFocusInput.focus();

}


/* CLICK ADD */

addFocusButton.addEventListener(
    "click",
    addFocus
);


/* ENTER ADD */

newFocusInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addFocus();

        }

    }
);


renderFocus();