const questions = [
{
question: "Was ist Python?",
answer: [
    { text: "Ein Computerbildschirm", correct: false},
    { text: "Eine Programmiersprache", correct: true},
    { text: "Eine Tastatur", correct: false},
    { text: "Ein Computerspiel", correct: false},
]
},
{
    question: "Was ist eine Variable?",
answer: [
    { text: "Ein gespeicherter Wert", correct: true},
    { text: "Ein Computerlüfter", correct: false},
    { text: "Ein Drucker", correct: false},
    { text: "Eine Internetseite", correct: false},
]
},
{
    question: "Was macht eine Schleife?",
answer: [
    { text: "Sie löscht das Programm", correct: false},
    { text: "Sie schaltet den Computer aus", correct: false},
    { text: "Sie wiederholt Anweisungen", correct: true},
    { text: "Sie öffnet eine Internetseite", correct: false},
]
}, 
{
 question: "Was bedeutet True in Python?",
answer: [
    { text: "Text", correct: false},
    { text: "Eine Kommazahl", correct: false},
    { text: "Ein Wahrheitswert", correct: true},
    { text: "Eine Liste", correct: false},
]   
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("Button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
        button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sie haben ${score} von ${questions.length} Punkten erreicht!`;
  nextButton.innerHTML = "Nochmal spielen";
  nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();