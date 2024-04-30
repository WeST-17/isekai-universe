const loading = document.querySelector('.loading');
const nextButton = document.getElementById('nextButton');


let currentIndex = 0;
let score = {
    "Hero": 0,
    "Villain": 0,
    "SideCharacter": 0,
    "Protagonist": 0,
    "ComicRelief": 0,
    "NPC": 0,
    "AntiHero": 0,
};

// Character images in the images folder.
const characters = ['All_Might', 'Astro', 'Frieza', 'Geto', 'Geto_2', 'Gojo', 'Guts', 'Koro_Sensei', 'Levi', 'Light', 'Mash', 'Naruto', 'NPC_2', 'NPC_3', 'NPC_4', 'Saiki', 'Saitama', 'Sukuna', 'Tanjiro', 'Usagi', 'Villager', 'Zenitsu', 'Zoro'];

const questionContent = [
    {
        question: "Do you remember how you died?",
        choices: ["Truck-kun instant death express", "Stabbed while trying to save a person", "Natural Causes", "I didn't cuz I'm him"],
        values: ["Protagonist", "Hero", "SideCharacter", "Villain"]
    },
    {
        question: "If you were stranded on a deserted island, what is the one item you would bring?",
        choices: ["Smartphone", "Lighter/Source of Fire", "Knife", "First-Aid Kit"],
        values: ["ComicRelief", "Villain", "Hero", "SideCharacter"]
    },
    {
        question: "You have a final exam tomorrow! How do you prepare?",
        choices: ["Pull an all-nighter to study", "I'm already prepared", "It's only worth 25% of my grade", "Cry"],
        values: ["SideCharacter", "Hero", "Protagonist", "ComicRelief"]
    },
    {
        question: "You stumble upon a stranger in need of help. Your first thought is: ",
        choices: ["Let's help them", "Are they scamming me?", "None of my business...", "Maybe I'll be rewarded"],
        values: ["Protagonist", "SideCharacter", "NPC", "AntiHero"]
    },
    {
        question: "You're walking past a mirror, and you...",
        choices: ["Stop for a minute to check yourself out", "Notice a smudge in the very corner", "Walk right past it", "Say 'Bloody Mary' 3 times"],
        values: ["Hero", "ComicRelief", "NPC", "Villain"]
    },
    {
        question: "Danger lurks around the corner. Your first response is...",
        choices: ["Finally, a worthy opponent!", "Wait a bit and come up with a plan", "Book it out of there as fast as you can", "Screw it, whatever happens happens"],
        values: ["AntiHero", "SideCharacter", "NPC", "ComicRelief"]
    },
    {
        question: "You need some time alone. Where do you go?",
        choices: ["A quiet and empty library", "Under the shadow of a tree", "Locked in my own room", "Go for a drive"],
        values: ["SideCharacter", "NPC", "Villain", "Protagonist"]
    },
    {
        question: "You need to finish up that favor your friend asked of you last week, but there's an assignment due today. What now?",
        choices: ["Can't disappoint, let's get to work!", "There's more important work to be done", "Maybe I'll do it after a quick nap", "What was the favor again?"],
        values: ["Protagonist", "Villain", "AntiHero", "ComicRelief"]
    },
    {
        question: "You're on your bed, just staring at the ceiling. What do you do next?",
        choices: ["zzz", "Think about life", "Get up and do something productive", "Browse social media for a few hours"],
        values: ["NPC", "Protagonist", "Hero", "NPC"]
    },
    {
        question: "Looks like someone lost their wedding ring. You take a closer look and see that it seems to be made of diamond! What do you do now?",
        choices: ["I guess I'm rich", "Take it to a lost and found", "Attempt to locate the owner", "Leave it"],
        values: ["AntiHero", "Protagonist", "Hero", "NPC"]
    },
    {
        question: "You just woke up in a new world. What moral code do you follow?",
        choices: ["I don't have one, I'll do what I want", "I guess I live here now, so I should keep a semblence of humanity...", "Figure out the social norms of this world and stay out of trouble", "Let's bend the rules a bit"],
        values: ["Villain", "Protagonist", "SideCharacter", "AntiHero"]
    },
    {
        question: "Finally, how would you go about forming relationships in this new world?",
        choices: ["Find the nearest waifu / husbando and bark 😅", "What are friends? I ride solo", "Just let it happen naturally. I'm sure it'll work out", "Might be risky, I want to learn more about this world first"],
        values: ["ComicRelief", "AntiHero", "Protagonist", "SideCharacter"]
    },
];

const quizContainer = document.querySelector('.quiz-container');

// Loop through each question and create HTML elements
questionContent.forEach((q) => {
    const randomNum = Math.floor(Math.random()*23 + 1) - 1;
    let ranImg;
    if (randomNum % 2 != 0) {
        ranImg = 'randomImage';
    }
    else {
        ranImg = 'randomImage2';
    }

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <div class='${ranImg}'>
            <img src='/isekai-universe/images/characters/${characters[randomNum]}.png' />
        </div>
        <p>${q.question}</p>
        <div class='content'>
            ${q.choices.map((choice, index) => `
                <label class='container'>
                    ${choice}
                    <input type="radio" checked="checked" name="radio" value=${q.values[index]}>
                    <span class="checkmark"></span>
                </label>`).join('')}
        </div>
    `;
    quizContainer.appendChild(questionElement);
});

const questions = document.querySelectorAll('.question');

// Scoring functions:
function updateScore(selectedAnswer) {
    if (selectedAnswer) {
        let valueType = String(selectedAnswer.value);
        switch (valueType) {
            // Personality Types -------------------------------------------------------
            case "Protagonist":
                score["Protagonist"] += 3;
                score["Hero"] += 1;
                break;
            case "Hero":
                score["Hero"] += 3;
                score["AntiHero"] += 1;
                break;
            case "Villain":
                score["Villain"] += 3;
                score["AntiHero"] += 1;
                break;
            case "SideCharacter":
                score["SideCharacter"] += 3;
                score["ComicRelief"] += 1;
                break;
            case "ComicRelief":
                score["ComicRelief"] += 3;
                score["NPC"] += 1;
                break;
            case "AntiHero":
                score["AntiHero"] += 3;
                score["Protagonist"] += 1;
                break;
            case "Lover":
                score["Lover"] += 3;
                score["ComicRelief"] += 1;
                break;
            case "NPC":
                score["NPC"] += 3;
                // LOL no secondary for NPCs 
                break;
        }
    }
    
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

async function goToNextQuestion() {
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

// Find the maximum value in the score objects
function calculateScores() {
    let character;
    let maxPerScore = 0;
    for (let key in score) {
        if (score[key] > maxPerScore) {
            character = key;
            maxPerScore = score[key];
        }
    }
    return character
}

function submitQuiz() {
    // Determining World...
    const selectedAnswer = document.querySelector('.question.active input[type="radio"]:checked');
    updateScore(selectedAnswer);

    questions[currentIndex].classList.remove('active');
    loading.classList.add('active');
    console.log('Quiz complete.');

    // Submit and calculate score
    const personality = calculateScores();
    window.sessionStorage.setItem('personality', JSON.stringify(personality));

    setTimeout(() => {
        window.location.href = 'result.html';
    }, 2000);
}

// Triggers updateButton function to allow for JS/HTML manipulation.
updateButton();