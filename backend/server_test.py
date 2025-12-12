from flask import Flask, request
from sudoku import SudokuClass
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/move", methods=["POST"])
def hello_world():

    row = request.args.get('row', '')
    col = request.args.get('col', '')
    val = request.args.get('value', '')



    print("Received move - Row:", row, "Col:", col, "Value:", val)
    return "Move received", 200


# Fungerar
@app.route("/give_hint", methods=["POST"])
def give_hint():
    row = int(request.args.get('row', ''))
    col = int(request.args.get('col', ''))
    dif = request.args.get('dif', '')

    sudoku_class = SudokuClass(dif)
    value = sudoku_class.give_hint(row,col)
    # Om siffran är init siffra
    # Return 0
    if value == 0:
        return f"0", 200
    
    return f"{value}", 200


# Fungerar
@app.route("/add_number", methods=["POST"])
def add_number():
    row = int(request.args.get('row', ''))
    col = int(request.args.get('col', ''))
    val = int(request.args.get('value', ''))

    dif = request.args.get('dif', '')

    sudoku_class = SudokuClass(dif)
    flag = sudoku_class.add_number(row,col,val)

    if flag:
        return "True", 200
    else:
        return "False", 200

# Fungerar
@app.route("/remove_number", methods=["POST"])
def remove_number():
    row = int(request.args.get('row', ''))
    col = int(request.args.get('col', ''))

    dif = request.args.get('dif', '')

    sudoku_class = SudokuClass(dif)
    flag = sudoku_class.remove_number(row,col)

    if flag:
        return "True", 200
    else:
        return "False", 200
    


if __name__ == "__main__":
    app.run(debug=True)

