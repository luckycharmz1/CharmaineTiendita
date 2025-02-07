// Countdown Timer for both items
const endDateIpad = new Date();
endDateIpad.setSeconds(endDateIpad.getSeconds() + 60); // Set iPad to expire in 60 seconds

// Set the end date for the other items (TV, Heater, Blanket) to February 14th, 2025 at 7:00 PM
const endDateOtherItems = new Date('2025-02-14T19:00:00'); // February 14th at 7:00 PM

let countdownDisplayTv = document.getElementById("countdown-tv");
let countdownDisplayIpad = document.getElementById("countdown-ipad");
let countdownDisplayHeater = document.getElementById("countdown-heater");
let countdownDisplayBlanket = document.getElementById("countdown-blanket");

// Function to format the time left
function formatTimeLeft(timeLeft) {
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Countdown function to handle all items
function startCountdown() {
    // Countdown for iPad (60 seconds)
    let countdownIntervalIpad = setInterval(function () {
        let timeLeftIpad = endDateIpad - new Date();

        if (timeLeftIpad <= 0) {
            clearInterval(countdownIntervalIpad);
            countdownDisplayIpad.innerHTML = "Auction ended for iPad!";
            alert("Auction ended for iPad!");
        } else {
            countdownDisplayIpad.innerHTML = formatTimeLeft(timeLeftIpad);
        }
    }, 1000);

    // Countdown for TV, Heater, and Blanket (ends on February 14th, 2025 at 7:00 PM)
    let countdownIntervalOtherItems = setInterval(function () {
        let timeLeftOtherItems = endDateOtherItems - new Date();

        if (timeLeftOtherItems <= 0) {
            clearInterval(countdownIntervalOtherItems);
            countdownDisplayTv.innerHTML = countdownDisplayHeater.innerHTML = countdownDisplayBlanket.innerHTML = "Auction ended!";
            alert("Auction ended for TV, Heater, and Blanket!");
        } else {
            countdownDisplayTv.innerHTML = formatTimeLeft(timeLeftOtherItems);
            countdownDisplayHeater.innerHTML = formatTimeLeft(timeLeftOtherItems);
            countdownDisplayBlanket.innerHTML = formatTimeLeft(timeLeftOtherItems);
        }
    }, 1000);
}

startCountdown();

// Place bid functionality for each item
function placeBid(item) {
    let currentBidElement = document.getElementById(`current-bid-${item}`);
    let currentBid = parseInt(currentBidElement.getElementsByTagName('span')[0].innerText);
    let bidAmount = parseInt(document.getElementById(`bid-amount-${item}`).value);
    let userName = document.querySelector(`#bid-form-${item} input[name="user_name"]`).value;

    if (bidAmount > currentBid && userName !== '') {
        // Update the bid on the page
        currentBidElement.getElementsByTagName('span')[0].innerText = bidAmount;

        // Send the bid information using the backend (adjust server-side for this action)
        const templateParams = {
            user_name: userName,
            bid_amount: bidAmount,
            item_name: item
        };

        // Assuming you're handling sending bid info to the server using fetch or XMLHttpRequest
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
        alert("Your bid must be higher than the current bid.");
    } else if (userName === '') {
        alert("Please enter your name before bidding.");
    }
}
