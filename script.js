/* =====================================================
   STUDY WITH SAFFRONY
   ENGINEERING STUDENT PRODUCTIVITY APP
===================================================== */


/* ================= GLOBAL VARIABLES ================= */

let currentUser = null;

let notes = [];

let quizQuestions = [
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Unit",
            "Control Processing Unit"
        ],
        answer: 0
    },

    {
        question: "Which language is primarily used for web page structure?",
        options: [
            "CSS",
            "HTML",
            "Python",
            "Java"
        ],
        answer: 1
    },

    {
        question: "What is the full form of DBMS?",
        options: [
            "Database Management System",
            "Data Backup Management System",
            "Digital Binary Management System",
            "Database Machine System"
        ],
        answer: 0
    },

    {
        question: "Which data structure follows LIFO?",
        options: [
            "Queue",
            "Array",
            "Stack",
            "Linked List"
        ],
        answer: 2
    },

    {
        question: "What does RAM stand for?",
        options: [
            "Random Access Memory",
            "Read Access Memory",
            "Rapid Application Memory",
            "Run Access Module"
        ],
        answer: 0
    },

    {
        question: "Which of these is an operating system?",
        options: [
            "HTML",
            "Windows",
            "MySQL",
            "JavaScript"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "<!-- -->",
            "#",
            "**"
        ],
        answer: 0
    }
];


let currentQuestion = 0;
let quizAnswers = [];


/* ================= INITIALIZE APP ================= */

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadNotes();

    loadProfile();

    loadTimetable();

    updateDashboard();

    document
        .getElementById("menuBtn")
        ?.addEventListener("click", toggleSidebar);

});


/* =====================================================
   AUTHENTICATION
===================================================== */


/* SHOW SIGNUP */

function showSignup() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("signupForm")
        .classList.remove("hidden");

}


/* SHOW LOGIN */

function showLogin() {

    document
        .getElementById("signupForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");

}


/* SIGNUP USER */

function signupUser() {

    const name =
        document
            .getElementById("signupName")
            .value
            .trim();

    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("signupPassword")
            .value
            .trim();


    if (!name || !email || !password) {

        showToast(
            "Please fill all fields!"
        );

        return;

    }


    if (!email.includes("@")) {

        showToast(
            "Enter a valid email!"
        );

        return;

    }


    const user = {

        name: name,

        email: email,

        password: password,

        branch:
            "Computer Science Engineering"

    };


    localStorage.setItem(
        "saffronyUser",
        JSON.stringify(user)
    );


    currentUser = user;


    localStorage.setItem(
        "saffronyLoggedIn",
        "true"
    );


    showToast(
        "Account created successfully!"
    );


    setTimeout(function () {

        openApp();

    }, 600);

}


/* LOGIN USER */

function loginUser() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value
            .trim();


    const savedUser =
        JSON.parse(
            localStorage.getItem("saffronyUser")
        );


    if (!savedUser) {

        showToast(
            "Account not found. Please Sign Up!"
        );

        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        currentUser = savedUser;


        localStorage.setItem(
            "saffronyLoggedIn",
            "true"
        );


        openApp();

        showToast(
            "Welcome back, " +
            savedUser.name +
            "!"
        );

    }

    else {

        showToast(
            "Invalid email or password!"
        );

    }

}


/* CHECK LOGIN */

function checkLogin() {

    const loggedIn =
        localStorage.getItem(
            "saffronyLoggedIn"
        );


    const savedUser =
        localStorage.getItem(
            "saffronyUser"
        );


    if (
        loggedIn === "true" &&
        savedUser
    ) {

        currentUser =
            JSON.parse(savedUser);

        openApp();

    }

}


/* OPEN APP */

function openApp() {

    document
        .getElementById("authPage")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    updateUserUI();

    loadNotes();

    loadProfile();

    loadTimetable();

    updateDashboard();

}


/* LOGOUT */

function logoutUser() {

    localStorage.removeItem(
        "saffronyLoggedIn"
    );


    location.reload();

}


/* UPDATE USER UI */

function updateUserUI() {

    if (!currentUser) return;


    document
        .getElementById("welcomeName")
        .textContent =
        currentUser.name;


    const initial =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    document
        .getElementById("headerInitial")
        .textContent =
        initial;


    document
        .getElementById("profileInitial")
        .textContent =
        initial;

}


/* =====================================================
   NAVIGATION
===================================================== */


function showSection(sectionId, button) {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );


    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    document
        .getElementById(sectionId)
        .classList.add(
            "active-section"
        );


    const navButtons =
        document.querySelectorAll(
            ".nav-btn"
        );


    navButtons.forEach(function (btn) {

        btn.classList.remove(
            "active"
        );

    });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    document
        .getElementById("sidebar")
        .classList.remove(
            "show-sidebar"
        );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* QUICK NAVIGATION */

function quickNavigate(sectionId) {

    const buttons =
        document.querySelectorAll(
            ".nav-btn"
        );


    buttons.forEach(function (button) {

        if (
            button.textContent
                .toLowerCase()
                .includes(
                    sectionId === "timer"
                        ? "study timer"
                        : sectionId
                )
        ) {

            showSection(
                sectionId,
                button
            );

        }

    });

}


/* MOBILE SIDEBAR */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle(
            "show-sidebar"
        );

}


/* =====================================================
   NOTES SYSTEM
===================================================== */


/* ADD NOTE */

function addNote() {

    const title =
        document
            .getElementById("noteTitle")
            .value
            .trim();


    const content =
        document
            .getElementById("noteContent")
            .value
            .trim();


    if (!title || !content) {

        showToast(
            "Please enter title and note!"
        );

        return;

    }


    const newNote = {

        id: Date.now(),

        title: title,

        content: content,

        date:
            new Date()
                .toLocaleDateString()

    };


    notes.push(newNote);


    localStorage.setItem(
        "saffronyNotes",
        JSON.stringify(notes)
    );


    document
        .getElementById("noteTitle")
        .value = "";


    document
        .getElementById("noteContent")
        .value = "";


    displayNotes();

    updateDashboard();

    showToast(
        "Note added successfully!"
    );

}


/* LOAD NOTES */

function loadNotes() {

    const savedNotes =
        localStorage.getItem(
            "saffronyNotes"
        );


    if (savedNotes) {

        notes =
            JSON.parse(savedNotes);

    }


    displayNotes();

}


/* DISPLAY NOTES */

function displayNotes() {

    const container =
        document.getElementById(
            "notesContainer"
        );


    if (!container) return;


    if (notes.length === 0) {

        container.innerHTML = `

            <div class="note-card">

                <h3>No Notes Yet 📚</h3>

                <p>
                    Start adding your engineering notes!
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    notes
        .slice()
        .reverse()
        .forEach(function (note) {

            const card =
                document.createElement("div");


            card.className =
                "note-card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(note.title)}
                </h3>

                <p>
                    ${escapeHTML(note.content)}
                </p>

                <div class="note-actions">

                    <span class="note-date">

                        ${note.date}

                    </span>

                    <button
                        class="delete-note"
                        onclick="deleteNote(${note.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;


            container.appendChild(card);

        });

}


/* DELETE NOTE */

function deleteNote(id) {

    notes =
        notes.filter(function (note) {

            return note.id !== id;

        });


    localStorage.setItem(
        "saffronyNotes",
        JSON.stringify(notes)
    );


    displayNotes();

    updateDashboard();

    showToast(
        "Note deleted!"
    );

}


/* =====================================================
   QUIZ SYSTEM
===================================================== */


/* START QUIZ */

function startQuiz() {

    currentQuestion = 0;

    quizAnswers = [];


    displayQuestion();

}


/* DISPLAY QUESTION */

function displayQuestion() {

    const quizContent =
        document.getElementById(
            "quizContent"
        );


    const question =
        quizQuestions[currentQuestion];


    quizContent.innerHTML = `

        <div class="question-number">

            Question
            ${currentQuestion + 1}
            of
            ${quizQuestions.length}

        </div>


        <h2 class="question">

            ${question.question}

        </h2>


        <div class="options">

            ${question.options
                .map(function (
                    option,
                    index
                ) {

                    return `

                        <button
                            class="option"
                            onclick="selectAnswer(${index})">

                            ${String.fromCharCode(65 + index)}.
                            ${option}

                        </button>

                    `;

                })
                .join("")
            }

        </div>

    `;

}


/* SELECT ANSWER */

function selectAnswer(answerIndex) {

    quizAnswers.push(
        answerIndex
    );


    currentQuestion++;


    if (
        currentQuestion <
        quizQuestions.length
    ) {

        displayQuestion();

    }

    else {

        showQuizResult();

    }

}


/* QUIZ RESULT */

function showQuizResult() {

    let score = 0;


    quizAnswers.forEach(
        function (
            answer,
            index
        ) {

            if (
                answer ===
                quizQuestions[index].answer
            ) {

                score++;

            }

        }
    );


    const percentage =
        Math.round(
            (score /
                quizQuestions.length)
            * 100
        );


    const bestScore =
        Number(
            localStorage.getItem(
                "saffronyQuizScore"
            )
        ) || 0;


    if (
        percentage > bestScore
    ) {

        localStorage.setItem(
            "saffronyQuizScore",
            percentage
        );

    }


    document
        .getElementById(
            "quizContent"
        )
        .innerHTML = `

            <div class="result-box">

                <p>
                    Your Score
                </p>

                <h1>
                    ${percentage}%
                </h1>

                <h2>
                    ${score}
                    /
                    ${quizQuestions.length}
                    Correct
                </h2>

                <p>
                    ${
                        percentage >= 70
                        ? "Excellent! Keep learning 🚀"
                        : "Keep practicing! You can improve 💪"
                    }
                </p>

                <button
                    class="primary-btn"
                    onclick="startQuiz()">

                    Try Again

                </button>

            </div>

        `;


    updateDashboard();

}


/* =====================================================
   TIMETABLE
===================================================== */


/* SAVE TIMETABLE */

function saveTimetable() {

    const rows =
        document.querySelectorAll(
            "#timetableBody tr"
        );


    let timetable = [];


    rows.forEach(function (row) {

        let rowData = [];


        const cells =
            row.querySelectorAll("td");


        cells.forEach(function (cell) {

            rowData.push(
                cell.innerText
            );

        });


        timetable.push(rowData);

    });


    localStorage.setItem(
        "saffronyTimetable",
        JSON.stringify(timetable)
    );


    showToast(
        "Time Table saved successfully!"
    );

}


/* LOAD TIMETABLE */

function loadTimetable() {

    const saved =
        localStorage.getItem(
            "saffronyTimetable"
        );


    if (!saved) return;


    const timetable =
        JSON.parse(saved);


    const rows =
        document.querySelectorAll(
            "#timetableBody tr"
        );


    rows.forEach(
        function (
            row,
            rowIndex
        ) {

            const cells =
                row.querySelectorAll("td");


            cells.forEach(
                function (
                    cell,
                    cellIndex
                ) {

                    if (
                        timetable[rowIndex] &&
                        timetable[rowIndex][cellIndex]
                    ) {

                        cell.innerText =
                            timetable[rowIndex][cellIndex];

                    }

                }
            );

        }
    );

}


/* =====================================================
   POMODORO TIMER
===================================================== */


let timer;

let timeLeft = 25 * 60;

let currentMode = "focus";

let timerRunning = false;


/* SET TIMER MODE */

function setTimerMode(mode) {

    pauseTimer();


    currentMode = mode;


    const modes =
        document.querySelectorAll(
            ".timer-mode"
        );


    modes.forEach(function (button) {

        button.classList.remove(
            "active-mode"
        );

    });


    if (mode === "focus") {

        timeLeft = 25 * 60;

        document
            .getElementById("timerLabel")
            .textContent =
            "Focus Time";


        modes[0].classList.add(
            "active-mode"
        );

    }


    else if (mode === "short") {

        timeLeft = 5 * 60;

        document
            .getElementById("timerLabel")
            .textContent =
            "Short Break";


        modes[1].classList.add(
            "active-mode"
        );

    }


    else {

        timeLeft = 15 * 60;

        document
            .getElementById("timerLabel")
            .textContent =
            "Long Break";


        modes[2].classList.add(
            "active-mode"
        );

    }


    updateTimerDisplay();

}


/* START TIMER */

function startTimer() {

    if (timerRunning) return;


    timerRunning = true;


    timer = setInterval(
        function () {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimerDisplay();

            }

            else {

                timerCompleted();

            }

        },
        1000
    );

}


/* PAUSE TIMER */

function pauseTimer() {

    clearInterval(timer);

    timerRunning = false;

}


/* RESET TIMER */

function resetTimer() {

    pauseTimer();


    if (
        currentMode === "focus"
    ) {

        timeLeft = 25 * 60;

    }


    else if (
        currentMode === "short"
    ) {

        timeLeft = 5 * 60;

    }


    else {

        timeLeft = 15 * 60;

    }


    updateTimerDisplay();

}


/* UPDATE TIMER DISPLAY */

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    document
        .getElementById("timerDisplay")
        .textContent =
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(seconds).padStart(2, "0");

}


/* TIMER COMPLETED */

function timerCompleted() {

    pauseTimer();


    if (
        currentMode === "focus"
    ) {

        let sessions =
            Number(
                localStorage.getItem(
                    "saffronySessions"
                )
            ) || 0;


        sessions++;


        localStorage.setItem(
            "saffronySessions",
            sessions
        );


        let focusMinutes =
            Number(
                localStorage.getItem(
                    "saffronyFocusMinutes"
                )
            ) || 0;


        focusMinutes += 25;


        localStorage.setItem(
            "saffronyFocusMinutes",
            focusMinutes
        );


        document
            .getElementById(
                "completedSessions"
            )
            .textContent =
            sessions;


        updateDashboard();


        showToast(
            "Focus session completed! 🎉"
        );

    }

    else {

        showToast(
            "Break completed!"
        );

    }


    resetTimer();

}


/* =====================================================
   CALCULATOR
===================================================== */


function appendCalc(value) {

    const display =
        document.getElementById(
            "calcDisplay"
        );


    display.value += value;

}


/* CLEAR */

function clearCalculator() {

    document
        .getElementById(
            "calcDisplay"
        )
        .value = "";

}


/* DELETE LAST */

function deleteLast() {

    const display =
        document.getElementById(
            "calcDisplay"
        );


    display.value =
        display.value.slice(0, -1);

}


/* CALCULATE */

function calculateResult() {

    const display =
        document.getElementById(
            "calcDisplay"
        );


    try {

        const expression =
            display.value;


        if (!expression) return;


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        display.value =
            result;

    }

    catch (error) {

        display.value =
            "Error";


        setTimeout(function () {

            display.value = "";

        }, 1000);

    }

}


/* =====================================================
   PROFILE
===================================================== */


/* LOAD PROFILE */

function loadProfile() {

    if (!currentUser) {

        const user =
            localStorage.getItem(
                "saffronyUser"
            );


        if (user) {

            currentUser =
                JSON.parse(user);

        }

    }


    if (!currentUser) return;


    const nameInput =
        document.getElementById(
            "profileName"
        );


    const emailInput =
        document.getElementById(
            "profileEmail"
        );


    const branchSelect =
        document.getElementById(
            "profileBranch"
        );


    if (nameInput) {

        nameInput.value =
            currentUser.name;

    }


    if (emailInput) {

        emailInput.value =
            currentUser.email;

    }


    if (branchSelect) {

        branchSelect.value =
            currentUser.branch ||
            "Computer Science Engineering";

    }

}


/* SAVE PROFILE */

function saveProfile() {

    const name =
        document
            .getElementById(
                "profileName"
            )
            .value
            .trim();


    const branch =
        document
            .getElementById(
                "profileBranch"
            )
            .value;


    if (!name) {

        showToast(
            "Name cannot be empty!"
        );

        return;

    }


    currentUser.name =
        name;


    currentUser.branch =
        branch;


    localStorage.setItem(
        "saffronyUser",
        JSON.stringify(currentUser)
    );


    updateUserUI();


    showToast(
        "Profile updated successfully!"
    );

}


/* =====================================================
   DASHBOARD STATISTICS
===================================================== */


function updateDashboard() {

    const notesCount =
        document.getElementById(
            "notesCount"
        );


    if (notesCount) {

        notesCount.textContent =
            notes.length;

    }


    const sessions =
        Number(
            localStorage.getItem(
                "saffronySessions"
            )
        ) || 0;


    const sessionElement =
        document.getElementById(
            "studySessions"
        );


    if (sessionElement) {

        sessionElement.textContent =
            sessions;

    }


    const score =
        Number(
            localStorage.getItem(
                "saffronyQuizScore"
            )
        ) || 0;


    const scoreElement =
        document.getElementById(
            "quizScore"
        );


    if (scoreElement) {

        scoreElement.textContent =
            score + "%";

    }


    const focusMinutes =
        Number(
            localStorage.getItem(
                "saffronyFocusMinutes"
            )
        ) || 0;


    const focusElement =
        document.getElementById(
            "focusMinutes"
        );


    if (focusElement) {

        focusElement.textContent =
            focusMinutes;

    }


    const completed =
        document.getElementById(
            "completedSessions"
        );


    if (completed) {

        completed.textContent =
            sessions;

    }

}


/* =====================================================
   TOAST MESSAGE
===================================================== */


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(function () {

        toast.classList.remove(
            "show"
        );

    }, 3000);

}


/* =====================================================
   SECURITY HELPER
===================================================== */


function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}