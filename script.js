const questions = [
    {
        question:"If you restart your computer by selecting the restart button, it is known as …",
        answers:[
                {text:"Soft Boot" , correct: false},
                {text:"Cold Boot" , correct: false},
                {text:"Warm Boot" , correct: false},
                {text:"A & C" , correct: true},
        ]
    },
    {
        question:"The Second Generation Computer used …",
        answers:[
                {text:"Transistors" , correct: true},
                {text:"Integrated Circuit" , correct: false},
                {text:"Vacuum tube" , correct: false},
                {text:"Chip" , correct: false},
        ]  
    },
    {
        question:"Who among the following has designed the Ruby programing language?",
        answers:[
                {text:"Larry Wall" , correct: false},
                {text:"Guido van Rossum" , correct: false},
                {text:"Joe Armstrong" , correct: false},
                {text:"Yukihiro Matsumoto" , correct: true},
        ]   
    },
    {
        question:"Who among the following has designed the JavaScript programing language?",
        answers:[
                {text:"Rasmus Lerdorf" , correct: false},
                {text:"Guido van Rossum" , correct: false},
                {text:"Brendan Eich" , correct: true},
                {text:"James Gosling" , correct: false},
        ]  
    },
    {
        question:"Which among the following is the shortcut key to full screen the active window (basically web browser) in your computer system?",
        answers:[
                {text:"F5" , correct: false},
                {text:"F11" , correct: true},
                {text:"F10" , correct: false},
                {text:"Ctrl + L" , correct: false},
        ]  
    },
    {
        question:"Who among the following is known as the Father of DNA Computing?",
        answers:[
                {text:"Leonard Adleman" , correct: true},
                {text:"Lee de Forest" , correct: false},
                {text:"Leonardo da Vinci" , correct: false},
                {text:"Leon Bollee" , correct: false},
        ]  
    },
    {
        question:" Which among the following works faster?",
        answers:[
                {text:"RAM" , correct: false},
                {text:"Cache" , correct: true},
                {text:"Register" , correct: false},
                {text:"ROM" , correct: false},
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

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
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
    }
    else{
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }

});
startQuiz();