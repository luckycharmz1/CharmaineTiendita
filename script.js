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
function placeBid(item) {
    let currentBid = parseInt(document.getElementById('current-bid').getElementsByTagName('span')[0].innerText);
    let bidAmount = parseInt(document.getElementById('bid-amount').value);
    let userName = document.querySelector('input[name="user_name"]').value;

    if (bidAmount > currentBid && userName !== '') {
        // Update the bid on the page
        document.getElementById('current-bid').getElementsByTagName('span')[0].innerText = bidAmount;

        // Send the bid information using EmailJS
        const templateParams = {
            user_name: userName,
            bid_amount: bidAmount,
            item_name: item
        };

        // Replace with your EmailJS service details
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
            .then((response) => {
                console.log('Email sent successfully', response);
                // Redirect to the confirmation page with the bid details
                window.location.href = `confirmation.html?item=${item}&name=${userName}&bid=${bidAmount}`;
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert("Error sending your bid. Please try again.");
            });
    } else if (bidAmount <= currentBid) {
        alert("Your bid must be higher than the current bid.");
    } else if (userName === '') {
        alert("Please enter your name before bidding.");
    }
}
