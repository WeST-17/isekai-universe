// Get the button element
const shareButton = document.querySelector('.share');

// Get personality for sessionStorage
const storedPersonality = JSON.parse(window.sessionStorage.getItem('personality'));

let randomNum = Math.floor(Math.random()*3 + 1);
if (storedPersonality === 'NPC' || storedPersonality === 'Hero') {
    randomNum = Math.floor(Math.random()*4 + 1);
}

// Set img url need isekai universe text
const imgUrl = `/isekai-universe/images/${storedPersonality}/${randomNum}.png`;
const imgElement = document.querySelector('img');
imgElement.src = imgUrl;

// Define the share function
function share() {
    const url = 'https://west-17.github.io/isekai-universe';
    const popup = document.querySelector('.popup');

    // Use the Clipboard API to copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(function() {
        popup.classList.add('pop');
        setTimeout(() => {
            popup.classList.remove('pop');
        }, 2000);
    }, function() {
        alert('Failed to copy, try again');
    });
}

// Add event listener to the button
shareButton.addEventListener('click', share);
