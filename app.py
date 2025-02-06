from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Set the auction end time to February 13th, 2025, 11:59 PM
auction_end_time = datetime(2025, 2, 13, 23, 59, 59)  # Last moment of Feb 13th

# Example products
products = [
    {"id": 1, "name": "Vintage Chair", "starting_price": 10.0, "current_bid": 10.0, "end_time": auction_end_time, "bids": []},
    {"id": 2, "name": "Old Desk Lamp", "starting_price": 5.0, "current_bid": 5.0, "end_time": auction_end_time, "bids": []}
]

# Send Email Notification Function
def send_notification(user_name, product_name, bid_amount):
    # Set up your email server (this example uses Gmail)
    sender_email = "youremail@gmail.com"
    receiver_email = "recipientemail@example.com"  # Your email address
    password = "yourpassword"

    # Create the email content
    subject = f"New Bid on {product_name}"
    body = f"{user_name} placed a bid of ${bid_amount} on {product_name}."

    # Prepare the email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    # Send the email via Gmail SMTP server
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

@app.route('/')
def index():
    # Calculate time left for each product
    for product in products:
        product["time_left"] = product["end_time"] - datetime.utcnow()
    return render_template('index.html', products=products)

@app.route('/bid/<int:product_id>', methods=['POST'])
def bid(product_id):
    user_name = request.form.get('user_name')
    bid_amount = float(request.form.get('bid_amount'))
    product = next((item for item in products if item['id'] == product_id), None)
    
    if product and bid_amount > product["current_bid"]:
        # Update the bid with the highest one
        product["current_bid"] = bid_amount
        # Store the bid along with the user's name
        product["bids"].append({"user_name": user_name, "bid_amount": bid_amount})
        # Send an email notification
        send_notification(user_name, product["name"], bid_amount)
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
