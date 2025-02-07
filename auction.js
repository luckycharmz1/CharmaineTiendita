// Get the target date for all items except iPad (February 14, 2025 at 8:00 PM)
let targetDate = new Date('February 14, 2025 20:00:00').getTime();

// Variables to hold the remaining time for each item
let timeLeftTv = targetDate - new Date().getTime(); 
let timeLeftIpad = 60 * 1 * 1000; // iPad countdown (1 minute) in milliseconds
let timeLeftHeater = targetDate - new Date().getTime();
let timeLeftBlanket = targetDate - new Date().getTime();

// Get countdown elements for each product
let countdownDisplayTv = document.getElementById("countdown-tv");
let countdownDisplayIpad = document.getElementById("countdown-ipad");
let countdownDisplayHeater = document.getElementById("countdown-heater");
let countdownDisplayBlanket = document.getElementById("countdown-blanket");

// Function to start countdown for each item
function startCountdown() {
    // Countdown for TV (until February 14, 2025 at 8:00 PM)
    let countdownIntervalTv = setInterval(function () {
        let days = Math.floor(timeLeftTv / (1000 * 60 * 60 * 24)); // Calculate days
        let hours = Math.floor((timeLeftTv % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
        let minutes = Math.floor((timeLeftTv % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
        let seconds = Math.floor((timeLeftTv % (1000 * 60)) / 1000); // Calculate seconds

        countdownDisplayTv.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeftTv <= 0) {
            clearInterval(countdownIntervalTv);
            countdownDisplayTv.innerHTML = "Auction Ended!";
            alert("Auction ended for Television!");
        }

        timeLeftTv -= 1000; // Decrease by 1 second
    }, 1000);

    // Countdown for iPad (fixed 1 minute countdown)
    let countdownIntervalIpad = setInterval(function () {
        let minutes = Math.floor(timeLeftIpad / 60000); // Convert ms to minutes
        let seconds = Math.floor((timeLeftIpad % 60000) / 1000); // Get remaining seconds
        countdownDisplayIpad.innerHTML = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

        if (timeLeftIpad <= 0) {
            clearInterval(countdownIntervalIpad);
            countdownDisplayIpad.innerHTML = "Auction Ended!";
            alert("Auction ended for iPad!");
        }

        timeLeftIpad -= 1000; // Decrease by 1 second
    }, 1000);

    // Countdown for Heater (until February 14, 2025 at 8:00 PM)
    let countdownIntervalHeater = setInterval(function () {
        let days = Math.floor(timeLeftHeater / (1000 * 60 * 60 * 24)); // Calculate days
        let hours = Math.floor((timeLeftHeater % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
        let minutes = Math.floor((timeLeftHeater % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
        let seconds = Math.floor((timeLeftHeater % (1000 * 60)) / 1000); // Calculate seconds

        countdownDisplayHeater.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeftHeater <= 0) {
            clearInterval(countdownIntervalHeater);
            countdownDisplayHeater.innerHTML = "Auction Ended!";
            alert("Auction ended for Heater!");
        }

        timeLeftHeater -= 1000; // Decrease by 1 second
    }, 1000);

    // Countdown for Blanket (until February 14, 2025 at 8:00 PM)
    let countdownIntervalBlanket = setInterval(function () {
        let days = Math.floor(timeLeftBlanket / (1000 * 60 * 60 * 24)); // Calculate days
        let hours = Math.floor((timeLeftBlanket % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
        let minutes = Math.floor((timeLeftBlanket % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
        let seconds = Math.floor((timeLeftBlanket % (1000 * 60)) / 1000); // Calculate seconds

        countdownDisplayBlanket.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeftBlanket <= 0) {
            clearInterval(countdownIntervalBlanket);
            countdownDisplayBlanket.innerHTML = "Auction Ended!";
            alert("Auction ended for Heated Blanket!");
        }

        timeLeftBlanket -= 1000; // Decrease by 1 second
    }, 1000);
}

// Ensure countdown starts once the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    startCountdown(); // This ensures that the countdown starts once the page is loaded
});

// Place bid functionality for each item
function placeBid(item) {
    let currentBidElement = document.getElementById(`current-bid-${item}`);
    let currentBid = parseInt(currentBidElement.getElementsByTagName('span')[0].innerText);
    let bidAmount = parseInt(document.getElementById(`bid-amount-${item}`).value);
    let userName = document.querySelector(`#bid-form-${item} input[name="user_name"]`).value;

    console.log(`Placing bid for ${item}`);
    console.log(`Current bid: ${currentBid}, User's bid: ${bidAmount}, User's name: ${userName}`);

    if (bidAmount > currentBid && userName !== '') {
        console.log('Bid is valid, updating bid...');

        // Update the bid on the page
        currentBidElement.getElementsByTagName('span')[0].innerText = bidAmount;

        // Send the bid information using fetch (backend should handle '/submit-bid')
        const templateParams = {
            user_name: userName,
            bid_amount: bidAmount,
            item_name: item
        };

        // Send the bid data to the backend using fetch
        fetch('/submit-bid', {
            method: 'POST',
            body: JSON.stringify(templateParams),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Bid placed successfully', data);
            alert('Bid placed successfully!');
        })
        .catch(error => {
            console.error('Error placing bid:', error);
            alert("Error placing your bid. Please try again.");
        });
    } else if (bidAmount <= currentBid) {
        console.log('Bid amount is too low');
        alert("Your bid must be higher than the current bid.");
    } else if (userName === '') {
        console.log('No user name entered');
        alert("Please enter your name before bidding.");
    }
}
