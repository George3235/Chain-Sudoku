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
        self.chain_grid, self.intial_grid = self.load_instance(difficulty)
        self.current_grid = [row[:] for row in self.intial_grid]
        
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
        else:
            grid = self.intial_grid
        
        for row in grid:
            print(row)
    
    # User input from frontend, adds number to current grid
    def add_number(self):
        pass

    # Removes number from current grid
    def remove_number(self):
        pass

    # Solves the instance using ASP solver
    def solve_sudoku(self):

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

        if not solution_found:
            return False

        self.current_grid = [row[:] for row in solved_grid]
        return True

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
        
    # Gives a hint to the user, using ASP
    def give_hint(self):
        pass





# Chose difficulty
difficulty = input("easy, medium, hard ? ")
sudoku = SudokuClass(difficulty)


print("Value grid:")
sudoku.print_grid("value")

print("\n")

print("chain grid:")
sudoku.print_grid("chain")










