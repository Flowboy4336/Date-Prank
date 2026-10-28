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
const totalSteps = 6;
const progressBar = document.getElementById('progress-bar');

function nextStep(step) {
    if (step === 6) {
        sendDataToEmail();
    }

    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = progressPercentage + '%';
}

// --- 3. THE RUNAWAY "NO" BUTTON ---
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

// --- 4. DATE AND TIME VALIDATION ---
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

    nextStep(4);
}

// --- 5. FOOD SELECTION & VALIDATION ---
function selectFood(element, foodName) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    document.getElementById('hidden-food').value = foodName;
    
    // THIS IS THE MAGIC: It enables the button when they click
    document.getElementById('food-btn').disabled = false;
}

function confirmFood() {
    const selectedFood = document.getElementById('hidden-food').value;
    
    // Backup check just in case
    if (!selectedFood) {
        alert("Please select a food or drink option first! 🍕🥤");
        return;
    }
    
    nextStep(5);
}

// --- 6. SEND DATA TO EMAIL IN BACKGROUND ---
function sendDataToEmail() {
    const form = document.getElementById('final-form');
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("Email sent successfully to yumarfaruq81@gmail.com!");
    })
    .catch(error => {
        console.log("Error sending email:", error);
    });
}