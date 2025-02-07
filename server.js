const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

let bids = {
    tv: 0,
    ipad: 0,
    heater: 0,
    blanket: 0
};

// Endpoint to submit a bid
app.post('/submit-bid', (req, res) => {
    const { user_name, bid_amount, item_name } = req.body;

    if (bids[item_name] < bid_amount) {
        bids[item_name] = bid_amount;
        console.log(`New bid for ${item_name}: ${bid_amount} by ${user_name}`);
        res.json({ message: 'Bid placed successfully', bid_amount: bid_amount });
    } else {
        res.status(400).json({ message: 'Bid amount is too low' });
    }
});

// Serve static files (your front-end HTML, CSS, and JS from 'static' folder)
app.use(express.static('static'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
