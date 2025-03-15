let randomNumber;
let attempts;
const maxAttempts = 5; // Maximum number of attempts allowed

// Initialize the game
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number (1-100)
    attempts = 0; // Reset attempts
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("submitButton").disabled = false; // Enable submit button
    document.getElementById("feedback").textContent = "";
    document.getElementById("attempts").textContent = `Attempts left: ${maxAttempts}`;
}

// Check the player's guess
function checkGuess() {
    let guessInput = document.getElementById("guessInput");
    let guess = parseInt(guessInput.value);
    let feedback = document.getElementById("feedback");
    let attemptsText = document.getElementById("attempts");

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = "❌ Please enter a number between 1 and 100!";
        feedback.style.color = "red";
        guessInput.value = ""; // Clear input field
        return;
    }

    attempts++; // Increase attempt count
    let remainingAttempts = maxAttempts - attempts; // Calculate remaining attempts

    if (guess < randomNumber) {
        feedback.textContent = "📉 Too low! Try again.";
        feedback.style.color = "blue";
        guessInput.value = ""; // Clear input field on wrong guess
    } else if (guess > randomNumber) {
        feedback.textContent = "📈 Too high! Try again.";
        feedback.style.color = "blue";
        guessInput.value = ""; // Clear input field on wrong guess
    } else {
        feedback.textContent = `🎉 Correct! You guessed it in ${attempts} attempt${attempts > 1 ? "s" : ""}.`;
        feedback.style.color = "green";

        // Lock input and button after correct guess
        guessInput.disabled = true;
        document.getElementById("submitButton").disabled = true;
    }

    // Check if the player has used all attempts
    if (attempts >= maxAttempts && guess !== randomNumber) {
        feedback.textContent = "😢 You are a loser! The correct number was " + randomNumber + ".";
        feedback.style.color = "red";
        guessInput.disabled = true;
        document.getElementById("submitButton").disabled = true;
    }

    // Update attempts left
    attemptsText.textContent = `Attempts left: ${remainingAttempts > 0 ? remainingAttempts : 0}`;
}

// Restart the game
function resetGame() {
    startGame(); // Restart with a new number
}

// Enable Enter key to submit
document.getElementById("guessInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission (if inside a form)
        checkGuess();
    }
});

// Start the game on page load
window.onload = startGame;
