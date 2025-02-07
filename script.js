const { time } = require("console");

// Countdown Timer for both items (Modified for specific end times)
let timeLeftTv = 60; // 60 seconds for demo, adjust as needed for fallback
let timeLeftIpad = 60;

let countdownDisplayTv = document.getElementById("countdown-tv");
let countdownDisplayIpad = document.getElementById("countdown-ipad");

// Set the end date for TV auction to be February 14th, 2025, 7:00 PM
const endDateTv = new Date("February 14, 2025 19:00:00");  // TV auction ends on February 14th at 7:00 PM

function startCountdown() {
    // Countdown for the TV Auction (Set to specific end date)
    let countdownIntervalTv = setInterval(function () {
        const now = new Date();
        const timeLeftTv = endDateTv - now;  // Calculate remaining time

        if (timeLeftTv <= 0) {
            clearInterval(countdownIntervalTv);
            countdownDisplayTv.innerHTML = "Auction Ended!";
            alert("Auction ended for Television!");
        } else {
            const minutes = Math.floor((timeLeftTv % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeftTv % (1000 * 60)) / 1000);
            countdownDisplayTv.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);

    // Countdown for the iPad Auction (fallback logic, adjust as necessary)
    let countdownIntervalIpad = setInterval(function () {
        let minutes = Math.floor(timeLeftIpad / 60);
        let seconds = timeLeftIpad % 60;

        countdownDisplayIpad.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeftIpad <= 0) {
            clearInterval(countdownIntervalIpad);
            alert("Auction ended for iPad!");
        }

        timeLeftIpad--;
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
