% Define values 1-9
value(1..9).
% Define the grid 9x9 
% Define Rows
row(0..8).
% Define Column 
column(0..8).
% Define Boxes
box(0..8).
% Define Cells cell(row,col,box,val). 
cell(C) :- cell(R,C,B,V).


:- cell(R,C1,B1,V), cell(R,C2,B2,V), C1 != C2.

%



%


%

%