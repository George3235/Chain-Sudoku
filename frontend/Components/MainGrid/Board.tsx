// HELA ÄR FRÅN CHAT

import { useMemo } from "react";
import Box from "@mui/material/Box";
import { BOARD_SIZE, PUZZLE_BACKGROUNDS } from "../../src/puzzles/Puzzles";
import type {Difficulty, Cell} from "../../src/puzzles/Puzzles"

type BoardProps = {
  difficulty: Difficulty;
  cells: Cell[];                 // state kommer utifrån
  onCellClick?: (cell: Cell) => void;
};

const Board: React.FC<BoardProps> = ({ difficulty, cells, onCellClick }) => {
  const background = PUZZLE_BACKGROUNDS[difficulty];

  // fallback om du inte orkat definiera cells än
  const safeCells: Cell[] = useMemo(() => {
  if (cells.length === BOARD_SIZE * BOARD_SIZE) return cells;

  return Array.from(
    { length: BOARD_SIZE * BOARD_SIZE },
    (_, index): Cell => ({
      row: Math.floor(index / BOARD_SIZE),
      col: index % BOARD_SIZE,
      given: undefined,
      value: undefined,
    })
  );
}, [cells]);

  return (
    <Box
      sx={{
        position: "relative",
        // Dessa Tre gör den responsive
        width: "100%",
        maxWidth:"60hv",
        aspectRatio: "1 /1",
    
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay-grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
        }}
      >
        {safeCells.map((cell, index) => {
          const displayValue = cell.given ?? cell.value ?? "";

          return (
            <Box
              key={index}
              onClick={() => onCellClick && onCellClick(cell)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                // ingen bakgrund, så dina cirklar från PNG syns
                color: cell.given ? "#ffffff" : "#00bcd4", // ex: givna = vit, spelarens = blå
                fontSize: "1.5rem",
                fontWeight: cell.given ? 700 : 500,
              }}
            >
              {displayValue}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Board;
