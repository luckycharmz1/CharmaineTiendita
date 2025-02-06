from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

# Dummy data for product (you can store this in a database)
products = {
    "1": {
        "name": "Vintage Watch",
        "description": "A rare, vintage watch.",
        "current_bid": 50,
        "time_left": 60  # 60 seconds for demo, adjust as needed
    }
}

@app.route('/')
def index():
    product = products["1"]
    return render_template("index.html", product=product)

@app.route('/place_bid', methods=["POST"])
def place_bid():
    product_id = request.json.get('product_id')
    bid = int(request.json.get('bid'))

    product = products.get(str(product_id))
    if bid > product["current_bid"]:
        product["current_bid"] = bid
        return jsonify({"status": "success", "new_bid": bid}), 200
    else:
        return jsonify({"status": "error", "message": "Bid must be higher than current bid."}), 400

if __name__ == '__main__':
    app.run(debug=True)
