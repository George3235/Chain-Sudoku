import clingo 


difficulty = input("easy, medium, hard ? ")
instance_file_path = f"../ASP/instances/sudoku_{difficulty}_instance.lp"
solver_file_path = "../ASP/strimko.lp"

ctl = clingo.Control()

ctl.load(instance_file_path)
ctl.load(solver_file_path)
ctl.ground()

print(ctl.solve(on_model=print))

# # ct

# import sys
# from clingo.application import Application, clingo_main

# class ClingoApp(Application):
#     def __init__(self, name):
#         self.program_name = name

#     def main(self, ctl, files):
#         for f in files:
#             ctl.load(f)
#         if not files:
#             ctl.load("-")
#         ctl.ground([(solver_file_path, [instance_file_path])])
#         ctl.solve()

# clingo_main(ClingoApp(sys.argv[0]), sys.argv[1:])