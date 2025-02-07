const { time } = require("console");

// Countdown Timer for both items
let timeLeftTv = 60; // 60 seconds for demo, adjust as needed
let timeLeftIpad = 60;

let countdownDisplayTv = document.getElementById("countdown-tv");
let countdownDisplayIpad = document.getElementById("countdown-ipad");

function startCountdown() {
    let countdownIntervalTv = setInterval(function () {
        let days = Math.floor(timeLeftTv / 7)
        let minutes = Math.floor(timeLeftTv / 60);
        let seconds = timeLeftTv % 60;

        countdownDisplayTv.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeftTv <= 0) {
            clearInterval(countdownIntervalTv);
            alert("Auction ended for Television!");
        }

        timeLeftTv--;
    }, 1000);

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
