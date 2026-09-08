// ===============================
// PAGE NAVIGATION
// ===============================

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

function openPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active-page");

    document
        .querySelector(`[data-page="${pageId}"]`)
        .classList.add("active");

    sidebar.classList.remove("show");
    overlay.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navItems.forEach(item => {

    item.addEventListener("click", () => {

        openPage(item.dataset.page);

    });

});


// ===============================
// HERO BUTTON
// ===============================

document.querySelectorAll("[data-go]").forEach(button => {

    button.addEventListener("click", () => {

        openPage(button.dataset.go);

    });

});


// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");

});

overlay.addEventListener("click", () => {

    sidebar.classList.remove("show");
    overlay.classList.remove("show");

});


// ===============================
// NOTES SYSTEM
// ===============================

let notes = JSON.parse(
    localStorage.getItem("saffronyNotes")
) || [];


const noteModal = document.getElementById("noteModal");
const openNoteModal = document.getElementById("openNoteModal");
const closeNoteModal = document.getElementById("closeNoteModal");
const saveNote = document.getElementById("saveNote");


openNoteModal.addEventListener("click", () => {

    noteModal.classList.add("show");

});


closeNoteModal.addEventListener("click", () => {

    noteModal.classList.remove("show");

});


noteModal.addEventListener("click", (event) => {

    if (event.target === noteModal) {

        noteModal.classList.remove("show");

    }

});


// SAVE NOTE

saveNote.addEventListener("click", () => {

    const title =
        document.getElementById("noteTitle").value.trim();

    const subject =
        document.getElementById("noteSubject").value;

    const content =
        document.getElementById("noteContent").value.trim();


    if (!title || !content) {

        alert("Please enter note title and content!");

        return;

    }


    const newNote = {

        id: Date.now(),

        title,

        subject,

        content

    };


    notes.unshift(newNote);


    localStorage.setItem(
        "saffronyNotes",
        JSON.stringify(notes)
    );


    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";


    noteModal.classList.remove("show");


    renderNotes();
    updateDashboard();

});


function renderNotes() {

    const container =
        document.getElementById("notesContainer");


    container.innerHTML = "";


    if (notes.length === 0) {

        container.innerHTML = `

            <div class="empty-notes">

                <h2>📚 No Notes Yet</h2>

                <p>
                    Start organizing your knowledge by creating your first note.
                </p>

            </div>

        `;

        return;

    }


    notes.forEach(note => {

        const card = document.createElement("div");

        card.className = "note-card";


        card.innerHTML = `

            <button
                class="delete-note"
                data-id="${note.id}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

            <span class="note-subject">
                ${escapeHTML(note.subject)}
            </span>

            <h3>
                ${escapeHTML(note.title)}
            </h3>

            <p>
                ${escapeHTML(note.content)}
            </p>

        `;


        container.appendChild(card);

    });


    document.querySelectorAll(".delete-note").forEach(button => {

        button.addEventListener("click", () => {

            deleteNote(Number(button.dataset.id));

        });

    });

}


function deleteNote(id) {

    notes = notes.filter(note => note.id !== id);


    localStorage.setItem(
        "saffronyNotes",
        JSON.stringify(notes)
    );


    renderNotes();
    updateDashboard();

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ===============================
// QUIZ SYSTEM
// ===============================

const quizQuestions = [

    {
        question: "What is the capital of India?",

        answers: [
            "Mumbai",
            "New Delhi",
            "Kolkata",
            "Chennai"
        ],

        correct: 1
    },

    {
        question: "Which planet is known as the Red Planet?",

        answers: [
            "Earth",
            "Mars",
            "Venus",
            "Jupiter"
        ],

        correct: 1
    },

    {
        question: "What is 12 × 8?",

        answers: [
            "86",
            "94",
            "96",
            "88"
        ],

        correct: 2
    },

    {
        question: "Which gas do plants mainly absorb from the atmosphere?",

        answers: [
            "Oxygen",
            "Carbon Dioxide",
            "Nitrogen",
            "Hydrogen"
        ],

        correct: 1
    },

    {
        question: "Who wrote Romeo and Juliet?",

        answers: [
            "William Shakespeare",
            "Charles Dickens",
            "Mark Twain",
            "J.K. Rowling"
        ],

        correct: 0
    }

];


let currentQuestion = 0;
let currentScore = 0;
let answered = false;


const quizStart =
    document.getElementById("quizStart");

const quizBox =
    document.getElementById("quizBox");

const quizResult =
    document.getElementById("quizResult");

const startQuiz =
    document.getElementById("startQuiz");

const questionText =
    document.getElementById("questionText");

const answerButtons =
    document.getElementById("answerButtons");

const nextQuestion =
    document.getElementById("nextQuestion");


startQuiz.addEventListener("click", () => {

    currentQuestion = 0;
    currentScore = 0;

    quizStart.classList.add("hidden");
    quizResult.classList.add("hidden");

    quizBox.classList.remove("hidden");

    showQuestion();

});


function showQuestion() {

    answered = false;

    nextQuestion.classList.add("hidden");

    const question =
        quizQuestions[currentQuestion];


    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    document.getElementById("liveScore").textContent =
        currentScore;


    document.getElementById("quizProgressFill").style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;


    questionText.textContent =
        question.question;


    answerButtons.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;


        button.addEventListener("click", () => {

            selectAnswer(index);

        });


        answerButtons.appendChild(button);

    });

}


function selectAnswer(index) {

    if (answered) return;

    answered = true;


    const correctAnswer =
        quizQuestions[currentQuestion].correct;


    const buttons =
        document.querySelectorAll(".answer-btn");


    buttons.forEach((button, buttonIndex) => {

        button.disabled = true;


        if (buttonIndex === correctAnswer) {

            button.classList.add("correct");

        }


        if (
            buttonIndex === index &&
            index !== correctAnswer
        ) {

            button.classList.add("wrong");

        }

    });


    if (index === correctAnswer) {

        currentScore++;

        document.getElementById("liveScore").textContent =
            currentScore;

    }


    nextQuestion.classList.remove("hidden");

}


nextQuestion.addEventListener("click", () => {

    currentQuestion++;


    if (currentQuestion < quizQuestions.length) {

        showQuestion();

    } else {

        showQuizResult();

    }

});


function showQuizResult() {

    quizBox.classList.add("hidden");

    quizResult.classList.remove("hidden");


    document.getElementById("finalScore").textContent =
        `${currentScore}/${quizQuestions.length}`;


    const resultMessage =
        document.getElementById("resultMessage");


    if (currentScore === 5) {

        resultMessage.textContent =
            "Perfect score! You're absolutely amazing! 🌟";

    }

    else if (currentScore >= 3) {

        resultMessage.textContent =
            "Great job! Keep practicing and you'll become even better! 🚀";

    }

    else {

        resultMessage.textContent =
            "Good attempt! Learning is a journey, keep going! 💪";

    }


    const bestScore =
        Number(
            localStorage.getItem("saffronyQuizScore")
        ) || 0;


    if (currentScore > bestScore) {

        localStorage.setItem(
            "saffronyQuizScore",
            currentScore
        );

    }


    updateDashboard();

}


document
    .getElementById("restartQuiz")
    .addEventListener("click", () => {

        quizResult.classList.add("hidden");

        quizStart.classList.remove("hidden");

    });


// ===============================
// CALCULATOR
// ===============================

const calcDisplay =
    document.getElementById("calcDisplay");

const calcButtons =
    document.querySelectorAll(".calc-btn");


calcButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
            button.dataset.value;


        if (value === "C") {

            calcDisplay.value = "";

            return;

        }


        if (value === "DEL") {

            calcDisplay.value =
                calcDisplay.value.slice(0, -1);

            return;

        }


        if (value === "=") {

            calculateResult();

            return;

        }


        calcDisplay.value += value;

    });

});


function calculateResult() {

    try {

        const expression =
            calcDisplay.value;


        if (!expression) return;


        const allowed =
            /^[0-9+\-*/%.() ]+$/;


        if (!allowed.test(expression)) {

            throw new Error();

        }


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (!Number.isFinite(result)) {

            throw new Error();

        }


        calcDisplay.value = result;

    }

    catch {

        calcDisplay.value = "Error";

    }

}


// ===============================
// DASHBOARD UPDATE
// ===============================

function updateDashboard() {

    const notesCount = notes.length;


    const bestScore =
        Number(
            localStorage.getItem("saffronyQuizScore")
        ) || 0;


    document.getElementById("notesCount").textContent =
        notesCount;


    document.getElementById("profileNotes").textContent =
        notesCount;


    document.getElementById("quizScore").textContent =
        `${bestScore}/5`;


    document.getElementById("profileScore").textContent =
        bestScore;

}


// ===============================
// INITIAL LOAD
// ===============================

renderNotes();
updateDashboard();