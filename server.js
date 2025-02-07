const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Nodemailer setup for email notifications
const transporter = nodemailer.createTransport({
    service: 'Outlook', // Use your mail service
    auth: {
        user: 'your-email@outlook.com',
        pass: 'your-email-password'
    }
});

// Endpoint for placing bids
app.post('/submit-bid', (req, res) => {
    const { user_name, bid_amount, item_name } = req.body;

    const mailOptions = {
        from: 'your-email@outlook.com',
        to: 'cwashington2011@outlook.com',
        subject: `New Bid on ${item_name}`,
        text: `A new bid has been placed on the item "${item_name}".\n\nBidder Name: ${user_name}\nBid Amount: $${bid_amount}`
    };

    // Send the bid email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.status(200).send({ message: 'Bid placed successfully' });
    });
});

// Serve static files (CSS, JS, images)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
