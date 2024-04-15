const questions = document.querySelectorAll('.question');
const loading = document.querySelector('.loading');
const nextButton = document.getElementById('nextButton');
const answerInputs = document.querySelectorAll('input[type="radio"]');
let currentIndex = 0;
let score = 0;

function updateScore(selectedAnswer) {
    score += parseInt(selectedAnswer.value);
}

function updateButton() {
    if (currentIndex === questions.length - 1) {
        nextButton.textContent = 'See my Results!';
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
    else {
        updateScore(selectedAnswer);
        questions[currentIndex].classList.remove('active');
        currentIndex++;
        questions[currentIndex].classList.add('active');
    }
    
    updateButton();
}

function submitQuiz() {
    questions[currentIndex].classList.remove('active');
    loading.classList.add('active');
    console.log('Quiz complete.', score);

    // Add submit logic here:
    

}

updateButton();