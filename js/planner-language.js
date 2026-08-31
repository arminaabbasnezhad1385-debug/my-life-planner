/* =========================================
   MY LIFE PLANNER
   COMPLETE ENGLISH / PERSIAN SYSTEM
========================================= */

(function () {

    "use strict";


    /* =========================================
       PREVENT DOUBLE LOAD
    ========================================= */

    if (window.PlannerLanguage) {
        return;
    }


    const LANGUAGE_KEY =
        "myPlannerLanguage";


    /* =========================================
       FULL PHRASE TRANSLATIONS
    ========================================= */

    const FA = {

        /* BRAND */

        "My Life Planner":
            "پلنر زندگی من",

        "🌷 My Life Planner":
            "🌷 پلنر زندگی من",

        "Plan your life. Track your progress.":
            "زندگی‌ات را برنامه‌ریزی کن و پیشرفتت را دنبال کن.",

        "My Dashboard":
            "داشبورد من",

        "Everything important, all in one place.":
            "همه چیزهای مهم، یک‌جا.",


        /* MENU */

        "Dashboard":
            "داشبورد",

        "Home":
            "خانه",

        "Daily":
            "روزانه",

        "Daily Planner":
            "برنامه روزانه",

        "Learning":
            "یادگیری",

        "Goals":
            "اهداف",

        "Tasks":
            "کارها",

        "Habits":
            "عادت‌ها",

        "Work":
            "کار",

        "Finance":
            "امور مالی",

        "Journal":
            "یادداشت روزانه",

        "Calendar":
            "تقویم",

        "Progress":
            "پیشرفت",

        "Settings":
            "تنظیمات",


        /* DASHBOARD */

        "Today's Focus":
            "تمرکز امروز",

        "Today’s Focus":
            "تمرکز امروز",

        "What matters most today?":
            "امروز چه چیزی از همه مهم‌تر است؟",

        "Add a focus...":
            "تمرکز امروز را بنویسید...",

        "Add Focus":
            "افزودن تمرکز",

        "Open Daily Planner":
            "باز کردن برنامه روزانه",

        "Today's Tasks":
            "کارهای امروز",

        "Today’s Tasks":
            "کارهای امروز",

        "Add and complete today's tasks.":
            "کارهای امروز را اضافه و تکمیل کنید.",

        "Write a task...":
            "یک کار بنویسید...",

        "Add Task":
            "افزودن کار",

        "Open Tasks":
            "باز کردن کارها",

        "Today's Learning":
            "یادگیری امروز",

        "Today’s Learning":
            "یادگیری امروز",

        "Your custom learning plan for today.":
            "برنامه یادگیری شخصی شما برای امروز.",

        "No learning subjects yet.":
            "هنوز موضوعی برای یادگیری اضافه نشده است.",

        "Open Learning":
            "باز کردن بخش یادگیری",

        "Daily Progress":
            "پیشرفت روزانه",

        "Daily Score":
            "امتیاز روزانه",

        "Study Streak":
            "روزهای متوالی مطالعه",

        "Customize Dashboard":
            "شخصی‌سازی داشبورد",

        "Dashboard Layout":
            "چیدمان داشبورد",

        "Subjects":
            "درس‌ها",

        "Sessions":
            "جلسه‌ها",

        "Completed Today":
            "تکمیل‌شده امروز",

        "Planned Time":
            "زمان برنامه‌ریزی‌شده",

        "Average Progress":
            "میانگین پیشرفت",

        "Monthly Summary":
            "خلاصه ماهانه",

        "Planned":
            "برنامه‌ریزی‌شده",


        /* DEFAULT TASKS */

        "Practice HTML":
            "تمرین اچ‌تی‌ام‌ال",

        "Learn CSS":
            "یادگیری سی‌اس‌اس",

        "Study English":
            "مطالعه انگلیسی",

        "Learn HTML & CSS":
            "یادگیری اچ‌تی‌ام‌ال و سی‌اس‌اس",


        /* DAILY */

        "Top 3 Tasks":
            "۳ کار مهم",

        "TOP 3":
            "۳ کار مهم",

        "Schedule":
            "برنامه زمانی",

        "To-Do List":
            "فهرست کارها",

        "To Do":
            "برای انجام",

        "Personal":
            "شخصی",

        "Mood":
            "حال و هوا",

        "End of Day Review":
            "مرور پایان روز",

        "END OF DAY":
            "پایان روز",

        "What did I learn?":
            "امروز چه یاد گرفتم؟",

        "What did I accomplish?":
            "امروز چه کاری انجام دادم؟",

        "What could I improve?":
            "چه چیزی را می‌توانم بهتر کنم؟",

        "How was my day?":
            "روز من چطور بود؟",

        "Today's Score":
            "امتیاز امروز",

        "Today’s Score":
            "امتیاز امروز",


        /* TASKS */

        "Task":
            "کار",

        "Task Name":
            "نام کار",

        "New Task":
            "کار جدید",

        "Create Task":
            "ایجاد کار",

        "Save Task":
            "ذخیره کار",

        "Edit Task":
            "ویرایش کار",

        "Delete Task":
            "حذف کار",

        "Add a new task...":
            "یک کار جدید اضافه کنید...",

        "No tasks yet.":
            "هنوز کاری اضافه نشده است.",

        "Clear Completed":
            "پاک کردن کارهای تکمیل‌شده",


        /* HABITS */

        "Today's Habit Progress":
            "پیشرفت عادت‌های امروز",

        "Today’s Habit Progress":
            "پیشرفت عادت‌های امروز",

        "Today's Habits":
            "عادت‌های امروز",

        "Today’s Habits":
            "عادت‌های امروز",

        "Habit":
            "عادت",

        "Habit Name":
            "نام عادت",

        "Add Habit":
            "افزودن عادت",

        "New Habit":
            "عادت جدید",

        "Save Habit":
            "ذخیره عادت",

        "Edit Habit":
            "ویرایش عادت",

        "Delete Habit":
            "حذف عادت",

        "Add a new habit...":
            "یک عادت جدید اضافه کنید...",

        "No habits yet.":
            "هنوز عادتی اضافه نشده است.",

        "Drink Water":
            "نوشیدن آب",

        "Study":
            "مطالعه",

        "Exercise":
            "ورزش",

        "English":
            "انگلیسی",

        "GB English":
            "انگلیسی",

        "Cleaning":
            "نظافت",

        "Sleep":
            "خواب",


        /* LEARNING */

        "Learning Planner":
            "برنامه یادگیری",

        "Subject":
            "درس",

        "Subject Name":
            "نام درس",

        "Subject Icon":
            "آیکن درس",

        "Add Subject":
            "افزودن درس",

        "New Subject":
            "درس جدید",

        "Edit Subject":
            "ویرایش درس",

        "Delete Subject":
            "حذف درس",

        "Save Subject":
            "ذخیره درس",

        "Session":
            "جلسه",

        "Session Name":
            "نام جلسه",

        "Session Minutes":
            "مدت جلسه",

        "Add Session":
            "افزودن جلسه",

        "New Session":
            "جلسه جدید",

        "Edit Session":
            "ویرایش جلسه",

        "Delete Session":
            "حذف جلسه",

        "Save Session":
            "ذخیره جلسه",

        "Start Timer":
            "شروع تایمر",

        "Pause Timer":
            "توقف موقت تایمر",

        "Reset Timer":
            "بازنشانی تایمر",

        "Next Session":
            "جلسه بعدی",

        "Practice":
            "تمرین",

        "No subjects yet.":
            "هنوز درسی اضافه نشده است.",

        "No sessions yet.":
            "هنوز جلسه‌ای اضافه نشده است.",


        /* GOALS */

        "Goals Planner":
            "برنامه اهداف",

        "Goal":
            "هدف",

        "Goal Title":
            "عنوان هدف",

        "Add Goal":
            "افزودن هدف",

        "New Goal":
            "هدف جدید",

        "Create Goal":
            "ایجاد هدف",

        "Save Goal":
            "ذخیره هدف",

        "Edit Goal":
            "ویرایش هدف",

        "Delete Goal":
            "حذف هدف",

        "Deadline":
            "مهلت",

        "Why":
            "دلیل",

        "Milestones":
            "مراحل",

        "Milestone":
            "مرحله",

        "Add Milestone":
            "افزودن مرحله",

        "Delete Milestone":
            "حذف مرحله",

        "Not Started":
            "شروع نشده",

        "In Progress":
            "در حال انجام",

        "Waiting":
            "در انتظار",

        "Finished":
            "پایان یافته",


        /* WORK */

        "Work Planner":
            "برنامه کاری",

        "Projects":
            "پروژه‌ها",

        "Project":
            "پروژه",

        "Project Title":
            "عنوان پروژه",

        "Add Project":
            "افزودن پروژه",

        "New Project":
            "پروژه جدید",

        "Create Project":
            "ایجاد پروژه",

        "Save Project":
            "ذخیره پروژه",

        "Edit Project":
            "ویرایش پروژه",

        "Delete Project":
            "حذف پروژه",

        "Client":
            "مشتری",

        "Client Name":
            "نام مشتری",

        "Project Tasks":
            "کارهای پروژه",

        "Add Project Task":
            "افزودن کار پروژه",

        "No projects yet.":
            "هنوز پروژه‌ای اضافه نشده است.",


        /* FINANCE */

        "Finance Tracker":
            "مدیریت مالی",

        "Income":
            "درآمد",

        "Expenses":
            "هزینه‌ها",

        "Expense":
            "هزینه",

        "Savings":
            "پس‌انداز",

        "Saving":
            "پس‌انداز",

        "Remaining":
            "باقی‌مانده",

        "Remaining Money":
            "مبلغ باقی‌مانده",

        "Transaction":
            "تراکنش",

        "Add Transaction":
            "افزودن تراکنش",

        "New Transaction":
            "تراکنش جدید",

        "Save Transaction":
            "ذخیره تراکنش",

        "Edit Transaction":
            "ویرایش تراکنش",

        "Delete Transaction":
            "حذف تراکنش",

        "Amount":
            "مبلغ",

        "Food":
            "خوراک",

        "Transport":
            "حمل‌ونقل",

        "Shopping":
            "خرید",

        "Education":
            "آموزش",

        "No transactions yet.":
            "هنوز تراکنشی ثبت نشده است.",


        /* JOURNAL */

        "Daily Journal":
            "یادداشت روزانه",

        "Previous Entries":
            "یادداشت‌های قبلی",

        "Select an entry to read or edit it.":
            "یک یادداشت را برای خواندن یا ویرایش انتخاب کنید.",

        "No journal entries yet.":
            "هنوز یادداشتی ثبت نشده است.",

        "How are you feeling?":
            "امروز چه حسی دارید؟",

        "Bad":
            "بد",

        "Okay":
            "معمولی",

        "Good":
            "خوب",

        "Amazing":
            "عالی",

        "My Day":
            "روز من",

        "Write about your day...":
            "درباره روزتان بنویسید...",

        "Today I feel...":
            "امروز احساس می‌کنم...",

        "What happened today?":
            "امروز چه اتفاقی افتاد؟",

        "What am I thinking about?":
            "به چه چیزی فکر می‌کنم؟",

        "What do I need?":
            "به چه چیزی نیاز دارم؟",

        "Gratitude":
            "قدردانی",

        "Gratitudes":
            "قدردانی‌ها",

        "Today's Win":
            "موفقیت امروز",

        "Today’s Win":
            "موفقیت امروز",

        "What I Learned":
            "چیزی که یاد گرفتم",

        "Tomorrow's Focus":
            "تمرکز فردا",

        "Tomorrow’s Focus":
            "تمرکز فردا",

        "Save Entry":
            "ذخیره یادداشت",

        "Delete Entry":
            "حذف یادداشت",

        "Word Count":
            "تعداد کلمات",

        "No entries yet.":
            "هنوز یادداشتی ثبت نشده است.",


        /* CALENDAR */

        "Persian Calendar":
            "تقویم شمسی",

        "Event":
            "رویداد",

        "Events":
            "رویدادها",

        "Add Event":
            "افزودن رویداد",

        "New Event":
            "رویداد جدید",

        "Save Event":
            "ذخیره رویداد",

        "Edit Event":
            "ویرایش رویداد",

        "Delete Event":
            "حذف رویداد",

        "Appointments":
            "قرارها",

        "No events for this day.":
            "برای این روز رویدادی ثبت نشده است.",


        /* PROGRESS */

        "Weekly Progress":
            "پیشرفت هفتگی",

        "Monthly Progress":
            "پیشرفت ماهانه",

        "Overall Progress":
            "پیشرفت کلی",

        "Tasks Progress":
            "پیشرفت کارها",

        "Habits Progress":
            "پیشرفت عادت‌ها",

        "Learning Progress":
            "پیشرفت یادگیری",

        "Score":
            "امتیاز",


        /* SETTINGS */

        "Planner Settings":
            "تنظیمات پلنر",

        "General Settings":
            "تنظیمات عمومی",

        "General":
            "عمومی",

        "Planner Name":
            "نام پلنر",

        "Planner Subtitle":
            "زیرعنوان پلنر",

        "Show Persian Date":
            "نمایش تاریخ شمسی",

        "Theme":
            "پوسته",

        "Appearance":
            "ظاهر",

        "Light":
            "روشن",

        "Dark":
            "تیره",

        "System":
            "سیستم",

        "Rose":
            "رز",

        "Lavender":
            "اسطوخودوس",

        "Sage":
            "سبز مریم‌گلی",

        "Blue":
            "آبی",

        "Mocha":
            "موکا",

        "Learning Weight":
            "وزن یادگیری",

        "Save Settings":
            "ذخیره تنظیمات",

        "Backup":
            "پشتیبان‌گیری",

        "Export Backup":
            "دریافت فایل پشتیبان",

        "Import Backup":
            "بازیابی فایل پشتیبان",

        "Reset Today":
            "بازنشانی امروز",

        "Reset Data":
            "حذف اطلاعات",

        "All Planner Data":
            "تمام اطلاعات پلنر",

        "Danger Zone":
            "بخش حساس",


        /* GENERAL BUTTONS */

        "Add":
            "افزودن",

        "Save":
            "ذخیره",

        "Save Changes":
            "ذخیره تغییرات",

        "Edit":
            "ویرایش",

        "Delete":
            "حذف",

        "Remove":
            "حذف",

        "Create":
            "ایجاد",

        "Update":
            "به‌روزرسانی",

        "Cancel":
            "انصراف",

        "Close":
            "بستن",

        "Back":
            "بازگشت",

        "Next":
            "بعدی",

        "Previous":
            "قبلی",

        "Start":
            "شروع",

        "Pause":
            "توقف موقت",

        "Resume":
            "ادامه",

        "Stop":
            "توقف",

        "Reset":
            "بازنشانی",

        "Done":
            "انجام شد",

        "Complete":
            "تکمیل",

        "Clear":
            "پاک کردن",

        "Search":
            "جستجو",

        "Filter":
            "فیلتر",

        "Show":
            "نمایش",

        "Hide":
            "پنهان کردن",

        "Apply":
            "اعمال",

        "Confirm":
            "تأیید",

        "Yes":
            "بله",

        "No":
            "خیر",

        "All":
            "همه",

        "Today":
            "امروز",


        /* COMMON */

        "Name":
            "نام",

        "Title":
            "عنوان",

        "Description":
            "توضیحات",

        "Date":
            "تاریخ",

        "Time":
            "زمان",

        "Status":
            "وضعیت",

        "Priority":
            "اولویت",

        "Category":
            "دسته‌بندی",

        "Type":
            "نوع",

        "Total":
            "مجموع",

        "Active":
            "فعال",

        "Inactive":
            "غیرفعال",

        "Completed":
            "تکمیل‌شده",

        "Completed ✓":
            "تکمیل شد ✓",

        "Not completed":
            "تکمیل نشده",

        "Low":
            "کم",

        "Medium":
            "متوسط",

        "High":
            "زیاد",


        /* MESSAGES */

        "Amazing day! 🌷":
            "روز فوق‌العاده‌ای بود! 🌷",

        "Great progress today ✨":
            "امروز پیشرفت خیلی خوبی داشتی ✨",

        "Good progress. Keep going 🌸":
            "پیشرفت خوبی داشتی. ادامه بده 🌸",

        "Small steps still count 🤍":
            "قدم‌های کوچک هم ارزشمندند 🤍",

        "Your day is ready to begin 🌷":
            "روزت آماده شروع است 🌷",


        /* PLACEHOLDERS */

        "Enter task...":
            "کار را وارد کنید...",

        "Enter habit...":
            "عادت را وارد کنید...",

        "Enter subject name...":
            "نام درس را وارد کنید...",

        "Enter session name...":
            "نام جلسه را وارد کنید...",

        "Enter goal title...":
            "عنوان هدف را وارد کنید...",

        "Enter milestone...":
            "مرحله را وارد کنید...",

        "Enter project title...":
            "عنوان پروژه را وارد کنید...",

        "Enter client name...":
            "نام مشتری را وارد کنید...",

        "Enter description...":
            "توضیحات را وارد کنید...",

        "Enter event title...":
            "عنوان رویداد را وارد کنید...",

        "Search...":
            "جستجو...",

        "Write here...":
            "اینجا بنویسید...",

        "Optional":
            "اختیاری"
    };


    /* =========================================
       WORD BY WORD FALLBACK
    ========================================= */

    const WORD_FA = {

        "my": "من",
        "your": "شما",
        "you": "شما",

        "today": "امروز",
        "today's": "امروز",
        "todays": "امروز",

        "tomorrow": "فردا",
        "tomorrow's": "فردا",

        "dashboard": "داشبورد",

        "daily": "روزانه",
        "day": "روز",
        "days": "روز",

        "planner": "برنامه‌ریز",

        "learning": "یادگیری",
        "learn": "یادگیری",
        "learned": "یادگرفته‌شده",

        "study": "مطالعه",
        "practice": "تمرین",

        "task": "کار",
        "tasks": "کارها",

        "habit": "عادت",
        "habits": "عادت‌ها",

        "goal": "هدف",
        "goals": "اهداف",

        "project": "پروژه",
        "projects": "پروژه‌ها",

        "work": "کار",

        "finance": "امور مالی",

        "journal": "یادداشت",

        "calendar": "تقویم",

        "progress": "پیشرفت",

        "settings": "تنظیمات",

        "focus": "تمرکز",

        "add": "افزودن",
        "new": "جدید",

        "open": "باز کردن",

        "save": "ذخیره",

        "edit": "ویرایش",

        "delete": "حذف",

        "remove": "حذف",

        "create": "ایجاد",

        "close": "بستن",

        "cancel": "انصراف",

        "start": "شروع",

        "pause": "توقف موقت",

        "reset": "بازنشانی",

        "next": "بعدی",

        "previous": "قبلی",

        "complete": "تکمیل",

        "completed": "تکمیل‌شده",

        "planned": "برنامه‌ریزی‌شده",

        "remaining": "باقی‌مانده",

        "total": "مجموع",

        "active": "فعال",

        "name": "نام",

        "title": "عنوان",

        "description": "توضیحات",

        "date": "تاریخ",

        "time": "زمان",

        "status": "وضعیت",

        "priority": "اولویت",

        "category": "دسته‌بندی",

        "type": "نوع",

        "amount": "مبلغ",

        "income": "درآمد",

        "expense": "هزینه",

        "expenses": "هزینه‌ها",

        "saving": "پس‌انداز",

        "savings": "پس‌انداز",

        "subject": "درس",

        "subjects": "درس‌ها",

        "session": "جلسه",

        "sessions": "جلسه‌ها",

        "client": "مشتری",

        "deadline": "مهلت",

        "event": "رویداد",

        "events": "رویدادها",

        "entry": "یادداشت",

        "entries": "یادداشت‌ها",

        "word": "کلمه",

        "words": "کلمات",

        "count": "تعداد",

        "water": "آب",

        "drink": "نوشیدن",

        "exercise": "ورزش",

        "english": "انگلیسی",

        "python": "پایتون",

        "javascript": "جاوااسکریپت",

        "html": "اچ‌تی‌ام‌ال",

        "css": "سی‌اس‌اس",

        "bad": "بد",

        "okay": "معمولی",

        "good": "خوب",

        "amazing": "عالی",

        "low": "کم",

        "medium": "متوسط",

        "high": "زیاد",

        "light": "روشن",

        "dark": "تیره",

        "system": "سیستم",

        "theme": "پوسته",

        "appearance": "ظاهر",

        "home": "خانه",

        "personal": "شخصی",

        "food": "خوراک",

        "shopping": "خرید",

        "education": "آموزش",

        "transport": "حمل‌ونقل",

        "search": "جستجو",

        "filter": "فیلتر",

        "all": "همه",

        "none": "هیچ",

        "yes": "بله",

        "no": "خیر",

        "how": "چطور",

        "are": "هستید",

        "feeling": "احساس",

        "feel": "احساس",

        "what": "چه",

        "why": "چرا",

        "most": "بیشترین",

        "important": "مهم",

        "everything": "همه‌چیز",

        "one": "یک",

        "place": "جا",

        "custom": "شخصی",

        "plan": "برنامه",

        "for": "برای",

        "about": "درباره",

        "write": "نوشتن",

        "read": "خواندن",

        "select": "انتخاب",

        "no": "هیچ",

        "yet": "هنوز",

        "and": "و",

        "or": "یا",

        "of": "از",

        "the": "",

        "a": "",

        "an": "",

        "to": "",

        "in": "در",

        "is": "است",

        "it": "آن",

        "with": "با",

        "minutes": "دقیقه",

        "minute": "دقیقه",

        "min": "دقیقه",

        "hours": "ساعت",

        "hour": "ساعت"
    };


    /* =========================================
       STATE
    ========================================= */

    const textState =
        new WeakMap();

    const attributeState =
        new WeakMap();

    let observer =
        null;

    let observerTimer =
        null;

    let isApplying =
        false;


    /* =========================================
       NORMALIZE
    ========================================= */

    function normalizeText(text) {

        return String(
            text || ""
        )
            .replace(
                /\s+/g,
                " "
            )
            .trim();

    }


    /* =========================================
       GET LANGUAGE
    ========================================= */

    function getLanguage() {

        return (
            localStorage.getItem(
                LANGUAGE_KEY
            ) === "fa"

                ?

                "fa"

                :

                "en"
        );

    }


    /* =========================================
       WORD FALLBACK
    ========================================= */

    function translateWords(text) {

        let translated =
            text.replace(

                /[A-Za-z]+(?:['’][A-Za-z]+)?/g,

                function(word) {

                    const key =
                        word.toLowerCase();


                    if (
                        Object.prototype
                            .hasOwnProperty.call(
                                WORD_FA,
                                key
                            )
                    ) {

                        return WORD_FA[
                            key
                        ];

                    }


                    return word;

                }

            );


        translated =
            translated.replace(
                /\s*&\s*/g,
                " و "
            );


        translated =
            translated.replace(
                /\s+/g,
                " "
            );


        return translated.trim();

    }


    /* =========================================
       TRANSLATE VALUE
    ========================================= */

    function translateValue(
        original,
        language
    ) {

        if (
            original === null
            ||
            original === undefined
        ) {

            return original;

        }


        const originalText =
            String(
                original
            );


        if (
            language !== "fa"
        ) {

            return originalText;

        }


        const text =
            normalizeText(
                originalText
            );


        /* EXACT PHRASE */

        if (
            Object.prototype
                .hasOwnProperty.call(
                    FA,
                    text
                )
        ) {

            return FA[
                text
            ];

        }


        /* =====================================
           DYNAMIC COUNTERS
        ====================================== */

        let match;


        match =
            text.match(
                /^(\d+)\s*\/\s*(\d+)\s+habits completed today$/i
            );


        if (match) {

            return (
                match[1]
                +
                " از "
                +
                match[2]
                +
                " عادت امروز انجام شده"
            );

        }


        match =
            text.match(
                /^habits completed today\s+(\d+)\s*\/\s*(\d+)$/i
            );


        if (match) {

            return (
                match[1]
                +
                " از "
                +
                match[2]
                +
                " عادت امروز انجام شده"
            );

        }


        match =
            text.match(
                /^(\d+)\s*\/\s*(\d+)\s+tasks completed today$/i
            );


        if (match) {

            return (
                match[1]
                +
                " از "
                +
                match[2]
                +
                " کار امروز انجام شده"
            );

        }


        match =
            text.match(
                /^(\d+)\s*\/\s*(\d+)\s+completed$/i
            );


        if (match) {

            return (
                match[1]
                +
                " از "
                +
                match[2]
                +
                " تکمیل‌شده"
            );

        }


        match =
            text.match(
                /^(\d+)\s+minutes?$/i
            );


        if (match) {

            return (
                match[1]
                +
                " دقیقه"
            );

        }


        match =
            text.match(
                /^(\d+)\s*min$/i
            );


        if (match) {

            return (
                match[1]
                +
                " دقیقه"
            );

        }


        match =
            text.match(
                /^(\d+)\s+hours?$/i
            );


        if (match) {

            return (
                match[1]
                +
                " ساعت"
            );

        }


        match =
            text.match(
                /^(\d+)\s+days?$/i
            );


        if (match) {

            return (
                match[1]
                +
                " روز"
            );

        }


        match =
            text.match(
                /^(\d+)\s+words?$/i
            );


        if (match) {

            return (
                match[1]
                +
                " کلمه"
            );

        }


        match =
            text.match(
                /^(\d+)%\s+complete$/i
            );


        if (match) {

            return (
                match[1]
                +
                "٪ تکمیل"
            );

        }


        match =
            text.match(
                /^Day\s+(\d+)$/i
            );


        if (match) {

            return (
                "روز "
                +
                match[1]
            );

        }


        /* =====================================
           EMOJI + PHRASE
        ====================================== */

        const phraseKeys =
            Object.keys(
                FA
            )
            .sort(
                function(a, b) {

                    return (
                        b.length
                        -
                        a.length
                    );

                }
            );


        for (
            const englishPhrase
            of
            phraseKeys
        ) {

            if (
                text.endsWith(
                    englishPhrase
                )
            ) {

                const prefix =
                    text.slice(
                        0,
                        text.length
                        -
                        englishPhrase.length
                    );


                if (
                    prefix.trim()
                    &&
                    !/[A-Za-z0-9]/.test(
                        prefix
                    )
                ) {

                    return (
                        prefix
                        +
                        FA[
                            englishPhrase
                        ]
                    );

                }

            }


            if (
                text.startsWith(
                    englishPhrase
                )
            ) {

                const suffix =
                    text.slice(
                        englishPhrase.length
                    );


                if (
                    suffix.trim()
                    &&
                    !/[A-Za-z0-9]/.test(
                        suffix
                    )
                ) {

                    return (
                        FA[
                            englishPhrase
                        ]
                        +
                        suffix
                    );

                }

            }

        }


        /* =====================================
           WORD-BY-WORD FALLBACK
        ====================================== */

        return translateWords(
            originalText
        );

    }


    /* =========================================
       IGNORE
    ========================================= */

    function shouldIgnore(
        element
    ) {

        if (!element) {
            return true;
        }


        return Boolean(

            element.closest(

                [
                    "script",
                    "style",
                    "code",
                    "pre",
                    "textarea",
                    "[contenteditable='true']",
                    "[data-language-ignore]",
                    "[data-i18n-ignore]"
                ].join(",")

            )

        );

    }


    /* =========================================
       WHITESPACE
    ========================================= */

    function splitWhitespace(raw) {

        const leading =
            raw.match(
                /^\s*/
            )?.[0] || "";


        const trailing =
            raw.match(
                /\s*$/
            )?.[0] || "";


        const core =
            raw.slice(
                leading.length,
                raw.length -
                trailing.length
            );


        return {
            leading,
            core,
            trailing
        };

    }


    /* =========================================
       TEXT NODE
    ========================================= */

    function translateTextNode(
        node,
        language
    ) {

        const parent =
            node.parentElement;


        if (
            !parent
            ||
            shouldIgnore(
                parent
            )
        ) {

            return;

        }


        const raw =
            node.nodeValue;


        if (
            !raw
            ||
            !raw.trim()
        ) {

            return;

        }


        const parts =
            splitWhitespace(
                raw
            );


        let state =
            textState.get(
                node
            );


        if (!state) {

            state = {

                original:
                    parts.core,

                lastApplied:
                    null

            };


            textState.set(
                node,
                state
            );

        }

        else if (
            state.lastApplied !== null
            &&
            normalizeText(
                parts.core
            )
            !==
            normalizeText(
                state.lastApplied
            )
        ) {

            state.original =
                parts.core;

        }


        const translated =
            translateValue(
                state.original,
                language
            );


        state.lastApplied =
            translated;


        const nextValue =
            parts.leading
            +
            translated
            +
            parts.trailing;


        if (
            raw !== nextValue
        ) {

            node.nodeValue =
                nextValue;

        }

    }


    /* =========================================
       ATTRIBUTES
    ========================================= */

    function translateAttribute(
        element,
        attribute,
        language
    ) {

        if (
            shouldIgnore(
                element
            )
            ||
            !element.hasAttribute(
                attribute
            )
        ) {

            return;

        }


        const current =
            element.getAttribute(
                attribute
            );


        if (
            current === null
            ||
            current === ""
        ) {

            return;

        }


        let states =
            attributeState.get(
                element
            );


        if (!states) {

            states = {};

            attributeState.set(
                element,
                states
            );

        }


        if (
            !states[
                attribute
            ]
        ) {

            states[
                attribute
            ] = {

                original:
                    current,

                lastApplied:
                    null

            };

        }


        const state =
            states[
                attribute
            ];


        if (
            state.lastApplied !== null
            &&
            current !== state.lastApplied
        ) {

            state.original =
                current;

        }


        const translated =
            translateValue(
                state.original,
                language
            );


        state.lastApplied =
            translated;


        if (
            current !== translated
        ) {

            element.setAttribute(
                attribute,
                translated
            );

        }

    }


    /* =========================================
       TRANSLATE PAGE
    ========================================= */

    function translatePage(
        language
    ) {

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


        const nodes = [];


        let node;


        while (
            (
                node =
                    walker.nextNode()
            )
        ) {

            nodes.push(
                node
            );

        }


        nodes.forEach(
            function(textNode) {

                translateTextNode(
                    textNode,
                    language
                );

            }
        );


        document
            .querySelectorAll(
                "*"
            )
            .forEach(
                function(element) {

                    if (
                        shouldIgnore(
                            element
                        )
                    ) {

                        return;

                    }


                    [
                        "placeholder",
                        "title",
                        "aria-label"
                    ]
                    .forEach(
                        function(attribute) {

                            translateAttribute(
                                element,
                                attribute,
                                language
                            );

                        }
                    );


                    if (
                        element.matches(
                            "input[type='button'], input[type='submit'], input[type='reset']"
                        )
                    ) {

                        translateAttribute(
                            element,
                            "value",
                            language
                        );

                    }

                }
            );

    }


    /* =========================================
       TITLE
    ========================================= */

    function translateTitle(
        language
    ) {

        const html =
            document.documentElement;


        if (
            !html.dataset
                .plannerEnglishTitle
        ) {

            html.dataset
                .plannerEnglishTitle =
                document.title;

        }


        const original =
            html.dataset
                .plannerEnglishTitle;


        if (
            language === "en"
        ) {

            document.title =
                original;

        }

        else {

            document.title =
                translateValue(
                    original,
                    "fa"
                );

        }

    }


    /* =========================================
       CSS
    ========================================= */

    function createStyles() {

        if (
            document.getElementById(
                "planner-language-css"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "planner-language-css";


        style.textContent = `

            .planner-language-switcher {

                position: fixed;

                top: 14px;

                inset-inline-end: 14px;

                z-index: 999999;

                display: flex;

                direction: ltr;

                gap: 4px;

                padding: 4px;

                border:
                    1px solid
                    rgba(
                        155,
                        107,
                        117,
                        0.20
                    );

                border-radius:
                    12px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.96
                    );

                box-shadow:
                    0
                    6px
                    20px
                    rgba(
                        80,
                        55,
                        50,
                        0.10
                    );

            }


            .planner-language-switcher button {

                min-width:
                    42px;

                height:
                    34px;

                padding:
                    0 10px;

                border:
                    none;

                border-radius:
                    8px;

                background:
                    transparent;

                color:
                    #8d6b72;

                cursor:
                    pointer;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    12px;

                font-weight:
                    700;

            }


            .planner-language-switcher button:hover {

                background:
                    #f8eeee;

            }


            .planner-language-switcher button.active {

                background:
                    #c08b94;

                color:
                    white;

            }


            html[dir="rtl"] body {

                direction:
                    rtl;

                font-family:
                    Tahoma,
                    Arial,
                    sans-serif;

            }


            html[dir="rtl"]
            textarea,

            html[dir="rtl"]
            select,

            html[dir="rtl"]
            input:not([type="email"]):not([type="password"]) {

                direction:
                    rtl;

                text-align:
                    right;

            }


            html[dir="rtl"]
            input[type="email"],

            html[dir="rtl"]
            input[type="password"] {

                direction:
                    ltr;

                text-align:
                    left;

            }


            html[dir="rtl"]
            .planner-language-switcher {

                direction:
                    ltr;

            }


            @media (
                max-width: 550px
            ) {

                .planner-language-switcher {

                    top:
                        8px;

                    inset-inline-end:
                        8px;

                }


                .planner-language-switcher button {

                    min-width:
                        37px;

                    height:
                        31px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =========================================
       LANGUAGE BUTTONS
    ========================================= */

    function createSwitcher() {

        if (
            document.querySelector(
                ".planner-language-switcher"
            )
        ) {

            return;

        }


        const switcher =
            document.createElement(
                "div"
            );


        switcher.className =
            "planner-language-switcher";


        switcher.setAttribute(
            "data-language-ignore",
            ""
        );


        switcher.innerHTML = `

            <button
                type="button"
                data-planner-language="en"
            >
                EN
            </button>

            <button
                type="button"
                data-planner-language="fa"
            >
                فا
            </button>

        `;


        switcher.addEventListener(
            "click",
            function(event) {

                const button =
                    event.target.closest(
                        "[data-planner-language]"
                    );


                if (!button) {
                    return;
                }


                setLanguage(
                    button.dataset
                        .plannerLanguage
                );

            }
        );


        document.body.appendChild(
            switcher
        );

    }


    function updateSwitcher(
        language
    ) {

        document
            .querySelectorAll(
                "[data-planner-language]"
            )
            .forEach(
                function(button) {

                    button.classList.toggle(

                        "active",

                        button.dataset
                            .plannerLanguage
                        ===
                        language

                    );

                }
            );

    }


    /* =========================================
       OBSERVER
    ========================================= */

    function observe() {

        if (
            !observer
            ||
            !document.body
        ) {

            return;

        }


        observer.observe(

            document.body,

            {

                childList:
                    true,

                subtree:
                    true,

                characterData:
                    true,

                attributes:
                    true,

                attributeFilter: [

                    "placeholder",

                    "title",

                    "aria-label",

                    "value"

                ]

            }

        );

    }


    function startObserver() {

        if (observer) {
            return;
        }


        observer =
            new MutationObserver(
                function() {

                    if (
                        isApplying
                    ) {

                        return;

                    }


                    clearTimeout(
                        observerTimer
                    );


                    observerTimer =
                        setTimeout(
                            function() {

                                applyLanguage();

                            },
                            50
                        );

                }
            );


        observe();

    }


    /* =========================================
       APPLY
    ========================================= */

    function applyLanguage(
        language = getLanguage()
    ) {

        if (
            !document.body
        ) {

            return;

        }


        isApplying =
            true;


        if (observer) {

            observer.disconnect();

        }


        const isPersian =
            language === "fa";


        document.documentElement.lang =
            isPersian
                ?
                "fa"
                :
                "en";


        document.documentElement.dir =
            isPersian
                ?
                "rtl"
                :
                "ltr";


        document.body.dir =
            isPersian
                ?
                "rtl"
                :
                "ltr";


        translateTitle(
            language
        );


        translatePage(
            language
        );


        updateSwitcher(
            language
        );


        isApplying =
            false;


        observe();

    }


    /* =========================================
       SET LANGUAGE
    ========================================= */

    function setLanguage(
        language
    ) {

        const safeLanguage =
            language === "fa"
                ?
                "fa"
                :
                "en";


        localStorage.setItem(
            LANGUAGE_KEY,
            safeLanguage
        );


        applyLanguage(
            safeLanguage
        );


        window.dispatchEvent(

            new CustomEvent(

                "plannerLanguageChanged",

                {

                    detail: {

                        language:
                            safeLanguage

                    }

                }

            )

        );

    }


    /* =========================================
       START
    ========================================= */

    function start() {

        createStyles();

        createSwitcher();

        startObserver();

        applyLanguage();

    }


    /* =========================================
       GLOBAL
    ========================================= */

    window.PlannerLanguage = {

        getLanguage:
            getLanguage,

        setLanguage:
            setLanguage,

        apply:
            applyLanguage,

        t:
            function(text) {

                return translateValue(
                    text,
                    getLanguage()
                );

            }

    };


    /* =========================================
       DOM READY
    ========================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            start,

            {
                once:
                    true
            }

        );

    }

    else {

        start();

    }

})();