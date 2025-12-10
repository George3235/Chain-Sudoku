import { Easy } from "../../puzzles/Easy_Instance"
import { Medium } from "../../puzzles/Medium_Instance"
import { Hard } from "../../puzzles/Hard_Instance"
import Easy_Blank from "../../assets/Easy_Blank.png"
import Medium_Blank from "../../assets/Medium_Blank.png"
import Hard_Blank from "../../assets/Hard_Blank.png"
import type { Cell } from "../../puzzles/puzzle"

export type Levels = "Easy" | "Medium" | "Hard"

export interface configLevel {
    level : Cell [];
    img : string;

}
export function updateLevelState (lvl: Levels): configLevel  {
    if (lvl === "Hard") {
        return { level: Hard, img: Hard_Blank}
    } else if(lvl === "Medium") {
        return { level: Medium, img: Medium_Blank}
    } else {
        return { level: Easy, img: Easy_Blank}
    }
} 