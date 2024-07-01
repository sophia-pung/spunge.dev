document.addEventListener('DOMContentLoaded', function() {
    const frames = [
        'images/IMG_5274.PNG', 'images/IMG_5275.PNG', 'images/IMG_5276.PNG', 
        'images/IMG_5277.PNG', 'images/IMG_5278.PNG', 'images/IMG_5279.PNG', 
        'images/IMG_5280.PNG', 'images/IMG_5281.PNG', 'images/IMG_5282.PNG', 
        'images/IMG_5283.PNG', 'images/IMG_5284.PNG', 'images/IMG_5285.PNG', 
        'images/IMG_5286.PNG', 'images/IMG_5287.PNG'
    ];
    let currentFrame = 0;
    const animationFrame = document.getElementById('animationFrame');

    function animate() {
        if (currentFrame < frames.length) {
            animationFrame.src = frames[currentFrame];
            currentFrame++;
        } else {
            currentFrame = 0; // Reset to the first frame
        }
        setTimeout(animate, 500); 
    }

    animate();
});

document.getElementById('yes').addEventListener('click', function() {
    // Remove existing content
    document.body.innerHTML = '';

    // Create a new div for the message
    const newMessageDiv = document.createElement('div');
    newMessageDiv.textContent = 'good choice :) ily <3';
    newMessageDiv.style.cssText = `
        color: white;
        font-family: 'Courier New', monospace;
        text-align: center;
        font-size: 2em; /* Adjust as needed */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

    // Style the body for the new message
    document.body.style.cssText = `
        background-color: black;
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Append the new message to the body
    document.body.appendChild(newMessageDiv);
});

document.getElementById('yes').addEventListener('mousedown', function() {
    this.style.boxShadow = '0 2px #666';
    this.style.transform = 'translateY(2px)';
  });
  
  document.getElementById('yes').addEventListener('mouseup', function() {
    this.style.boxShadow = '0 4px #999';
    this.style.transform = 'translateY(0)';
  });
  
  document.getElementById('no').addEventListener('mousedown', function() {
    this.style.boxShadow = '0 2px #666';
    this.style.transform = 'translateY(2px)';
  });
  
  document.getElementById('no').addEventListener('mouseup', function() {
    this.style.boxShadow = '0 4px #999';
    this.style.transform = 'translateY(0)';
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const message = "Alo, want to adventure down this mountain (of love xD) together? Wanna be my boyfriend?";
    const words = message.split(" ");
    let currentWordIndex = 0;
    const messageDiv = document.getElementById('message');

    function typeWord() {
        if (currentWordIndex < words.length) {
            messageDiv.textContent += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
            currentWordIndex++;
            setTimeout(typeWord, 500); // Adjust time as needed for typing speed
        }
    }

    typeWord();
});

document.getElementById('no').addEventListener('mouseover', function() {
    // Define the possible movements: up, down, left, right
    const movements = ['up', 'down', 'left', 'right'];
    const selectedMovement = movements[Math.floor(Math.random() * movements.length)];

    // Calculate new position based on selected movement
    switch (selectedMovement) {
        case 'up':
            this.style.top = '25%';
            break;
        case 'down':
            this.style.top = '75%';
            break;
        case 'left':
            this.style.left = '25%';
            break;
        case 'right':
            this.style.left = '75%';
            break;
    }

    // Adjust the transform to keep the button centered at its position
    this.style.transform = 'translate(-50%, -50%)';
});
