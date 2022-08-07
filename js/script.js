'use strict';

const main = document.querySelector('.main'); 
const beginGame = document.getElementById('begin-game'); 
const questionText = document.getElementById('question-text'); 
const question = document.querySelector('.question'); 
const multiChoice = document.querySelector('.multichoice-question'); 
const trueBtn = document.getElementById('true');
const falseBtn  = document.getElementById('false'); 
const currentScore = document.getElementById('current-score'); 
const correctModal = document.getElementById('correct-modal'); 
const span = document.getElementsByClassName("close")[0]; 
const leaderSpan = document.getElementsByClassName("close-leaderboard")[0]; 
const correctExplanation = document.getElementById('correct-explanation'); 
const gameOverModal = document.getElementById('game-over-modal'); 
const restartGame = document.getElementById('restart-game'); 
const showLeaderboard = document.getElementById('show-leaderboard'); 
const leaderboard = document.getElementById('leaderboard-modal'); 
const leaderboardContent = document.getElementById('leaderboard-modal-content'); 
const leaderboardEntry = document.getElementById('leaderboard-entry'); 
const multichoiceQuestionText = document.getElementById('multichoice-question-text');
const multichoiceCurrentScore = document.getElementById('multichoice-current-score'); 
const quizComplete = document.querySelector('.quiz-complete'); 
const submitScore = document.getElementById('submit-score'); 
// Multichoice buttons
const option1 = document.getElementById('option-1'); 
const option2 = document.getElementById('option-2'); 
const option3 = document.getElementById('option-3');
const option4 = document.getElementById('option-4'); 

class Question { 
    constructor(questionPrompt, answer, explanation) {
        this.questionPrompt = questionPrompt; 
        this.answer = answer; 
        this.explanation = explanation; 
    }
}

class MultiChoice extends Question {
    constructor(questionPrompt, answer, explanation, options) {
        super(questionPrompt, answer, explanation);
        this.options = options; 
    }
}

class LeaderboardEntry {
    constructor(name, score, misses) {
        this.name = name;
        this.score = score;
        this.misses = misses; 
    }
}

//Create T/F questions
const wonders = new Question(
    "There are nine wonders of the world.", 
    false, 
    "There are seven wonders of the world - Petra, the Great Wall of China, Christ the Redeemer, " + 
    "the Roman Colosseum, Machu Pichu, Chichen Itza, and the Taj Mahal."
); 
const australia = new Question(
    "The capital of Australia is Sydney.", 
    true,
    "The capital of Australia is Sydney, with an estimated population of 5,230,330."
);
const ww2 = new Question(
    "In World War II, the Soviet Union was the first faction to reach Berlin.",
    true, 
    "The Red Army of the Soviet Union was the first military to reach Berlin and capture " + 
    "the city, bringing World War II in Europe to an end."
); 
const atoms = new Question(
    "Atoms generally contain three subatomic particles: protons, electrons, and neutrinos.",
    false,
    "Atoms contain three main subatomic particles - a proton, which is positively charged, " + 
    "an electron, which is negatively charged, and a neutron, which has a neutral charge."
);
const jaws = new Question(
    "In the film Jaws, Chief Brody is killed by the shark.",
    false,
    "The only member of the Orca killed by the shark is Quint, the ship's captain. Both " + 
    "Chief Brody and Matt Hooper survive their encounter."
); 

//Create multichoice questions
const jackson = new MultiChoice(
    "This 1983 single by Michael Jackson is famous for its dance, performed by a group of zombies " +
    "in the track's music video.", 
    1,
    "Thriller, released in 1983, quickly became one of the most culturally recognized pop tracks of " +
    "of all time, complete with its zombie dance and accompanying music video.", 
    ["A. Bad", "B. Thriller", "C. Dirty Diana", "D. Billie Jean"]
); 
const apollo11 = new MultiChoice(
    "The Apollo 11 mission, which resulted in the first humans setting foot on the moon, occurred " +
    "in which year?",
    2, 
    "The Apollo 11 mission, primarily consisting of astronauts Neil Armstrong and Buzz Aldrin, was " + 
    "launched and completed in 1969.",
    ["A. 1967", "B. 1968", "C. 1969", "D. 1970"]
); 
const branches = new MultiChoice(
    "The United States Armed Forces consists of how many branches?", 
    2,
    "There are five branches - the Army, the Marine Corps, the Navy, the Air Force, and the Coast Guard.",
    ["A. 3", "B. 4", "C. 5", "D. 6"]
); 

let questions = [
    wonders, 
    australia, 
    ww2, 
    atoms, 
    jaws, 
    jackson,
    apollo11, 
    branches,
]

const PlayerData = {
    name: '', 
    score: 0, 
    misses: 0, 
    currentQuestion: 0, 
    quizDone: false, 
}

var selectedQuestion; 

function GetQuestion() {
    if(PlayerData.currentQuestion == 8) {
        multiChoice.style.display = 'none';
        quizComplete.style.display = 'block'; 
    }
    else
    {
        selectedQuestion = questions[PlayerData.currentQuestion]; 
    questionText.innerHTML = `${selectedQuestion.questionPrompt}`
    if(PlayerData.currentQuestion >= 5 && !PlayerData.quizDone) {
        multichoiceQuestionText.innerHTML = `${selectedQuestion.questionPrompt}`
        multichoiceCurrentScore.innerHTML = `Current Score: ${PlayerData.score}`
        option1.innerHTML = `${selectedQuestion.options[0]}`
        option2.innerHTML = `${selectedQuestion.options[1]}`
        option3.innerHTML = `${selectedQuestion.options[2]}`
        option4.innerHTML = `${selectedQuestion.options[3]}`
        question.style.display = 'none'; 
        multiChoice.style.display = 'block'; 
    } else {
        if(PlayerData.misses == 3) {
            gameOverModal.style.display = 'block'; 
        } else {
            selectedQuestion = questions[PlayerData.currentQuestion]; 
            questionText.innerHTML =  `${selectedQuestion.questionPrompt}`; 
            currentScore.innerHTML = `Current Score: ${PlayerData.score}`; 
        }
    }
    }
}

function CheckTFDone() {
    if(PlayerData.currentQuestion == questions.length) {
        question.style.display = 'none'; 
        alert('Quiz completed');
    }
}

window.onload = function() {
    question.style.display = 'none';
    multiChoice.style.display = 'none';
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none"; 
    }
}

beginGame.onclick = function() {
    main.style.display = 'none'; 
    GetQuestion(); 
    question.style.display = 'inline';
}

trueBtn.onclick = function() {
    if(selectedQuestion.answer === true) {
        PlayerData.score++;
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    } else {
        PlayerData.misses++; 
        PlayerData.score--;
    }
    PlayerData.currentQuestion++; 
    GetQuestion(); 
}

falseBtn.onclick = function() {
    if(selectedQuestion.answer === true) {
        PlayerData.misses++; 
        PlayerData.score--; 
    } else {
        PlayerData.score++;
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    }
    PlayerData.currentQuestion++; 
    GetQuestion(); 
}

span.onclick = function() {
    correctModal.style.display = 'none'; 
}

window.onclick = function(event) {
    if(event.target == correctModal) {
        correctModal.style.display = 'none';
    }
}

restartGame.onclick = function() {
    location.reload(); 
}

showLeaderboard.onclick = function() {
    leaderboard.style.display = 'block'; 
}

leaderSpan.onclick = function() {
    leaderboard.style.display = 'none'; 
}

//Define multichoice button functionality

option1.onclick = function() {
    if(selectedQuestion.answer === 0) {
        PlayerData.score++; 
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    } else {
        PlayerData.misses++; 
        PlayerData.score--; 
    }
    PlayerData.currentQuestion++;
    GetQuestion(); 
}

option2.onclick = function() {
    if(selectedQuestion.answer === 1) {
        PlayerData.score++; 
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    } else {
        PlayerData.misses++; 
        PlayerData.score--; 
    }
    PlayerData.currentQuestion++;
    GetQuestion(); 
}

option3.onclick = function() {
    if(selectedQuestion.answer === 2) {
        PlayerData.score++; 
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    } else {
        PlayerData.misses++; 
        PlayerData.score--; 
    }
    PlayerData.currentQuestion++;
    GetQuestion(); 
}

option4.onclick = function() {
    if(selectedQuestion.answer === 3) {
        PlayerData.score++; 
        correctExplanation.innerHTML = `${selectedQuestion.explanation}`; 
        correctModal.style.display = 'block'; 
    } else {
        PlayerData.misses++; 
        PlayerData.score--; 
    }
    PlayerData.currentQuestion++;
    GetQuestion(); 
}

submitScore.onclick = function() {
    alert('Leaderboard functionality coming soon!'); 
    location.reload();
}