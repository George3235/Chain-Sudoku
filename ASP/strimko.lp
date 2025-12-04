% 9x9 Strimko (Chain Sudoku) model

#const n = 9.

% Things
row(0..n-1).
col(0..n-1).
val(1..n).




% Cells in the same row cannot have the same value
:- cell(R,C1,_,V), cell(R,C2,_,V), C1 != C2, V != 0.

% Cells in the same column cannot have the same value
:- cell(R1,C,_,V), cell(R2,C,_,V), R1 != R2, V != 0.

% Define the chains from the input
chain(CH) :- cell(_,_,CH,_).

% No two different cells in the same chain can have the same non-zero value
:- cell(R1,C1,CH,V), cell(R2,C2,CH,V), V != 0, (R1,C1) != (R2,C2).



% Grid adjacency from Dominosa for chain connection

% Vertical adjacency
adjacent(R1,C,R2,C) :- cell(R1,C,_,_), cell(R2,C,_,_), R2 = R1 + 1.

% Horizontal adjacency
adjacent(R,C1,R,C2) :- cell(R,C1,_,_), cell(R,C2,_,_), C2 = C1 + 1.

% Diagonal Adj \
adjacent(R1,C1,R2,C2) :- cell(R1,C1,_,_), cell(R2,C2,_,_), R2 = R1 + 1, C2 = C1 + 1.
% Diagonal Adj /
adjacent(R1,C1,R2,C2) :- cell(R1,C1,_,_), cell(R2,C2,_,_), R2 = R1 + 1, C2 = C1 - 1.

% Adjacency is symmetric (if A adjacent to B, then B adjacent to A)
adjacent(R1,C1,R2,C2) :- adjacent(R2,C2,R1,C1).



% Chain connection symmetry

% A cell has a neighbouring chain connection if there is an adjacent cell in the same chain
chain_connected(R,C,CH) :- cell(R,C,CH,_), cell(R2,C2,CH,_), adjacent(R,C,R2,C2), (R,C) != (R2,C2).

% Every cell in a chain must be adjacent to at least one other cell in that chain
:- cell(R,C,CH,_), not chain_connected(R,C,CH).



#show chain_connected/3.
