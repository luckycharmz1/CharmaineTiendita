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

        // Assuming you're handling sending bid info to the server using fetch
        fetch('/submit-bid', {
            method: 'POST',
            body: JSON.stringify(templateParams),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Bid placed successfully');
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
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
