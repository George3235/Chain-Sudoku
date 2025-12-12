import clingo 


# solver_file_path = "../ASP/strimko.lp"

# ctl = clingo.Control()

# ctl.load(instance_file_path)
# ctl.load(solver_file_path)


# def add(self, program: str) -> None:

# ctl.ground()

# print(ctl.solve(on_model=print))


# Sudoku Class that handles a sudoku instance
class SudokuClass:
    # Constructor, loads instance based on difficulty (easy/medium/hard)
    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.chain_grid, self.initial_grid = self.load_instance(difficulty)
        self.current_grid = [row[:] for row in self.initial_grid]
        
    # Loads sudoku instance from appropriate file
    def load_instance(self, difficulty:str):
        instance_file_path = f"../ASP/instances/sudoku_{difficulty}_instance.lp"
        grid = [[0 for col in range(9)] for row in range(9)]
        chain_grid = [[0 for col in range(9)] for row in range(9)]

        with open(instance_file_path, 'r') as file:
            for line in file:
                if line.strip().startswith("cell"):
                    coordinates = line[5:12]
                    row         = int(coordinates[0])
                    col         = int(coordinates[2])
                    chain_id    = int(coordinates[4])
                    val         = int(coordinates[6])

                    grid[row][col] = val
                    chain_grid[row][col] = chain_id
        return chain_grid, grid
    
    # Prints the grid (chain or value)
    def print_grid(self, grid_type:str):
        if grid_type == "chain":
            grid = self.chain_grid
        elif grid_type == "value":
            grid = self.current_grid
        elif grid_type == "initvalue":
            grid = self.initial_grid

        for row in grid:
            print(row)
    
    # User input from frontend, adds number to current grid
    def add_number(self, row:int, col:int, number:int):
        # Cannot modify the hardcoded values
        solve_grid = self.solve_sudoku(temp=True)

        if solve_grid[row][col] == number:
            return True
        else:
            return False



    # Removes number from current grid (only if not part of initial grid)
    def remove_number(self, row, col):
        if self.initial_grid[row][col] != 0:
            return False  # Cannot remove clues
        self.current_grid[row][col] = 0
        return True

    # Solves the instance using ASP solver
    # temp is a variable that indicate that it was hint function that is using the function
    def solve_sudoku(self, temp = False):

        # create a clingo control object
        ctl = clingo.Control()

        # load the ASP rules
        ctl.load("../ASP/strimko.lp")

        # convert current grid to facts for clingo to use
        for row in range(9):
            for col in range(9):
                    chain_id = self.chain_grid[row][col]
                    val = self.current_grid[row][col]
                    ctl.add("base", [], f"cell({row},{col},{chain_id},{val}).")

        ctl.ground([("base", [])])
        
        solution_found = False
        solved_grid = [[0 for _ in range(9)] for _ in range(9)]

        def model(model):
            nonlocal solved_grid, solution_found
            solution_found = True

            for atom in model.symbols(shown=True):
                if atom.name == "filled":
                    args = atom.arguments
                    row = args[0].number
                    col = args[1].number
                    # chain_id = args[2].number
                    val = args[3].number
                    solved_grid[row][col] = val
        
        ctl.solve(on_model=model)
        if not temp: 

            if not solution_found:
                return False

            self.current_grid = [row[:] for row in solved_grid]
            return True
        
        return solved_grid
    
    # Gives a hint to the user, using ASP
    # Input: row, column, difficulty
    # Output: value in the given position
    # Måste kolla att det inte är init value där 
    def give_hint(self, row: int, column: int):

        # Check if the cell is already an hint cell 
        if self.initial_grid[row][column] != 0:
            return False
        # Hämtar den rätta lösningen för hela griden
        solved = self.solve_sudoku(True)
        # If the value inside that cell is already correct
        if self.current_grid[row][column] == solved[row][column]:
            return False
        # Anger det värdet som användaren är ute efter
        val = solved[row][column]
        return val

    
    # Validates current grid, if its a correct solution
    def validate_solution(self):
        for row in self.current_grid:
            for cell in row:
                if cell == 0:
                    return False
        
        # create a clingo control object
        ctl = clingo.Control()

        # load the ASP rules
        ctl.load("../ASP/strimko.lp")

        for row in range(9):
            for col in range(9):
                chain_id = self.chain_grid[row][col]
                val = self.current_grid[row][col]
                ctl.add("base", [], f"cell({row},{col},{chain_id},{val}).")

        ctl.ground([("base", [])])

        result = ctl.solve()

        if result.satisfiable:
            return True
        else:
            return False
        




# Chose difficulty
# difficulty = input("easy, medium, hard ? ")
# sudoku = SudokuClass(difficulty)

# # row_input = int(input("Which row"))
# # column_input = int(input("Which column"))
# # hint = sudoku.give_hint(row_input,column_input)
# # print(f"The hint in row: {row_input} and column: {column_input} is the value {hint}")

# # Testar beccas kod validate_solution & solve_sudoku

# # print("Initial grid:")
# # sudoku.print_grid("value")

# # # Testa validera på en olöst instans
# # print("\n###Test 1 validering på olöst instans, ska returnera false###")
# # resultat = sudoku.validate_solution()
# # print(f"Ofullständig grid validering: {resultat} (ska vara false)")

# # # Testa validera på en för hoppningsvis löst grid
# # print("\n###Test 2 validering på löst instans, ska returnera true###")
# # if sudoku.solve_sudoku():
# #     print("Grid löst:")
# #     sudoku.print_grid("value")
# #     resultat = sudoku.validate_solution()
# #     print(f"Löst grid validering: {resultat} (ska vara true)")





# ##### Testa att spela spelet i terminalen #####
# print("Initial grid:")
# sudoku.print_grid("value")

# while True:
#     print("\n")
#     # User input
#     user_input = input("R,C: ").split(",") # Förväntad input är format: 0,0
#     row_input = int(user_input[0])
#     column_input = int(user_input[1])
#     # Get hint value
#     value_input = sudoku.give_hint(row_input, column_input)

#     # add number to grid
#     sudoku.add_number(row_input, column_input, value_input)

#     # Check if solved
#     if sudoku.validate_solution():
#         print("Congratulations, you solved the puzzle!")
#         sudoku.print_grid("value")
#         break

#     # Print current grid and continue
#     sudoku.print_grid("value")