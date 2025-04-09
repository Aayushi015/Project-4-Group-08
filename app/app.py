from flask import Flask, render_template, redirect, request, jsonify
from modelHelper import ModelHelper

# Create an instance of Flask
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

modelHelper = ModelHelper()

# Route to render index.html template using data from Mongo
@app.route("/prediction")
def prediction():
    # Return template and data
    return render_template("index.html")

@app.route("/")
def home():
    # Return template and data
    return render_template("landing.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/tableau")
def tableau():
    # Return template and data
    return render_template("tableau.html")

@app.route("/tableau2")
def tableau2():
    # Return template and data
    return render_template("tableau2.html")

@app.route("/sources")
def sources():
    # Return template and data
    return render_template("sources.html")

@app.route("/report")
def report():
    # Return template and data
    return render_template("report.html")

# HTML ROUTES - MODEL
@app.route("/model")
def model():
    return render_template("index.html")

# // Note: App.py receives the payload from logic.js, then extract and parse and fix the data types of values to payload and send the infomation to model Helper. 
# //../Our model Helper class we built and tested it in Jupyter Notebook with a function makePrediction that bring in all unique values to a data frame
# // .. opens up the model, makes the inference, and return the inference back to the user.

@app.route("/makePredictions", methods=["POST"])
def make_predictions():
    content = request.json["data"]
    print(content)

    # parse
    amount_usd = float(content["amount_usd"])
    transaction_type = content["transaction_type"]
    industry = content["industry"]
    reported_by_authority = bool(content["reported_by_authority"])
    risk_score = int(content["risk_score"])
    shell_co_involved = int(content["shell_co_involved"])

    # Sending the infomation to model Helper, which again they read in up at the top
    preds = modelHelper.make_predictions(amount_usd, transaction_type, industry, reported_by_authority, risk_score, shell_co_involved)

    # Modify this part to return a custom message along with the prediction result
    message = f"Prediction complete!"

    # We get the inference and send it back to the front end (JavaScripts (logic.js)
    # Return the modified message along with prediction in JSON format
    return jsonify({"ok": True, "message": message, "prediction": str(preds)})


#############################################################

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)
