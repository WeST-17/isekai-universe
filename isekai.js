const questions = document.querySelectorAll('.question');
const loading = document.querySelector('.loading');
const nextButton = document.getElementById('nextButton');
const answerInputs = document.querySelectorAll('input[type="radio"]');

let currentIndex = 0;
let personalityScore = {
    "Hero": 0,
    "Villain": 0,
    "Side Character": 0,
    "Protagonist": 0,
    "Comic Relief": 0,
    "NPC Villager": 0,
    "The Mentor": 0,
    "The Anti-Hero": 0,
    "The Love Interest": 0
};
let worldScore = {
    "Typical Fantasy": 0,
    "Gaming World": 0,
    "Feudal Era": 0,
    "Apocalyptic Future": 0,
    "Slice of Life": 0
};

// Scoring functions:
function updatePersonalityScore(selectedAnswer) {
    characterType = selectedAnswer.value;
    switch(characterType) {
        case "Hero":
            personalityScore["Hero"] += 3;
            personalityScore["Protagonist"] += 1;
            personalityScore["Villain"] += 1;
    }
    
}

function updateWorldScore(selectedAnswer) {
    worldScore[selectedAnswer.value] += 1;
}

// Find the maximum value in the score objects
function calculateScores() {
    let universe;
    for (let key in worldScore) {
        if (worldScore[key] > maxScore) {
            universe = key;
        }
    }

    let character;
    for (let key in personalityScore) {
        if (personalityScore[key] > maxScore) {
            character = key;
        }
    }
    return [characeter, universe]
}


function updateButton() {
    if (currentIndex === questions.length - 1) {
        nextButton.textContent = 'Load my World...';
        nextButton.removeEventListener('click', goToNextQuestion);
        nextButton.addEventListener('click', submitQuiz);
    } else {
        nextButton.textContent = 'Next';
        nextButton.removeEventListener('click', submitQuiz);
        nextButton.addEventListener('click', goToNextQuestion);
    }
}

function goToNextQuestion() {
    const selectedAnswer = document.querySelector('.question.active input[type="radio"]:checked');
    if (!selectedAnswer && currentIndex > 0) {
        alert('Please select an answer.');
        return; // Exit the function if no answer is selected
    }

    if (currentIndex === 0) {
        questions[currentIndex].classList.remove('active');
        currentIndex++;
        questions[currentIndex].classList.add('active');
    }
    else if (currentIndex <= 7) {
        updatePersonalityScore(selectedAnswer);
        questions[currentIndex].classList.remove('active');
        currentIndex++;
        questions[currentIndex].classList.add('active');
    }
    else {
        updateWorldScore(selectedAnswer);
        questions[currentIndex].classList.remove('active');
        currentIndex++;
        questions[currentIndex].classList.add('active');
    }
    
    updateButton();
}

function submitQuiz() {
    questions[currentIndex].classList.remove('active');
    loading.classList.add('active');
    console.log('Quiz complete.');

    // Add submit logic here:
    const scores = calculateScores();

}

updateButton();