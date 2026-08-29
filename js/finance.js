/* =========================================
   FINANCE
========================================= */


const FINANCE_KEY =
    "myPlannerFinanceTransactions";



const persianMonths = [

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



const financeCategories = {

    income: [

        "Salary",
        "Freelance",
        "Business",
        "Gift",
        "Investment",
        "Other"

    ],


    expense: [

        "Food",
        "Transport",
        "Shopping",
        "Work",
        "Personal",
        "Education",
        "Home",
        "Bills",
        "Health",
        "Other"

    ],


    saving: [

        "Emergency Fund",
        "Investment",
        "Goal",
        "Travel",
        "Future Purchase",
        "Other"

    ]

};



/* =========================================
   ID
========================================= */

function createFinanceId() {

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
   CURRENT PERSIAN DATE
========================================= */

function getFinancePersianDate() {

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
   LOAD
========================================= */

function loadFinanceTransactions() {

    const saved =
        localStorage.getItem(
            FINANCE_KEY
        );


    if (
        !saved
    ) {

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
            "Finance data error:",
            error
        );


        return [];

    }

}



let financeTransactions =
    loadFinanceTransactions();



/* =========================================
   SAVE
========================================= */

function saveFinanceTransactions() {

    localStorage.setItem(
        FINANCE_KEY,
        JSON.stringify(
            financeTransactions
        )
    );


    window.dispatchEvent(
        new Event(
            "plannerDataChanged"
        )
    );

}



/* =========================================
   MONEY
========================================= */

function formatFinanceMoney(
    amount
) {

    const number =
        Number(amount) || 0;


    return (
        new Intl.NumberFormat(
            "fa-IR"
        ).format(
            Math.round(
                number
            )
        )
        +
        " تومان"
    );

}



/* =========================================
   PERSIAN DIGITS
========================================= */

function toFinancePersianDigits(
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
   DATE FORMAT
========================================= */

function formatFinanceDate(
    transaction
) {

    return (
        toFinancePersianDigits(
            transaction.day
        )
        +
        " "
        +
        persianMonths[
            transaction.month - 1
        ]
        +
        " "
        +
        toFinancePersianDigits(
            transaction.year
        )
    );

}



/* =========================================
   DATE VALIDATION
========================================= */

function validFinanceDate(
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
   FILTER
========================================= */

function getSelectedFinancePeriod() {

    const filterMonth =
        document.getElementById(
            "financeFilterMonth"
        );


    const filterYear =
        document.getElementById(
            "financeFilterYear"
        );


    if (
        filterMonth
        &&
        filterYear
    ) {

        return {

            month:
                Number(
                    filterMonth.value
                ),

            year:
                Number(
                    filterYear.value
                )

        };

    }


    const today =
        getFinancePersianDate();


    return {

        month:
            today.month,

        year:
            today.year

    };

}



/* =========================================
   GET MONTH TRANSACTIONS
========================================= */

function getFinanceTransactionsForMonth(
    year,
    month
) {

    return financeTransactions
        .filter(
            function(transaction) {

                return (
                    Number(
                        transaction.year
                    )
                    ===
                    Number(year)
                    &&
                    Number(
                        transaction.month
                    )
                    ===
                    Number(month)
                );

            }
        );

}



/* =========================================
   TOTALS
========================================= */

function calculateFinanceTotals(
    transactions
) {

    let income =
        0;


    let expenses =
        0;


    let savings =
        0;



    transactions.forEach(
        function(transaction) {

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



    const remaining =
        income
        -
        expenses
        -
        savings;



    return {

        income:
            income,

        expenses:
            expenses,

        savings:
            savings,

        remaining:
            remaining

    };

}



/* =========================================
   UPDATE SUMMARY
========================================= */

function updateFinanceSummary() {

    const period =
        getSelectedFinancePeriod();


    const transactions =
        getFinanceTransactionsForMonth(
            period.year,
            period.month
        );


    const totals =
        calculateFinanceTotals(
            transactions
        );



    document
        .querySelectorAll(
            "[data-finance-income]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formatFinanceMoney(
                        totals.income
                    );

            }
        );



    document
        .querySelectorAll(
            "[data-finance-expenses]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formatFinanceMoney(
                        totals.expenses
                    );

            }
        );



    document
        .querySelectorAll(
            "[data-finance-savings]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formatFinanceMoney(
                        totals.savings
                    );

            }
        );



    document
        .querySelectorAll(
            "[data-finance-remaining]"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formatFinanceMoney(
                        totals.remaining
                    );


                element.classList.toggle(
                    "negative-money",
                    totals.remaining < 0
                );

            }
        );

}



/* =========================================
   FINANCE FORM
========================================= */

const financeForm =
    document.getElementById(
        "financeForm"
    );


const financeType =
    document.getElementById(
        "financeType"
    );


const financeAmount =
    document.getElementById(
        "financeAmount"
    );


const financeCategory =
    document.getElementById(
        "financeCategory"
    );


const financeDay =
    document.getElementById(
        "financeDay"
    );


const financeMonth =
    document.getElementById(
        "financeMonth"
    );


const financeYear =
    document.getElementById(
        "financeYear"
    );


const financeDescription =
    document.getElementById(
        "financeDescription"
    );


const financeFormMessage =
    document.getElementById(
        "financeFormMessage"
    );



/* =========================================
   CATEGORIES
========================================= */

function updateFinanceCategories() {

    if (
        !financeType
        ||
        !financeCategory
    ) {

        return;

    }


    const type =
        financeType.value;


    financeCategory.innerHTML =
        "";


    financeCategories[
        type
    ].forEach(
        function(category) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                category;


            option.textContent =
                category;


            financeCategory.appendChild(
                option
            );

        }
    );

}



/* =========================================
   DEFAULT DATES
========================================= */

function setFinanceDefaultDate() {

    const today =
        getFinancePersianDate();



    if (
        financeDay
    ) {

        financeDay.value =
            today.day;

    }


    if (
        financeMonth
    ) {

        financeMonth.value =
            today.month;

    }


    if (
        financeYear
    ) {

        financeYear.value =
            today.year;

    }



    const filterMonth =
        document.getElementById(
            "financeFilterMonth"
        );


    const filterYear =
        document.getElementById(
            "financeFilterYear"
        );


    if (
        filterMonth
    ) {

        filterMonth.value =
            today.month;

    }


    if (
        filterYear
    ) {

        filterYear.value =
            today.year;

    }

}



/* =========================================
   ADD TRANSACTION
========================================= */

if (
    financeForm
) {

    financeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();



            const amount =
                Number(
                    financeAmount.value
                );


            const year =
                Number(
                    financeYear.value
                );


            const month =
                Number(
                    financeMonth.value
                );


            const day =
                Number(
                    financeDay.value
                );



            if (
                !amount
                ||
                amount <= 0
            ) {

                financeFormMessage.textContent =
                    "Please enter a valid amount.";


                financeAmount.focus();


                return;

            }



            if (
                !validFinanceDate(
                    year,
                    month,
                    day
                )
            ) {

                financeFormMessage.textContent =
                    "Please enter a valid Persian date.";


                return;

            }



            const newTransaction = {

                id:
                    createFinanceId(),

                type:
                    financeType.value,

                amount:
                    amount,

                category:
                    financeCategory.value,

                year:
                    year,

                month:
                    month,

                day:
                    day,

                description:
                    financeDescription
                        .value
                        .trim(),

                createdAt:
                    Date.now()

            };



            financeTransactions.unshift(
                newTransaction
            );


            saveFinanceTransactions();



            financeFormMessage.textContent =
                "Transaction added successfully 🌷";



            financeAmount.value =
                "";


            financeDescription.value =
                "";


            renderFinance();



            financeAmount.focus();



            setTimeout(
                function() {

                    financeFormMessage.textContent =
                        "";

                },
                2200
            );

        }
    );

}



/* =========================================
   RENDER LIST
========================================= */

function renderFinanceTransactions() {

    const list =
        document.getElementById(
            "financeTransactionsList"
        );


    const emptyState =
        document.getElementById(
            "financeEmptyState"
        );


    const count =
        document.getElementById(
            "financeTransactionCount"
        );


    const monthTitle =
        document.getElementById(
            "financeMonthTitle"
        );


    if (
        !list
    ) {

        return;

    }



    const period =
        getSelectedFinancePeriod();



    const transactions =
        getFinanceTransactionsForMonth(
            period.year,
            period.month
        )
        .sort(
            function(a, b) {

                if (
                    a.day !== b.day
                ) {

                    return (
                        b.day
                        -
                        a.day
                    );

                }


                return (
                    Number(
                        b.createdAt
                    )
                    -
                    Number(
                        a.createdAt
                    )
                );

            }
        );



    list.innerHTML =
        "";



    if (
        monthTitle
    ) {

        monthTitle.textContent =
            persianMonths[
                period.month - 1
            ]
            +
            " "
            +
            toFinancePersianDigits(
                period.year
            );

    }



    if (
        count
    ) {

        count.textContent =
            transactions.length
            +
            (
                transactions.length === 1
                ?
                " item"
                :
                " items"
            );

    }



    if (
        transactions.length === 0
    ) {

        emptyState.style.display =
            "block";


        return;

    }



    emptyState.style.display =
        "none";



    transactions.forEach(
        function(transaction) {


            const row =
                document.createElement(
                    "article"
                );


            row.classList.add(
                "finance-transaction"
            );


            row.classList.add(
                "finance-"
                +
                transaction.type
            );



            const left =
                document.createElement(
                    "div"
                );


            left.classList.add(
                "finance-transaction-info"
            );



            const typeBadge =
                document.createElement(
                    "span"
                );


            typeBadge.classList.add(
                "finance-type-badge"
            );


            if (
                transaction.type
                ===
                "income"
            ) {

                typeBadge.textContent =
                    "Income";

            }

            else if (
                transaction.type
                ===
                "expense"
            ) {

                typeBadge.textContent =
                    "Expense";

            }

            else {

                typeBadge.textContent =
                    "Saving";

            }



            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                transaction.description
                ||
                transaction.category;



            const meta =
                document.createElement(
                    "span"
                );


            meta.classList.add(
                "finance-transaction-meta"
            );


            meta.textContent =
                transaction.category
                +
                " • "
                +
                formatFinanceDate(
                    transaction
                );



            left.appendChild(
                typeBadge
            );


            left.appendChild(
                title
            );


            left.appendChild(
                meta
            );



            const right =
                document.createElement(
                    "div"
                );


            right.classList.add(
                "finance-transaction-right"
            );



            const amount =
                document.createElement(
                    "strong"
                );


            amount.classList.add(
                "finance-transaction-amount"
            );


            if (
                transaction.type
                ===
                "income"
            ) {

                amount.textContent =
                    "+"
                    +
                    formatFinanceMoney(
                        transaction.amount
                    );

            }

            else {

                amount.textContent =
                    "-"
                    +
                    formatFinanceMoney(
                        transaction.amount
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
                "finance-delete-button"
            );


            deleteButton.setAttribute(
                "aria-label",
                "Delete transaction"
            );



            deleteButton.addEventListener(
                "click",
                function() {

                    const confirmed =
                        window.confirm(
                            "Delete this transaction?"
                        );


                    if (
                        !confirmed
                    ) {

                        return;

                    }



                    financeTransactions =
                        financeTransactions.filter(
                            function(item) {

                                return (
                                    item.id
                                    !==
                                    transaction.id
                                );

                            }
                        );


                    saveFinanceTransactions();


                    renderFinance();

                }
            );



            right.appendChild(
                amount
            );


            right.appendChild(
                deleteButton
            );



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



/* =========================================
   RENDER
========================================= */

function renderFinance() {

    updateFinanceSummary();

    renderFinanceTransactions();

}



/* =========================================
   EVENTS
========================================= */

if (
    financeType
) {

    financeType.addEventListener(
        "change",
        updateFinanceCategories
    );

}



const filterMonth =
    document.getElementById(
        "financeFilterMonth"
    );


const filterYear =
    document.getElementById(
        "financeFilterYear"
    );



if (
    filterMonth
) {

    filterMonth.addEventListener(
        "change",
        renderFinance
    );

}


if (
    filterYear
) {

    filterYear.addEventListener(
        "change",
        renderFinance
    );

}



window.addEventListener(
    "storage",
    function() {

        financeTransactions =
            loadFinanceTransactions();


        renderFinance();

    }
);



window.addEventListener(
    "plannerDataChanged",
    function() {

        financeTransactions =
            loadFinanceTransactions();


        renderFinance();

    }
);



/* =========================================
   START
========================================= */

setFinanceDefaultDate();

updateFinanceCategories();

renderFinance();