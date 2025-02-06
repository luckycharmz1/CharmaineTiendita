const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer transport (Use your own email provider settings)
const transporter = nodemailer.createTransport({
    service: 'Outlook', // Or use another service like 'gmail' or 'yahoo'
    auth: {
        user: 'your-email@outlook.com',
        pass: 'your-email-password'  // Use App Passwords for security
    }
});

// Define the route for the form submission
app.post('/submit-bid', (req, res) => {
    const { user_name, bid_amount, item_name } = req.body;

    const mailOptions = {
        from: 'your-email@outlook.com',
        to: 'cwashington2011@outlook.com',
        subject: `New Bid: ${item_name}`,
        text: `A new bid has been placed on the item "${item_name}".\n\nBidder Name: ${user_name}\nBid Amount: $${bid_amount}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send('Error sending email: ' + error.message);
        }
        res.redirect('/confirmation.html');
    });
});

// Serve static files (e.g., your HTML pages, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
