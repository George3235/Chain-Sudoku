import type { Cell } from "./puzzle";

export const Hard: Cell [] = [
    // Rad 0 
    {row:0, column:0, init:8},
    {row:0, column:4, init:4},
    {row:0, column:8, init:5},    
    // Rad 1 
    {row:1, column:2, init: 9},
    {row:1, column:3, init: 1},
    {row:1, column:7, init: 3},
    {row:1, column:8, init: 4},
    // Rad 2 
    {row:2, column:7, init: 9},
    {row:2, column:8, init: 1},
    // Rad 3
    {row:3, column:3, init: 7},
    {row:3, column:4, init: 6},
    // Rad 4
    {row:4, column:0, init: 3},
    {row:4, column:1, init: 4},
    {row:4, column:3, init: 9},
    {row:4, column:4, init: 5},
    {row:4, column:5, init: 8},
    {row:4, column:6, init: 6},
    // Rad 5
    {row:5, column:3, init: 3},
    {row:5, column:8, init: 6},
    // Rad 6
    {row:6, column:5, init:9},
    {row:6, column:6, init:2},
    {row:6, column:7, init:6},
    // Rad 7 
    {row:7, column:0, init:6},
    {row:7, column:4, init:3},
    {row:7, column:6, init:1},
    // Rad 8
    {row:8, column:1, init:6},
    {row:8, column:4, init:5},
    {row:8, column:5, init:9}
]