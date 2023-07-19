const affirmations = [
    'Strong',
    'Independent',
    'Creative',
    'Playful',
    'Amazing',
    'Cute',
    'Lovely',
    'Possessive ;)',
    'Authentic',
    '“The” Sweetest Girlfriend :)',
];
let affirmationIndex = 0;

function updateAffirmation() {
    const dynamicText = document.getElementById('affirmative-phrase');
    dynamicText.textContent = affirmations[affirmationIndex];    
    
    dynamicText.className = '';  // clear previous effects before the next affirmation comes.
    if (affirmationIndex === affirmations.indexOf('Strong')) {  
        dynamicText.classList.add('aff-strong');
    } 
    else if (affirmationIndex === affirmations.indexOf('Independent')) {  
        dynamicText.classList.add('aff-independent');
    } 
    else if (affirmationIndex === affirmations.indexOf('Creative')) { 
        dynamicText.classList.add('aff-creative');
    }
    else if (affirmationIndex === affirmations.indexOf('Playful')) {  
        dynamicText.classList.add('aff-playful');
        dynamicText.classList.add('aff-playful-confetti');
    } 
    else if (affirmationIndex === affirmations.indexOf('Amazing')) {  
        dynamicText.classList.add('aff-amazing');
    } 
    else if (affirmationIndex === affirmations.indexOf('Cute')) {  
        dynamicText.classList.add('aff-cute');
    }
    else if (affirmationIndex === affirmations.indexOf('Lovely')) {  
        spawnImages()
    }
    else if (affirmationIndex === affirmations.indexOf('Possessive ;)')) {  
        
    } 
    else if (affirmationIndex === affirmations.indexOf('Authentic')) {
        document.getElementById('main-text-container').style.display = 'none';
        document.getElementById('three-in-one').style.display = 'block';
    }
    else if (affirmationIndex === affirmations.indexOf('“The” Sweetest Girlfriend :)')) {
        document.getElementById('three-in-one').style.display = 'none';
        document.getElementById('Final').style.display = 'block';
    }

    // Update the index
    affirmationIndex++;
}

function handleClick() {
    if (affirmationIndex < affirmations.length) {
        updateAffirmation();
    }
}
const imagePaths = [
    'assets/face-blowing-a-kiss.png',
    'assets/red-heart.png',
    'assets/smiling-cat-with-heart-eyes.png',
    'assets/smiling-face-with-heart-eyes.png',
    'assets/smiling-face-with-hearts.png',
];

// Function to generate a random number between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to animate the images and make them explode in all directions
function explodeImages(images) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxDistance = Math.max(centerX, centerY);

    images.forEach((img) => {
        const angle = getRandom(0, 2 * Math.PI);
        const distance = getRandom(50, maxDistance);

        const translateX = distance * Math.cos(angle);
        const translateY = distance * Math.sin(angle);

        const animationDuration = getRandom(1, 3); // Randomize animation duration

        img.style.transition = `transform ${animationDuration}s ease-out`;
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
    });
}

// Function to spawn and animate images when the condition is true
function spawnImages() {
    const centerDiv = document.createElement('div');
    centerDiv.style.position = 'absolute';
    centerDiv.style.top = '50%';
    centerDiv.style.left = '50%';
    centerDiv.style.transform = 'translate(-50%, -50%)';

    const imagesToSpawn = 50;
    const spawnedImages = [];

    for (let i = 0; i < imagesToSpawn; i++) {
        const imgPath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const img = new Image();
        img.src = imgPath;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        centerDiv.appendChild(img);
        spawnedImages.push(img);
    }

    document.body.appendChild(centerDiv);

    // Wait for the images to be appended before animating them
    setTimeout(() => {
        explodeImages(spawnedImages);
    }, 100);
}

// Call the function initially to display the first greeting
updateAffirmation();

// Add event listener for mouse click on the window
window.addEventListener('click', handleClick);