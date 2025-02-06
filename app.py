from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

# Set the auction end time to February 13th, 2025, 11:59 PM
auction_end_time = datetime(2025, 2, 13, 23, 59, 59)  # Last moment of Feb 13th

# Example products
products = [
    {"id": 1, "name": "Vintage Chair", "starting_price": 10.0, "current_bid": 10.0, "end_time": auction_end_time},
    {"id": 2, "name": "Old Desk Lamp", "starting_price": 5.0, "current_bid": 5.0, "end_time": auction_end_time}
]

@app.route('/')
def index():
    # Calculate time left for each product
    for product in products:
        product["time_left"] = product["end_time"] - datetime.utcnow()
    return render_template('index.html', products=products)

@app.route('/bid/<int:product_id>', methods=['POST'])
def bid(product_id):
    bid_amount = float(request.form.get('bid_amount'))
    product = next((item for item in products if item['id'] == product_id), None)
    
    if product and bid_amount > product["current_bid"]:
        product["current_bid"] = bid_amount  # Update the bid with the highest one
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
