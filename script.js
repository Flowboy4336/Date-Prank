// --- 1. FLOATING HEARTS BACKGROUND ---
const heartsContainer = document.getElementById('hearts-container');
const heartEmojis = ['❤️', '💖', '💘', '💕', '💓'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heart.style.fontSize = Math.random() * 15 + 10 + 'px';
    heartsContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 600); 

// --- 2. STEP NAVIGATION ---
let currentStep = 1;
const totalSteps = 7; // Updated to 7 steps
const progressBar = document.getElementById('progress-bar');

function nextStep(step) {
    // If moving to the final Step 7, send the email
    if (step === 7) {
        sendDataToEmail();
    }

    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    
    // Update progress bar
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = progressPercentage + '%';
}

// --- 3. NAME VALIDATION ---
function validateName() {
    const nameInput = document.getElementById('name-picker').value.trim();
    
    if (!nameInput) {
        alert("Please enter your name so I know who I'm talking to! 😊");
        return;
    }

    // Save the name to the hidden form and the final screen
    document.getElementById('hidden-name').value = nameInput;
    document.getElementById('final-name').innerText = nameInput + " 💖";

    // Move to the next step (The Ask)
    nextStep(2);
}

// --- 4. THE RUNAWAY "NO" BUTTON ---
const noBtn = document.getElementById('no-btn');
function moveNoButton() {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 150 - 75;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); 
    moveNoButton();
});

// --- 5. DATE AND TIME VALIDATION ---
function validateDateTime() {
    const dateInput = document.getElementById('date-picker').value;
    const timeInput = document.getElementById('time-picker').value;
    
    if (!dateInput || !timeInput) {
        alert("Please pick both a date and a time! 📅⏰");
        return;
    }

    document.getElementById('hidden-date').value = dateInput;
    document.getElementById('hidden-time').value = timeInput;
    
    let timeDisplay = timeInput;
    let [hours, minutes] = timeInput.split(':');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    timeDisplay = hours + ':' + minutes + ' ' + ampm;
    
    document.getElementById('final-time').innerText = timeDisplay;

    nextStep(5);
}

// --- 6. FOOD SELECTION & VALIDATION ---
function selectFood(element, foodName) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    document.getElementById('hidden-food').value = foodName;
    
    // Enable the confirm button
    document.getElementById('food-btn').disabled = false;
}

function confirmFood() {
    const selectedFood = document.getElementById('hidden-food').value;
    
    if (!selectedFood) {
        alert("Please select a food or drink option first! 🍕🥤");
        return;
    }
    
    nextStep(6);
}

// --- 7. SEND DATA TO EMAIL IN BACKGROUND ---
function sendDataToEmail() {
    const form = document.getElementById('final-form');
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Email sent successfully!");
    })
    .catch(error => {
        console.log("Error sending email:", error);
    });
}