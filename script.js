// --- 1. FLOATING HEARTS BACKGROUND ---
const heartsContainer = document.getElementById('hearts-container');
const heartEmojis = ['❤️', '💖', '💘', '💕', '💓'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heart.style.fontSize = Math.random() * 15 + 10 + 'px'; // Smaller for mobile
    heartsContainer.appendChild(heart);
    
    setTimeout(() => { heart.remove(); }, 8000);
}
// Slower interval so it doesn't lag mobile phones
setInterval(createHeart, 600); 

// --- 2. STEP NAVIGATION ---
let currentStep = 1;
const totalSteps = 6;
const progressBar = document.getElementById('progress-bar');

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    
    // Update progress bar
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
    e.preventDefault(); // Prevents phone from registering the tap
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

    // Save to hidden form fields for the email
    document.getElementById('hidden-date').value = dateInput;
    document.getElementById('hidden-time').value = timeInput;
    
    // Update the text in Step 5
    document.getElementById('final-time').innerText = timeInput;

    nextStep(4);
}

// --- 5. FOOD SELECTION ---
let selectedFood = "";

function selectFood(element, foodName) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    selectedFood = foodName;
    
    document.getElementById('food-btn').disabled = false;
    document.getElementById('hidden-food').value = foodName;
}

// --- 6. HANDLE THE FINAL SUBMIT ---
document.getElementById('final-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const form = this;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.innerText = "Processing Payment... 💸";
    submitBtn.disabled = true;

    // Send data to FormSubmit silently
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Show the final prank alert
        alert("APRIL FOOLS! 😂😂\n\nI'm not actually charging you $499. You just got pranked!\n\n(Screenshot this and send it to me!)");
        submitBtn.innerText = "pay $499 & confirm →";
        submitBtn.disabled = false;
    })
    .catch(error => {
        alert("Error sending data, but the joke is still on you 😂");
        submitBtn.innerText = "pay $499 & confirm →";
        submitBtn.disabled = false;
    });
});