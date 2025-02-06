// Countdown Timer
let timeLeft = 60; // 60 seconds for demo, adjust as needed
let countdownDisplay = document.getElementById("countdown");

function startCountdown() {
    let countdownInterval = setInterval(function () {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        countdownDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("Auction ended!");
        }

        timeLeft--;
    }, 1000);
}

startCountdown();

// Place bid functionality
function placeBid() {
    let currentBid = parseInt(document.getElementById('current-bid').getElementsByTagName('span')[0].innerText);
    let bidAmount = parseInt(document.getElementById('bid-amount').value);

    if (bidAmount > currentBid) {
        alert("Bid placed successfully!");
        document.getElementById('current-bid').getElementsByTagName('span')[0].innerText = bidAmount;
    } else {
        alert("Your bid must be higher than the current bid.");
    }
}
