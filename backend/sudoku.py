# import clingo 


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

    def solve_sudoku(self):
        pass

    def validate_solution(self):
        pass

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










