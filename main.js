document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const pairCountElement = document.querySelector('.end p:nth-child(1)');
    const flipCountElement = document.querySelector('.end p:nth-child(2)');
    const startButton = document.querySelector('.end button:nth-child(1)');
    const restartButton = document.querySelector('.end button:nth-child(2)');
    
    let firstPick = null;
    let secondPick = null;
    let flips = 0;
    let pairs = 0;
    let isClickable = true;

    // Color pair array for 20 buttons, 10 pairs (2 of each color)
    const colors = [
        'red', 'blue', 'green', 'yellow', 'orange', 
        'purple', 'pink', 'brown', 'cyan', 'lime',
        'red', 'blue', 'green', 'yellow', 'orange', 
        'purple', 'pink', 'brown', 'cyan', 'lime'
    ];

    // Function to shuffle colors
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to initialize the game
    function initializeGame() {
        shuffle(colors);
        buttons.forEach((button, index) => {
            button.style.backgroundColor = '';  // Reset button colors
            button.dataset.color = colors[index];  // Assign a shuffled color
            button.disabled = false;  // Enable all buttons
        });
        firstPick = null;
        secondPick = null;
        flips = 0;
        pairs = 0;
        isClickable = true;
        updateScores();
    }

    // Update pair and flip counts in the UI
    function updateScores() {
        pairCountElement.textContent = `Pairs: ${pairs}`;
        flipCountElement.textContent = `Flips: ${flips}`;
    }

    // Function to handle button click
    function handleButtonClick(event) {
        if (!isClickable) return;  // Prevent clicks when waiting for reveal
        const button = event.target;

        // Prevent the same button from being clicked twice
        if (button === firstPick) return;

        // Reveal button color
        button.style.backgroundColor = button.dataset.color;
        flips++;
        updateScores();

        // If this is the first pick
        if (!firstPick) {
            firstPick = button;
        } else {
            secondPick = button;
            checkMatch();
        }
    }

    // Check if two selected buttons match
    function checkMatch() {
        const isMatch = firstPick.dataset.color === secondPick.dataset.color;

        if (isMatch) {
            pairs++;
            firstPick.disabled = true;
            secondPick.disabled = true;
            resetPicks();
        } else {
            isClickable = false;
            // Hide both buttons after a short delay if no match
            setTimeout(() => {
                firstPick.style.backgroundColor = '';
                secondPick.style.backgroundColor = '';
                resetPicks();
                isClickable = true;
            }, 1000);
        }

        updateScores();
    }

    // Reset selected buttons after a match or mismatch
    function resetPicks() {
        firstPick = null;
        secondPick = null;
    }

    // Event listeners for the buttons
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Event listener for the start button
    startButton.addEventListener('click', initializeGame);

    // Event listener for the restart button
    restartButton.addEventListener('click', initializeGame);

    // Initialize the game when the page loads
    initializeGame();
});