const questions = [
    {
        question: "What is the oldest computer language?",
        answers: [
            { text: "FORTRAN", correct: true },
            { text: "CPP", correct: false },
            { text: "Java", correct: false },
            { text: "Ruby", correct: false }
        ]
    },
    {
        question: "Which of the following programming languages is a high-level language?",
        answers: [
            { text: "Machine language", correct: false },
            { text: "Assembly language", correct: false },
            { text: "C++", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which data structure is best suited for implementing a queue?",
        answers: [
            { text: "Stack", correct: false },
            { text: "Linked list", correct: true },
            { text: "Array", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "Which of the following is not a type of sorting algorithm?",
        answers: [
            { text: "Bubble sort", correct: false },
            { text: "Insertion sort", correct: false },
            { text: "Searching sort", correct: true },
            { text: "Merge sort", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
