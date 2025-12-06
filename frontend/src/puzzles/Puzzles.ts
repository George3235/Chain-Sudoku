// Typ för svårighetsgrad
export type Difficulty = "easy" | "medium" | "hard";

// En cell i overlay-grid
export type Cell = {
  row: number;
  col: number;
  given?: number; // given siffra (från bilden)
  value?: number; // spelarens siffra
};

// Här importerar du dina tre bakgrundsbilder
import easyBg from "../assets/Easy_Blank.png";
import mediumBg from "../assets/Medium_blank.png";
import hardBg from "../assets/Hard_Blank.png";

export const BOARD_SIZE = 9;

export const PUZZLE_BACKGROUNDS: Record<Difficulty, string> = {
  easy: easyBg,
  medium: mediumBg,
  hard: hardBg,
};

// TODO: här kommer du lägga dina givna värden för varje nivå
export const EASY_INITIAL_CELLS: Cell[] = [];   // fyll senare
export const MEDIUM_INITIAL_CELLS: Cell[] = [];
export const HARD_INITIAL_CELLS: Cell[] = [];
