from flask import Flask, request

app = Flask(__name__)

@app.route("/move", methods=["POST"])
def hello_world():

    row = request.args.get('row', '')
    col = request.args.get('col', '')
    val = request.args.get('value', '')

    print("Received move - Row:", row, "Col:", col, "Value:", val)
    return "Move received", 200