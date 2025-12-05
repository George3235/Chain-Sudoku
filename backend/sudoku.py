from clingo import Control

def asp_solve(instance_file="../ASP/instances/sudoku_easy_instance.lp", rules_file="../ASP/strimko.lp"):
    ctl = Control()
    ctl.load(rules_file)
    ctl.load(instance_file)
    ctl.ground([("base", [])])

    model_result = None

    def on_model(model):
        nonlocal model_result
        model_result = model.symbols(shown=True)

    ctl.solve(on_model=on_model)
    return model_result


def extract_solution(symbols):
    """
    Convert filled(R,C,CH,V) atoms into a 9x9 Python matrix.
    """
    grid = [[0 for _ in range(9)] for _ in range(9)]
    for sym in symbols:
        if sym.name == "filled":
            r = sym.arguments[0].number
            c = sym.arguments[1].number
            v = sym.arguments[3].number
            grid[r][c] = v
    return grid


def print_grid_simple(grid):
    for r in range(9):
        print(" ".join(str(grid[r][c]) for c in range(9)))


if __name__ == "__main__":
    problem_instance = input("Enter difficulty level (easy, medium, hard): ").strip().lower()
    symbols = asp_solve(f"../ASP/instances/sudoku_{problem_instance}_instance.lp", "../ASP/strimko.lp")
    grid = extract_solution(symbols)
    print_grid_simple(grid)