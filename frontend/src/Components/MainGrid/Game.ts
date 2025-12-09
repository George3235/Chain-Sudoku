let level = "Easy"
export const updateLevelState = (lvl:string) =>  {
    if (lvl === "Hard") {
        level = "Hard"
        // gör att den return Cell[] och länken till BgImage
        return level
    } else if(lvl === "Medium") {
        level = "Medium"
        return level
    } else {
        level = "Easy"
        return level
    }
} 